/**
 * Host half of the Document Library bundle.
 *
 * Documents are derived from DSH session logs: only files a session wrote,
 * edited, or presented as a deliverable appear here, so every entry carries
 * its originating and editing sessions with exact event coordinates.
 *
 * One local JSON endpoint (`/dsh-documents/api`) serves the Web panel and one
 * agent tool (`documents`) shares the same implementation.
 */
import { promises as fs, createReadStream } from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { spawn } from 'node:child_process'

const ROUTE_PREFIX = '/dsh-documents/api'
const TRASH_DIR = path.join(os.homedir(), '.dsh', 'documents-trash')
const RENAME_FILE = path.join(os.homedir(), '.dsh', 'documents-renames.json')
const PREVIEW_LIMIT = 400 * 1024
const MAX_DOCUMENTS = 800
const DOCS_CACHE_MS = 15000
/** Session logs read in parallel per chunk; the scan streams one batch per chunk. */
const SESSION_CHUNK = 4
/** How many list revisions stay addressable, so a client can still ask for a delta. */
const SNAPSHOT_HISTORY = 4
/** Update self-check: registry poll interval, retry delay after a failed poll, timeout. */
const VERSION_TTL_MS = 6 * 60 * 60 * 1000
const VERSION_RETRY_MS = 30 * 60 * 1000
const VERSION_TIMEOUT_MS = 2500
const REGISTRY_CANDIDATES = ['https://registry.npmjs.org', 'https://registry.npmmirror.com']

const KINDS = [
  { id: 'word', color: '#2b579a', exts: ['doc', 'docx', 'docm', 'rtf', 'odt', 'pages'] },
  { id: 'excel', color: '#217346', exts: ['xls', 'xlsx', 'xlsm', 'csv', 'ods'] },
  { id: 'slides', color: '#c2410c', exts: ['ppt', 'pptx', 'pptm', 'odp', 'key'] },
  { id: 'pdf', color: '#b42318', exts: ['pdf'] },
  { id: 'markdown', color: '#6d5bd0', exts: ['md', 'markdown', 'mdx'] },
  { id: 'text', color: '#5b6472', exts: ['txt', 'log', 'tex'] },
]

const KIND_BY_EXT = new Map()
for (const kind of KINDS) {
  for (const ext of kind.exts) KIND_BY_EXT.set(ext, kind)
}

const TEXT_EXT = new Set([
  'md', 'markdown', 'mdx', 'txt', 'log', 'tex', 'json', 'yml', 'yaml', 'xml', 'html', 'htm', 'tsv', 'csv',
])

const IMAGE_MIME = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  gif: 'image/gif',
}

const WRITE_TOOLS = new Set([
  'write', 'edit', 'write_file', 'create_file', 'str_replace_editor', 'apply_patch', 'notebook_edit',
])

const PATH_ARG_KEYS = ['path', 'file_path', 'filePath', 'target_file', 'file']


let docsCache = { at: 0, key: '', value: null, snapshot: null, rev: '' }
let renameMap = null
const sessionCache = new Map()
/** Recent list snapshots, keyed by revision, so a polling client can receive a delta. */
const snapshotHistory = new Map()
let versionCache = { at: 0, value: null }
let ownMeta = null

/**
 * Renames performed through this plugin are remembered because session events
 * keep the original path; without the mapping the renamed file would vanish
 * from the library.
 */
async function loadRenames() {
  if (renameMap !== null) return renameMap
  renameMap = new Map()
  try {
    const raw = await fs.readFile(RENAME_FILE, 'utf8')
    const parsed = JSON.parse(raw)
    if (parsed !== null && typeof parsed === 'object') {
      for (const [from, to] of Object.entries(parsed)) {
        if (typeof from === 'string' && typeof to === 'string') renameMap.set(from.toLowerCase(), to)
      }
    }
  } catch {
    // No rename history yet.
  }
  return renameMap
}

async function saveRenames() {
  if (renameMap === null) return
  try {
    await fs.mkdir(path.dirname(RENAME_FILE), { recursive: true })
    const plain = Object.fromEntries(renameMap)
    await fs.writeFile(RENAME_FILE, JSON.stringify(plain, null, 2), 'utf8')
  } catch {
    // Rename history is a convenience, not a requirement.
  }
}

function resolveRenamedPath(map, candidate) {
  let current = candidate
  for (let hop = 0; hop < 10; hop += 1) {
    const next = map.get(current.toLowerCase())
    if (next === undefined || next === current) break
    current = next
  }
  return current
}

function messageOf(error) {
  if (error instanceof Error) return error.message
  return String(error)
}

/**
 * Resolve the directories this plugin may read and manage.
 * @param ctx plugin context
 * @param config plugin row config
 */
function rootsFor(ctx, config) {
  const roots = []
  const push = (value, title, id) => {
    if (typeof value !== 'string' || value.trim() === '') return
    const abs = path.resolve(value)
    for (const root of roots) {
      const within = path.relative(root.path, abs)
      const covers = path.relative(abs, root.path)
      const nested = (within !== '' && !within.startsWith('..') && !path.isAbsolute(within))
        || (covers !== '' && !covers.startsWith('..') && !path.isAbsolute(covers))
      if (nested) return
    }
    roots.push({ id: id ?? abs, title: title || path.basename(abs) || abs, path: abs })
  }
  const registry = ctx.get('workspaceRegistry')
  if (registry && typeof registry.list === 'function') {
    try {
      for (const workspace of registry.list()) {
        if (workspace && typeof workspace.path === 'string') {
          push(workspace.path, workspace.title, String(workspace.id))
        }
      }
    } catch {
      // Fall back to cwd when the registry cannot answer.
    }
  }
  if (Array.isArray(config?.extraRoots)) {
    for (const extra of config.extraRoots) push(extra, undefined, `extra:${extra}`)
  }
  if (roots.length === 0) push(process.cwd(), 'workspace', 'cwd')
  return roots
}

