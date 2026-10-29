/**
 * Validate the publishable package shape without external dependencies.
 * Fails when the manifest, the client module id, or the bundle patch disagree,
 * which would make an installed bundle silently register no UI.
 */
import { existsSync, readFileSync } from 'node:fs'

const root = new URL('..', import.meta.url)
const read = (file) => readFileSync(new URL(file, root), 'utf8')
const fail = (message) => {
  console.error(`verify: ${message}`)
  process.exit(1)
}

const pkg = JSON.parse(read('package.json'))
if (pkg.private) fail('package.json must not be private to publish')
if (typeof pkg.name !== 'string' || pkg.name.startsWith('@local/')) {
  fail('package name must be a publishable registry name')
}
if (!pkg.version) fail('package.json needs a version')
if (pkg.exports?.['./client'] !== './client.js') fail('exports["./client"] must point at ./client.js')
if (pkg.dsh?.bundle?.patch !== './cordis.patch.yml') fail('dsh.bundle.patch must be ./cordis.patch.yml')
if (pkg.dsh?.client?.platform !== 'web') fail('dsh.client.platform must be "web"')
if (pkg.dsh?.engines?.dsh === undefined) fail('dsh.engines.dsh is recommended and required here')

const client = read('client.js')
if (!client.includes(`id: '${pkg.name}'`)) {
  fail(`client.js module id must equal the package name "${pkg.name}"`)
}
const patch = read('cordis.patch.yml')
if (!patch.includes(`name: '${pkg.name}'`)) {
  fail(`cordis.patch.yml bundle row must be named "${pkg.name}"`)
}

for (const file of ['index.js', 'client.js', 'cordis.patch.yml', 'icon.svg']) {
  if (!existsSync(new URL(file, root))) fail(`missing ${file}`)
}
for (const locale of ['en', 'zh']) {
  if (!existsSync(new URL(`locale/${locale}.json`, root))) fail(`missing locale/${locale}.json`)
}

console.log(`ok: ${pkg.name}@${pkg.version}`)