async function realRootOf(root) {
  try {
    return await fs.realpath(root.path)
  } catch {
    return root.path
  }
}

function insideRoots(candidate, roots) {
  if (typeof candidate !== 'string' || candidate === '') return false
  for (const root of roots) {
    const rel = path.relative(root.path, candidate)
    if (rel === '' || (!rel.startsWith('..') && !path.isAbsolute(rel))) return true
  }
  return false
}

function rootForPath(candidate, roots) {
  for (const root of roots) {
    const rel = path.relative(root.path, candidate)
    if (rel === '' || (!rel.startsWith('..') && !path.isAbsolute(rel))) return { root, rel }
  }
  return undefined
}

/**
 * Resolve a caller-supplied path and prove it sits inside one configured root.
 */
async function resolveWithinRoots(target, roots) {
  if (typeof target !== 'string' || target.trim() === '') throw new Error('缺少文件路径')
  const abs = path.resolve(target)
  let resolved = abs
  try {
    resolved = await fs.realpath(abs)
  } catch (error) {
    if (error && error.code !== 'ENOENT') throw error
  }
  for (const root of roots) {
    const realRoot = await realRootOf(root)
    const rel = path.relative(realRoot, resolved)
    if (rel === '' || (!rel.startsWith('..') && !path.isAbsolute(rel))) {
      return { resolved, root: { ...root, path: realRoot } }
    }
  }
  throw new Error('该文件不在 DSH 工作区内')
}

function lineCount(value) {
  if (typeof value !== 'string' || value === '') return 0
  return value.split('\n').length
}

function previewOf(value, limit = 320) {
  if (typeof value !== 'string') return ''
  const text = value.replace(/\r\n/g, '\n').trim()
  return text.length > limit ? text.slice(0, limit) + '…' : text
}

function fileEventFromToolCall(event, sessionCwd) {
  const name = event.data?.name
  if (typeof name !== 'string' || !WRITE_TOOLS.has(name)) return []
  let args
  try {
    args = JSON.parse(event.data.arguments ?? '{}')
  } catch {
    return []
  }
  if (args === null || typeof args !== 'object') return []
  const targets = []
  for (const key of PATH_ARG_KEYS) {
    if (typeof args[key] === 'string' && args[key].trim() !== '') targets.push(args[key])
  }
  if (Array.isArray(args.files)) {
    for (const file of args.files) {
      if (file && typeof file.path === 'string') targets.push(file.path)
    }
  }
  const out = []
  for (const target of targets) {
    const absolute = path.isAbsolute(target) ? path.resolve(target) : path.resolve(sessionCwd || '.', target)
    let kind = 'write'
    let summary = '写入文件'
    let added = 0
    let removed = 0
    let excerpt = ''
    if (name === 'edit' || name === 'str_replace_editor') {
      kind = 'edit'
      const before = lineCount(args.old_string ?? args.old_str ?? '')
      const after = lineCount(args.new_string ?? args.new_str ?? '')
      added = Math.max(0, after - before)
      removed = Math.max(0, before - after)
      summary = added === 0 && removed === 0
        ? '修改内容'
        : `修改内容（+${added} −${removed} 行）`
      excerpt = previewOf(args.new_string ?? args.new_str ?? '')
    } else if (name === 'present') {
      kind = 'present'
      summary = '呈现为交付文档'
    } else {
      const content = args.content ?? args.text ?? ''
      const lines = lineCount(content)
      summary = `写入 ${lines} 行`
      excerpt = previewOf(content)
    }
    out.push({
      kind,
      tool: name,
      path: absolute,
      seq: Number(event.seq),
      time: Number(event.time),
      turn: Number(event.data?.turn ?? 0),
      summary,
      added,
      removed,
      preview: excerpt,
    })
  }
  return out
}

function fileEventsFromDeliverable(event, sessionCwd) {
  const files = event.data?.files
  if (!Array.isArray(files)) return []
  const out = []
  for (const file of files) {
    if (!file || typeof file.path !== 'string') continue
    const absolute = path.isAbsolute(file.path) ? path.resolve(file.path) : path.resolve(sessionCwd || '.', file.path)
    out.push({
      kind: 'present',
      tool: 'present',
      path: absolute,
      seq: Number(event.seq),
      time: Number(event.time),
      turn: Number(event.data?.turn ?? 0),
      summary: file.description ? `交付：${file.description}` : '呈现为交付文档',
      added: 0,
      removed: 0,
      preview: '',
    })
  }
  return out
}

/**
 * Extract file-touching events from one session log.
 */
function extractSessionFiles(events, sessionCwd) {
  const out = []
  for (const event of events) {
    if (event === null || typeof event !== 'object') continue
    if (event.type === 'deliverables/presented') {
      out.push(...fileEventsFromDeliverable(event, sessionCwd))
    } else if (event.type === 'tool/call') {
      out.push(...fileEventFromToolCall(event, sessionCwd))
    }
  }
  return out
}

/**
 * Read one session log, reusing the extraction cache while its revision is stable.
 * Returns null for a session whose log cannot be read.
 */
async function readSessionRecord(query, persistence, record, titles, signal) {
  const header = record?.header
  if (!header || typeof header.cwd !== 'string') return null
  const id = String(header.id)
  let revision = ''
  if (persistence && typeof persistence.stat === 'function') {
    try {
      const stat = await persistence.stat(header.id, { signal })
      revision = String(stat?.revision ?? '')
    } catch {
      revision = ''
    }
  }
  let cached = sessionCache.get(id)
  if (cached === undefined || cached.revision !== revision) {
    let snapshot
    try {
      snapshot = await query.readSession(header.id)
    } catch {
      return null
    }
    const events = Array.isArray(snapshot?.events) ? snapshot.events : []
    cached = {
      revision,
      header,
      files: extractSessionFiles(events, header.cwd),
    }
    sessionCache.set(id, cached)
  }
  return {
    id,
    header,
    title: titles.get(id) || '',
    files: cached.files,
  }
}

/**
 * Walk every session log in small parallel chunks.
 *
 * Reading a log is by far the expensive step (36 logs / ~24 MB here), so callers
 * that paint progressively can yield a batch after each chunk instead of waiting
 * for the whole scan. Cached sessions skip `readSession` entirely, which makes a
 * refresh cheap once the library has been loaded once.
 */
async function* iterateSessionRecords(ctx, signal) {
  const query = ctx.get('sessionQuery')
  const persistence = ctx.get('sessionPersistence')
  if (!query || typeof query.listSessions !== 'function' || typeof query.readSession !== 'function') {
    throw new Error('会话查询服务不可用')
  }
  const records = await query.listSessions(signal)
  const titles = new Map()
  try {
    const ids = records.map((record) => record?.header?.id).filter((id) => id !== undefined && id !== null)
    const observed = await query.readTitleSnapshots(ids, signal)
    for (const item of observed) {
      if (item && item.status === 'fulfilled' && item.value && item.value.title) {
        titles.set(String(item.sessionId), String(item.value.title.title ?? ''))
      }
    }
  } catch {
    // Titles are decoration; a scan without them is still useful.
  }
  for (let index = 0; index < records.length; index += SESSION_CHUNK) {
    const slice = records.slice(index, index + SESSION_CHUNK)
    const settled = await Promise.all(
      slice.map((record) => readSessionRecord(query, persistence, record, titles, signal)),
    )
    yield {
      sessions: settled.filter((entry) => entry !== null),
      scanned: Math.min(index + slice.length, records.length),
      total: records.length,
    }
  }
}

function kindOf(ext) {
  return KIND_BY_EXT.get(ext)
}

/**
 * Identity of one document row. Any change here means the client must be told
 * about the document again on the next incremental refresh.
 */
function fingerprintOf(doc) {
  return `${doc.mtime}|${doc.bytes}|${doc.sessionCount}|${doc.editCount}|${doc.lastTime}`
}

function snapshotOf(documents) {
  const snapshot = new Map()
  for (const doc of documents) snapshot.set(doc.path.toLowerCase(), fingerprintOf(doc))
  return snapshot
}

/**
 * Stable hash of a document set, used as the delta cursor. Kept deterministic so
 * a client revision stays meaningful after the host restarts.
 */
function revisionOf(snapshot) {
  let hash = 0x811c9dc5
  for (const key of [...snapshot.keys()].sort()) {
    const line = `${key}=${snapshot.get(key)}\n`
    for (let index = 0; index < line.length; index += 1) {
      hash ^= line.charCodeAt(index)
      hash = Math.imul(hash, 0x01000193) >>> 0
    }
  }
  return hash.toString(16).padStart(8, '0')
}

async function statDocument(filePath, cache) {
  if (cache.has(filePath)) return cache.get(filePath)
  let info = null
  try {
    const stat = await fs.stat(filePath)
    if (stat.isFile()) info = { size: stat.size, mtime: stat.mtimeMs }
  } catch {
    info = null
  }
  cache.set(filePath, info)
  return info
}

/**
 * Turn session file events into the public document shape.
 *
 * `statCache` keeps the stat cost flat while a streaming caller re-runs this for
 * every chunk, and an unreadable file simply drops out of the library.
 */
async function buildDocuments(sessions, roots, renames, statCache) {
  const byPath = new Map()
  for (const session of sessions) {
    const rootInfo = rootForPath(path.resolve(session.header.cwd), roots)
    for (const file of session.files) {
      const sourcePath = path.resolve(file.path)
      const absolute = resolveRenamedPath(renames, sourcePath)
      if (!insideRoots(absolute, roots)) continue
      const ext = path.extname(absolute).slice(1).toLowerCase()
      const kind = kindOf(ext)
      if (kind === undefined) continue
      const key = absolute.toLowerCase()
      let doc = byPath.get(key)
      if (doc === undefined) {
        const pathRoot = rootForPath(absolute, roots) ?? rootInfo
        doc = {
          path: absolute,
          key,
          name: path.basename(absolute),
          ext,
          kind: kind.id,
          color: kind.color,
          rootTitle: pathRoot ? pathRoot.root.title : '',
          rel: pathRoot ? pathRoot.rel : '',
          sessions: new Map(),
          firstTime: file.time,
          lastTime: file.time,
        }
        byPath.set(key, doc)
      }
      let entry = doc.sessions.get(session.id)
      if (entry === undefined) {
        entry = {
          id: session.id,
          title: session.title || `会话 ${session.id.slice(-6)}`,
          workspace: rootInfo ? rootInfo.root.title : '',
          events: [],
        }
        doc.sessions.set(session.id, entry)
      }
      entry.events.push({
        seq: file.seq,
        time: file.time,
        turn: file.turn,
        kind: file.kind,
        tool: file.tool,
        summary: file.summary,
        added: file.added,
        removed: file.removed,
        preview: file.preview,
      })
      if (file.time < doc.firstTime) doc.firstTime = file.time
      if (file.time > doc.lastTime) doc.lastTime = file.time
    }
  }

  const documents = []
  for (const doc of byPath.values()) {
    const info = await statDocument(doc.path, statCache)
    if (info === null) continue
    const entries = [...doc.sessions.values()]
    for (const entry of entries) entry.events.sort((a, b) => a.seq - b.seq)
    entries.sort((a, b) => {
      const left = a.events[0]?.time ?? 0
      const right = b.events[0]?.time ?? 0
      return left - right
    })
    const origin = entries[0]
    const editors = entries.filter((entry) => entry.id !== origin?.id)
    documents.push({
      path: doc.path,
      name: doc.name,
      ext: doc.ext,
      kind: doc.kind,
      color: doc.color,
      rootTitle: doc.rootTitle,
      rel: doc.rel,
      bytes: info.size,
      mtime: info.mtime,
      firstTime: doc.firstTime,
      lastTime: doc.lastTime,
      sessionCount: entries.length,
      editCount: entries.reduce((total, entry) => total + entry.events.filter((event) => event.kind === 'edit' || event.kind === 'write').length, 0),
      origin: origin
        ? { sessionId: origin.id, title: origin.title, time: origin.events[0]?.time ?? doc.firstTime }
        : undefined,
      editedByOthers: editors.length > 0,
      sessions: entries.map((entry) => ({
        id: entry.id,
        title: entry.title,
        workspace: entry.workspace,
        role: entry.id === origin?.id ? 'origin' : 'editor',
        events: entry.events,
      })),
    })
  }
  documents.sort((a, b) => b.lastTime - a.lastTime)
  return documents
}

/** Collect the whole library in one pass (agent tool, JSON endpoint). */
async function collectDocuments(ctx, config, signal) {
  const roots = rootsFor(ctx, config)
  const renames = await loadRenames()
  const relevant = []
  for await (const chunk of iterateSessionRecords(ctx, signal)) {
    for (const session of chunk.sessions) {
      if (insideRoots(path.resolve(session.header.cwd), roots)) relevant.push(session)
    }
  }
  const documents = await buildDocuments(relevant, roots, renames, new Map())
  return {
    roots,
    documents: documents.slice(0, MAX_DOCUMENTS),
    truncated: documents.length > MAX_DOCUMENTS,
    sessionCount: relevant.length,
  }
}

async function listDocuments(ctx, config) {
  const roots = rootsFor(ctx, config)
  const key = roots.map((root) => root.path).join('|')
  const now = Date.now()
  if (docsCache.key === key && now - docsCache.at < DOCS_CACHE_MS && docsCache.value) {
    return docsCache.value
  }
  const value = await collectDocuments(ctx, config)
  const snapshot = snapshotOf(value.documents)
  const rev = revisionOf(snapshot)
  docsCache = { key, at: now, value, snapshot, rev }
  rememberSnapshot(rev, snapshot)
  return value
}

function rememberSnapshot(rev, snapshot) {
  snapshotHistory.delete(rev)
  snapshotHistory.set(rev, snapshot)
  while (snapshotHistory.size > SNAPSHOT_HISTORY) {
    const oldest = snapshotHistory.keys().next().value
    if (oldest === undefined) break
    snapshotHistory.delete(oldest)
  }
}

/**
 * Answer an incremental refresh: only the documents that appeared, changed, or
 * vanished since the caller's revision. When that revision has fallen out of the
 * retained history (or the host restarted), the full list is resent once.
 */
async function listDelta(ctx, config, since) {
  const value = await listDocuments(ctx, config)
  const snapshot = docsCache.snapshot ?? snapshotOf(value.documents)
  const rev = docsCache.rev || revisionOf(snapshot)
  const base = { sessionCount: value.sessionCount, truncated: value.truncated }
  if (since === rev) return { ok: true, unchanged: true, rev, ...base }
  const previous = snapshotHistory.get(since)
  if (previous === undefined) {
    return { ok: true, full: true, rev, documents: value.documents, ...base }
  }
  const added = []
  const updated = []
  for (const doc of value.documents) {
    const key = doc.path.toLowerCase()
    const before = previous.get(key)
    if (before === undefined) added.push(doc)
    else if (before !== snapshot.get(key)) updated.push(doc)
  }
  const removed = []
  for (const key of previous.keys()) {
    if (!snapshot.has(key)) removed.push(key)
  }
  return { ok: true, rev, added, updated, removed, ...base }
}

function invalidateCache() {
  docsCache = { at: 0, key: '', value: null, snapshot: null, rev: '' }
}

async function readOwnMeta() {
  if (ownMeta !== null) return ownMeta
  try {
    const raw = await fs.readFile(new URL('./package.json', import.meta.url), 'utf8')
    const parsed = JSON.parse(raw)
    ownMeta = { name: String(parsed?.name ?? ''), version: String(parsed?.version ?? '') }
  } catch {
    ownMeta = { name: '', version: '' }
  }
  return ownMeta
}

/**
 * Compare two semver-ish versions (major.minor.patch plus optional prerelease).
 * Returns -1 / 0 / 1, and 0 when either side is not a version at all.
 */
function compareVersions(left, right) {
  const parse = (value) => {
    const match = /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?(?:\+[0-9A-Za-z.-]+)?$/.exec(String(value ?? '').trim())
    if (match === null) return null
    return {
      parts: [Number(match[1]), Number(match[2]), Number(match[3])],
      pre: match[4] === undefined ? [] : match[4].split('.'),
    }
  }
  const a = parse(left)
  const b = parse(right)
  if (a === null || b === null) return 0
  for (let index = 0; index < 3; index += 1) {
    if (a.parts[index] !== b.parts[index]) return a.parts[index] < b.parts[index] ? -1 : 1
  }
  if (a.pre.length === 0 && b.pre.length === 0) return 0
  if (a.pre.length === 0) return 1
  if (b.pre.length === 0) return -1
  const length = Math.max(a.pre.length, b.pre.length)
  for (let index = 0; index < length; index += 1) {
    const x = a.pre[index]
    const y = b.pre[index]
    if (x === undefined) return -1
    if (y === undefined) return 1
    if (x === y) continue
    const numeric = /^\d+$/.test(x)
    const otherNumeric = /^\d+$/.test(y)
    if (numeric && otherNumeric) return Number(x) < Number(y) ? -1 : 1
    if (numeric !== otherNumeric) return numeric ? -1 : 1
    return x < y ? -1 : 1
  }
  return 0
}

/** `latest` from one registry's dist-tags; null on any failure so the caller can move on. */
async function fetchLatestVersion(registry, name) {
  try {
    const base = String(registry).replace(/\/+$/, '')
    const response = await fetch(`${base}/-/package/${encodeURIComponent(name)}/dist-tags`, {
      headers: { accept: 'application/json' },
      signal: AbortSignal.timeout(VERSION_TIMEOUT_MS),
    })
    if (!response.ok) return null
    const data = await response.json()
    return typeof data?.latest === 'string' && data.latest !== '' ? data.latest : null
  } catch {
    return null
  }
}

/**
 * Ask the registry which version is current. DSH does not update third-party
 * plugins on its own, so this only reports; the panel turns it into a hint.
 *
 * Cached for six hours (retried sooner after a failure) because it is the one
 * thing here that leaves the machine, and `force=1` bypasses the cache.
 */
async function checkVersion(config, force) {
  const now = Date.now()
  const own = await readOwnMeta()
  const name = own.name !== '' ? own.name : 'dsh-documents'
  if (config?.updateCheck === false) {
    return { name, current: own.version, latest: null, source: '', updateAvailable: false, checkedAt: now, enabled: false }
  }
  const cached = versionCache.value
  const ttl = cached !== null && cached.latest === null ? VERSION_RETRY_MS : VERSION_TTL_MS
  if (force !== true && cached !== null && now - versionCache.at < ttl) return cached

  const configured = typeof config?.registry === 'string' ? config.registry.trim() : ''
  const candidates = configured !== '' ? [configured] : REGISTRY_CANDIDATES
  // Ask every candidate at once: on some networks the official registry stalls
  // while the mirror answers instantly, and on others it is the other way round.
  const answers = await Promise.all(
    candidates.map(async (registry) => ({ registry, latest: await fetchLatestVersion(registry, name) })),
  )
  const usable = answers.filter((answer) => answer.latest !== null)
  const picked = usable.find((answer) => answer.registry.includes('registry.npmjs.org')) ?? usable[0]
  const value = {
    name,
    current: own.version,
    latest: picked === undefined ? null : picked.latest,
    source: picked === undefined ? '' : picked.registry,
    updateAvailable: picked !== undefined
      && own.version !== ''
      && compareVersions(picked.latest, own.version) > 0,
    checkedAt: now,
  }
  versionCache = { at: now, value }
  return value
}

async function readPreview(target, roots) {
  const { resolved } = await resolveWithinRoots(target, roots)
  const ext = path.extname(resolved).slice(1).toLowerCase()
  const info = await fs.stat(resolved)
  if (!info.isFile()) throw new Error('不是普通文件')
  if (!TEXT_EXT.has(ext)) {
    return { ok: true, supported: false, ext, bytes: info.size, mtime: info.mtimeMs }
  }
  const length = Math.min(info.size, PREVIEW_LIMIT)
  const handle = await fs.open(resolved, 'r')
  try {
    const buffer = Buffer.alloc(length)
    const { bytesRead } = await handle.read(buffer, 0, length, 0)
    return {
      ok: true,
      supported: true,
      ext,
      bytes: info.size,
      mtime: info.mtimeMs,
      truncated: info.size > bytesRead,
      text: buffer.subarray(0, bytesRead).toString('utf8'),
    }
  } finally {
    await handle.close()
  }
}

function launch(target, reveal) {
  return new Promise((resolve) => {
    const options = { detached: true, stdio: 'ignore', windowsHide: true }
    try {
      let child
      if (process.platform === 'win32') {
        if (reveal) {
          child = spawn('explorer.exe', [`/select,${target}`], options)
        } else {
          // `cmd /c start` performs the ShellExecute that opens the file with its
          // registered application; Start-Process cannot be used safely here
          // because -LiteralPath is not a valid parameter.
          const command = `start "" "${target.replace(/"/g, '""')}"`
          child = spawn('cmd.exe', ['/d', '/s', '/c', command], {
            ...options,
            windowsVerbatimArguments: true,
          })
        }
      } else if (process.platform === 'darwin') {
        child = spawn('open', reveal ? ['-R', target] : [target], options)
      } else {
        child = spawn('xdg-open', [reveal ? path.dirname(target) : target], options)
      }
      child.once('error', (error) => {
        resolve({ ok: false, error: messageOf(error) })
      })
      child.once('spawn', () => {
        try {
          child.unref()
        } catch {
          // The child already left.
        }
        resolve({ ok: true })
      })
    } catch (error) {
      resolve({ ok: false, error: messageOf(error) })
    }
  })
}

async function openOnDesktop(ctx, target, reveal) {
  const controller = ctx.get('sessionController')
  if (!controller || typeof controller.openWorkspacePath !== 'function') return null
  let available = true
  try {
    if (typeof controller.canOpenWorkspacePath === 'function') available = controller.canOpenWorkspacePath() === true
  } catch {
    available = false
  }
  if (!available) return null
  try {
    const request = reveal ? { path: target, action: 'reveal' } : { path: target }
    await controller.openWorkspacePath(request, AbortSignal.timeout(15000))
    return { ok: true, via: 'desktop' }
  } catch (error) {
    return { ok: false, error: messageOf(error), via: 'desktop' }
  }
}

async function runAction(ctx, config, body) {
  const action = typeof body?.action === 'string' ? body.action : ''
  const roots = rootsFor(ctx, config)
  const { resolved } = await resolveWithinRoots(body?.path, roots)
  let info
  try {
    info = await fs.stat(resolved)
  } catch (error) {
    if (error && error.code === 'ENOENT') throw new Error('文件不存在或已被移动')
    throw error
  }

  if (action === 'open' || action === 'reveal') {
    if (!info.isFile()) throw new Error('只能打开文件')
    const desktop = await openOnDesktop(ctx, resolved, action === 'reveal')
    if (desktop !== null && desktop.ok) return { ...desktop, action, path: resolved }
    const spawned = await launch(resolved, action === 'reveal')
    if (spawned.ok) return { ...spawned, action, path: resolved }
    return {
      ok: false,
      action,
      path: resolved,
      error: desktop?.error || spawned.error || '无法用桌面应用打开该文件',
    }
  }

  if (action === 'rename') {
    if (!info.isFile()) throw new Error('只能重命名文件')
    let name = typeof body?.name === 'string' ? body.name.trim() : ''
    if (name === '') throw new Error('名称不能为空')
    if (/[\\/:*?"<>|]/.test(name) || name.startsWith('.') || name === '.' || name === '..') {
      throw new Error('名称包含非法字符')
    }
    const originalExt = path.extname(resolved)
    if (path.extname(name) === '' && originalExt !== '') name += originalExt
    const destination = path.join(path.dirname(resolved), name)
    if (destination === resolved) return { ok: true, action, path: resolved, name }
    try {
      await fs.access(destination)
      throw new Error('同名文件已存在')
    } catch (error) {
      if (error && error.code !== 'ENOENT') throw error
    }
    await fs.rename(resolved, destination)
    const renames = await loadRenames()
    renames.set(resolved.toLowerCase(), destination)
    await saveRenames()
    invalidateCache()
    return { ok: true, action, path: destination, name }
  }

  if (action === 'trash') {
    if (!info.isFile()) throw new Error('只能移除文件')
    await fs.mkdir(TRASH_DIR, { recursive: true })
    const stamp = new Date().toISOString().replace(/[:.]/g, '-')
    const destination = path.join(TRASH_DIR, `${stamp}-${path.basename(resolved)}`)
    try {
      await fs.rename(resolved, destination)
    } catch (error) {
      if (error && error.code === 'EXDEV') {
        await fs.copyFile(resolved, destination)
        await fs.unlink(resolved)
      } else {
        throw error
      }
    }
    const renames = await loadRenames()
    renames.delete(resolved.toLowerCase())
    for (const [from, to] of [...renames]) {
      if (to.toLowerCase() === resolved.toLowerCase()) renames.delete(from)
    }
    await saveRenames()
    invalidateCache()
    return { ok: true, action, path: resolved, trash: destination }
  }

  throw new Error(`未知操作：${action || '(空)'}`)
}

function sendJson(res, status, value) {
  const body = JSON.stringify(value)
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  })
  res.end(body)
}

async function readJsonBody(req) {
  let size = 0
  const chunks = []
  for await (const chunk of req) {
    size += chunk.length
    if (size > 256 * 1024) throw new Error('请求体过大')
    chunks.push(chunk)
  }
  if (chunks.length === 0) return {}
  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

async function serveRaw(req, res, url, ctx, config) {
  const roots = rootsFor(ctx, config)
  const { resolved } = await resolveWithinRoots(url.searchParams.get('path') ?? '', roots)
  const info = await fs.stat(resolved)
  if (!info.isFile()) throw new Error('不是普通文件')
  const ext = path.extname(resolved).slice(1).toLowerCase()
  const isPdf = ext === 'pdf'
  const imageType = IMAGE_MIME[ext]
  if (!isPdf && imageType === undefined) {
    sendJson(res, 415, { ok: false, error: '该类型不支持内嵌预览' })
    return
  }
  const mime = isPdf ? 'application/pdf' : imageType
  let start = 0
  let end = info.size - 1
  const range = req.headers.range
  if (typeof range === 'string') {
    const match = /^bytes=(\d*)-(\d*)$/.exec(range.trim())
    if (match) {
      if (match[1] !== '') start = Number(match[1])
      if (match[2] !== '') end = Number(match[2])
      if (Number.isNaN(start) || Number.isNaN(end) || start > end || start >= info.size) {
        res.writeHead(416, { 'content-range': `bytes */${info.size}` })
        res.end()
        return
      }
      end = Math.min(end, info.size - 1)
    }
  }
  const headers = {
    'content-type': mime,
    'content-length': String(end - start + 1),
    'accept-ranges': 'bytes',
    'cache-control': 'no-store',
    'content-disposition': `inline; filename*=UTF-8''${encodeURIComponent(path.basename(resolved))}`,
    'x-content-type-options': 'nosniff',
  }
  if (isPdf) headers['content-security-policy'] = "sandbox; default-src 'none'; style-src 'unsafe-inline'"
  res.writeHead(range === undefined ? 200 : 206, range === undefined ? headers : {
    ...headers,
    'content-range': `bytes ${start}-${end}/${info.size}`,
  })
  createReadStream(resolved, { start, end }).pipe(res)
}

/**
 * Stream the library as NDJSON.
 *
 * One `docs` event per scanned chunk means the panel can paint the documents it
 * already knows about while the remaining session logs are still being read,
 * instead of staring at a skeleton for the whole scan.
 */
async function serveListStream(req, res, ctx, config) {
  res.writeHead(200, {
    'content-type': 'application/x-ndjson; charset=utf-8',
    'cache-control': 'no-store',
    'x-accel-buffering': 'no',
  })
  const controller = new AbortController()
  const abort = () => controller.abort()
  res.on('close', abort)
  const write = (event) => {
    if (res.writableEnded === true) return
    res.write(JSON.stringify(event) + '\n')
  }
  try {
    const roots = rootsFor(ctx, config)
    const renames = await loadRenames()
    const statCache = new Map()
    const relevant = []
    const emitted = new Map()
    let documents = []
    let sessionCount = 0
    for await (const chunk of iterateSessionRecords(ctx, controller.signal)) {
      for (const session of chunk.sessions) {
        if (insideRoots(path.resolve(session.header.cwd), roots)) relevant.push(session)
      }
      sessionCount = relevant.length
      documents = await buildDocuments(relevant, roots, renames, statCache)
      const changed = []
      for (const doc of documents) {
        const key = doc.path.toLowerCase()
        const fingerprint = fingerprintOf(doc)
        if (emitted.get(key) === fingerprint) continue
        if (!emitted.has(key) && emitted.size >= MAX_DOCUMENTS) continue
        emitted.set(key, fingerprint)
        changed.push(doc)
      }
      write({ t: 'docs', documents: changed, scanned: chunk.scanned, sessions: chunk.total, sessionCount })
    }
    const rev = revisionOf(emitted)
    const truncated = documents.length > MAX_DOCUMENTS
    docsCache = {
      key: roots.map((root) => root.path).join('|'),
      at: Date.now(),
      value: { roots, documents: documents.slice(0, MAX_DOCUMENTS), truncated, sessionCount },
      snapshot: emitted,
      rev,
    }
    rememberSnapshot(rev, emitted)
    write({ t: 'done', rev, sessionCount, total: documents.length, limit: MAX_DOCUMENTS, truncated })
  } catch (error) {
    write({ t: 'error', error: messageOf(error) })
  } finally {
    res.off('close', abort)
    if (res.writableEnded !== true) res.end()
  }
}

function createHandler(ctx, config) {
  return async function handleDocumentsRequest(req, res) {
    try {
      const url = new URL(req.url ?? '/', 'http://127.0.0.1')
      if (url.pathname !== ROUTE_PREFIX && !url.pathname.startsWith(ROUTE_PREFIX + '/')) {
        res.writeHead(404)
        res.end('Not Found')
        return
      }
      const route = url.pathname.slice(ROUTE_PREFIX.length)

      if (req.method === 'GET' || req.method === 'HEAD') {
        if (route === '/list') {
          const since = url.searchParams.get('since')
          if (since !== null && since !== '') {
            sendJson(res, 200, await listDelta(ctx, config, since))
            return
          }
          if (url.searchParams.get('stream') === '1' && req.method !== 'HEAD') {
            await serveListStream(req, res, ctx, config)
            return
          }
          const result = await listDocuments(ctx, config)
          sendJson(res, 200, { ok: true, rev: docsCache.rev, ...result })
          return
        }
        if (route === '/version') {
          sendJson(res, 200, { ok: true, ...(await checkVersion(config, url.searchParams.get('force') === '1')) })
          return
        }
        if (route === '/preview') {
          const roots = rootsFor(ctx, config)
          sendJson(res, 200, await readPreview(url.searchParams.get('path') ?? '', roots))
          return
        }
        if (route === '/raw') {
          await serveRaw(req, res, url, ctx, config)
          return
        }
        sendJson(res, 404, { ok: false, error: '未知接口' })
        return
      }

      if (req.method === 'POST' && route === '/action') {
        if (req.headers['x-dsh-documents'] !== '1') {
          sendJson(res, 403, { ok: false, error: 'forbidden' })
          return
        }
        const body = await readJsonBody(req)
        sendJson(res, 200, await runAction(ctx, config, body))
        return
      }

      sendJson(res, 405, { ok: false, error: 'Method Not Allowed' })
    } catch (error) {
      sendJson(res, 400, { ok: false, error: messageOf(error) })
    }
  }
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes < 0) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function formatTime(ms) {
  const date = new Date(ms)
  if (Number.isNaN(date.getTime())) return '—'
  const pad = (value) => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

function createTool(ctx, config) {
  return {
    name: 'documents',
    description:
      'List, open, or reveal documents that a DSH session generated or edited. Every result carries the originating session and its edit events with event coordinates, so you can report or open where a document came from. Use action="list" to discover session-linked documents, action="open" to open one in its default desktop application, and action="reveal" to show its folder. Paths must be absolute and inside a DSH workspace.',
    parameters: {
      type: 'object',
      additionalProperties: false,
      properties: {
        action: {
          type: 'string',
          enum: ['list', 'open', 'reveal'],
          description: 'Operation to perform.',
        },
        path: {
          type: 'string',
          description: 'Absolute document path for open or reveal.',
        },
        query: {
          type: 'string',
          description: 'Optional case-insensitive file name, folder, or session title filter for list.',
        },
        kind: {
          type: 'string',
          enum: KINDS.map((kind) => kind.id),
          description: 'Optional document kind filter for list.',
        },
      },
      required: ['action'],
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: true,
        properties: {
          ok: { type: 'boolean' },
          action: { type: 'string' },
          error: { type: 'string' },
          total: { type: 'number' },
          path: { type: 'string' },
          documents: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: true,
              properties: {
                name: { type: 'string' },
                path: { type: 'string' },
                kind: { type: 'string' },
                bytes: { type: 'number' },
                mtime: { type: 'number' },
                origin: { type: 'object' },
                sessions: { type: 'array' },
              },
            },
          },
        },
      },
      render(_args, value) {
        if (!value || value.ok !== true) {
          return [{ type: 'text', text: `documents failed: ${value?.error ?? 'unknown error'}` }]
        }
        if (Array.isArray(value.documents)) {
          const lines = value.documents.slice(0, 50).map((doc) => {
            const origin = doc.origin ? `origin: ${doc.origin.title}` : 'origin: unknown'
            const sessions = Array.isArray(doc.sessions) ? doc.sessions.length : 0
            return `- ${doc.name} [${doc.kind}] ${formatBytes(doc.bytes)} · ${origin} · ${sessions} session(s) — ${doc.path}`
          })
          if (value.documents.length > 50) lines.push(`… and ${value.documents.length - 50} more`)
          return [{
            type: 'text',
            text: lines.length === 0
              ? 'No session-generated documents found in the DSH workspaces.'
              : `${value.total ?? value.documents.length} document(s):\n${lines.join('\n')}`,
          }]
        }
        return [{ type: 'text', text: `documents ${value.action ?? ''} ${value.path ?? ''}`.trim() }]
      },
    },
    async execute(args, exec) {
      const input = args && typeof args === 'object' ? args : {}
      const action = typeof input.action === 'string' ? input.action : 'list'
      if (action === 'list') {
        const result = await listDocuments(ctx, config)
        const query = typeof input.query === 'string' ? input.query.trim().toLowerCase() : ''
        const kind = typeof input.kind === 'string' ? input.kind : ''
        const documents = result.documents.filter((doc) => {
          if (kind !== '' && doc.kind !== kind) return false
          if (query === '') return true
          const titles = doc.sessions.map((session) => session.title).join(' ').toLowerCase()
          return doc.name.toLowerCase().includes(query) || doc.rel.toLowerCase().includes(query) || titles.includes(query)
        })
        return {
          ok: true,
          action,
          total: documents.length,
          truncated: result.truncated,
          documents: documents.map((doc) => ({
            name: doc.name,
            path: doc.path,
            kind: doc.kind,
            bytes: doc.bytes,
            mtime: doc.mtime,
            origin: doc.origin,
            sessions: doc.sessions.map((session) => ({
              id: session.id,
              title: session.title,
              role: session.role,
              events: session.events,
            })),
          })),
        }
      }
      exec.signal.throwIfAborted()
      const result = await runAction(ctx, config, { action, path: input.path })
      return result
    },
  }
}

export const inject = ['tools']

export function apply(ctx, config) {
  ctx.effect(() => {
    invalidateCache()
    return ctx.tools.register(createTool(ctx, config))
  }, 'documents: agent tool')

  ctx.inject(['webServer'], (child) => {
    child.effect(
      () => child.webServer.register({
        kind: 'prefix',
        path: ROUTE_PREFIX,
        handler: createHandler(ctx, config),
      }),
      'documents: local api',
    )
  })
}
