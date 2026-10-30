window.__ModuleLoader__.load({
  id: 'dsh-documents',
  factory(require) {
    const React = require('react')
    const h = React.createElement
    const NS = 'dsh-documents'
    const API = '/dsh-documents/api'

    const EN = {
      'panel.label': 'Documents',
      'title': 'Document Library',
      'subtitle': 'Documents linked to DSH sessions',
      'count': 'documents',
      'sessionCount': 'sessions',
      'refresh': 'Refresh',
      'refresh.auto': 'Auto-refresh every 60s · changes only',
      'search': 'Search document, folder, or session',
      'filter.all': 'All',
      'sort.recent': 'Recently active',
      'sort.name': 'Name',
      'sort.size': 'Largest first',
      'workspace.all': 'All workspaces',
      'tree.expandAll': 'Expand all',
      'tree.collapseAll': 'Collapse all',
      'tree.noWorkspace': 'No workspace',
      'tree.noSession': 'No session',
      'tree.workspace': 'Workspace',
      'tree.session': 'Session',
      'loading': 'Loading documents…',
      'loading.partial': 'Still scanning sessions… {count} shown',
      'update.title': 'Version {version} is available',
      'update.body': 'press Ctrl+R after upgrading',
      'update.copy': 'Copy command',
      'update.dismiss': 'Skip this version',
      'update.copied': 'Command copied',
      'empty.title': 'No session documents yet',
      'empty.body': 'When a DSH session writes, edits, or presents a document in a workspace, it appears here with its originating session.',
      'empty.filtered': 'No documents match this filter.',
      'error.title': 'Could not load documents',
      'retry': 'Retry',
      'viewer.back': 'Back to library',
      'viewer.zoomIn': 'Zoom in',
      'viewer.zoomOut': 'Zoom out',
      'viewer.zoomReset': 'Reset zoom',
      'viewer.detail': 'Details',
      'viewer.source': 'Source',
      'viewer.reading': 'Reading',
      'outline.title': 'Contents',
      'code.copy': 'Copy',
      'code.copied': 'Copied',
      'viewer.unsupported': 'This format cannot be previewed here. Open it in its desktop application.',
      'viewer.truncated': 'Preview truncated for large files.',
      'viewer.missing': 'This file no longer exists on disk.',
      'viewer.pick': 'Select a document from the list to view it here.',
      'viewer.list': 'List',
      'viewer.close': 'Close document',
      'detail.title': 'Details',
      'detail.path': 'Path',
      'detail.workspace': 'Workspace',
      'detail.type': 'Type',
      'detail.size': 'Size',
      'detail.modified': 'Modified',
      'detail.sessions': 'Sessions',
      'detail.created': 'Created by',
      'detail.edited': 'Edited by',
      'detail.jump': 'Open session',
      'detail.noSessions': 'No session recorded.',
      'row.editedElsewhere': 'edited elsewhere',      'detail.eventSeq': 'event',
      'detail.turn': 'turn',
      'detail.events': 'changes',
      'event.write': 'Write',
      'event.edit': 'Edit',
      'event.present': 'Delivered',
      'action.open': 'Open',
      'action.openExternal': 'Open in desktop app',
      'action.reveal': 'Show in folder',
      'action.rename': 'Rename',
      'action.trash': 'Move to trash',
      'action.copy': 'Copy path',
      'action.cancel': 'Cancel',
      'action.save': 'Rename',
      'rename.title': 'Rename document',
      'rename.label': 'New name',
      'trash.title': 'Move document to trash?',
      'trash.body': 'The file moves to your DSH trash folder; it is not deleted permanently.',
      'toast.open': 'Opened the document.',
      'toast.reveal': 'Opened the containing folder.',
      'toast.rename': 'Renamed.',
      'toast.trash': 'Moved to trash.',
      'toast.copied': 'Path copied.',
      'toast.copyFailed': 'Could not copy the path.',
      'toast.jump': 'Opened the session at the recorded event.',
      'toast.jumpFailed': 'Could not open that session.',
      'kind.word': 'Word',
      'kind.excel': 'Excel',
      'kind.slides': 'Slides',
      'kind.pdf': 'PDF',
      'kind.markdown': 'Markdown',
      'kind.text': 'Text',
    }

    const ZH = {
      'panel.label': '文档',
      'title': '文档库',
      'subtitle': '与 DSH 会话关联的文档',
      'count': '个文档',
      'sessionCount': '个会话',
      'refresh': '刷新',
      'refresh.auto': '每 60 秒增量刷新',
      'search': '搜索文档、文件夹或会话',
      'filter.all': '全部',
      'sort.recent': '最近活动',
      'sort.name': '名称',
      'sort.size': '从大到小',
      'workspace.all': '全部工作区',
      'tree.expandAll': '全部展开',
      'tree.collapseAll': '全部收起',
      'tree.noWorkspace': '未归属工作区',
      'tree.noSession': '未归属会话',
      'tree.workspace': '工作区',
      'tree.session': '会话',
      'loading': '正在加载文档…',
      'loading.partial': '正在继续扫描会话…已显示 {count} 个',
      'update.title': '有新版本 {version}',
      'update.body': '升级后按 Ctrl+R 生效',
      'update.copy': '复制命令',
      'update.dismiss': '跳过此版本',
      'update.copied': '命令已复制',
      'empty.title': '还没有会话文档',
      'empty.body': 'DSH 会话在工作区写入、编辑或交付文档后，会连同来源会话一起显示在这里。',
      'empty.filtered': '没有符合当前筛选的文档。',
      'error.title': '文档加载失败',
      'retry': '重试',
      'viewer.back': '返回文档库',
      'viewer.zoomIn': '放大',
      'viewer.zoomOut': '缩小',
      'viewer.zoomReset': '重置缩放',
      'viewer.detail': '详情',
      'viewer.source': '源码',
      'viewer.reading': '阅读',
      'outline.title': '本页目录',
      'code.copy': '复制',
      'code.copied': '已复制',
      'viewer.unsupported': '该格式暂不支持在应用内预览，请用桌面应用打开。',
      'viewer.truncated': '文件较大，预览已截断。',
      'viewer.missing': '文件已不在磁盘上。',
      'viewer.pick': '从左侧列表选择文档开始查看。',
      'viewer.list': '列表',
      'viewer.close': '关闭文档',
      'detail.title': '详情',
      'detail.path': '路径',
      'detail.workspace': '工作区',
      'detail.type': '类型',
      'detail.size': '大小',
      'detail.modified': '修改时间',
      'detail.sessions': '会话',
      'detail.created': '创建会话',
      'detail.edited': '编辑会话',
      'detail.jump': '打开会话',
      'detail.noSessions': '没有记录到会话。',
      'row.editedElsewhere': '其他会话改过',
      'detail.eventSeq': '事件',
      'detail.turn': '轮次',
      'detail.events': '次变动',
      'event.write': '写入',
      'event.edit': '修改',
      'event.present': '交付',
      'action.open': '打开',
      'action.openExternal': '用桌面应用打开',
      'action.reveal': '在文件夹中显示',
      'action.rename': '重命名',
      'action.trash': '移入回收站',
      'action.copy': '复制路径',
      'action.cancel': '取消',
      'action.save': '重命名',
      'rename.title': '重命名文档',
      'rename.label': '新名称',
      'trash.title': '将文档移入回收站？',
      'trash.body': '文件会被移动到 DSH 回收站目录，不会永久删除。',
      'toast.open': '已打开文档。',
      'toast.reveal': '已打开所在文件夹。',
      'toast.rename': '已重命名。',
      'toast.trash': '已移入回收站。',
      'toast.copied': '路径已复制。',
      'toast.copyFailed': '复制路径失败。',
      'toast.jump': '已打开会话并定位到记录的事件。',
      'toast.jumpFailed': '无法打开该会话。',
      'kind.word': 'Word',
      'kind.excel': 'Excel',
      'kind.slides': 'PPT',
      'kind.pdf': 'PDF',
      'kind.markdown': 'Markdown',
      'kind.text': '文本',
    }

    const KIND_ORDER = ['word', 'excel', 'slides', 'pdf', 'markdown', 'text']
    const KIND_DOT = {
      word: '#2b579a',
      excel: '#217346',
      slides: '#c2410c',
      pdf: '#b42318',
      markdown: '#6d5bd0',
      text: '#5b6472',
    }
    const REFRESH_MS = 60 * 1000
    const UPDATE_DISMISS_KEY = 'dsh-documents.update.dismissed'
    // Folders start collapsed, so what is worth persisting is the *expanded* set.
    const TREE_EXPANDED_KEY = 'dsh-documents.tree.expanded'

    function readExpanded() {
      try {
        const raw = window.localStorage.getItem(TREE_EXPANDED_KEY)
        const parsed = raw === null ? null : JSON.parse(raw)
        return new Set(Array.isArray(parsed) ? parsed.filter((entry) => typeof entry === 'string') : [])
      } catch {
        return new Set()
      }
    }

    /** Survives a remount even when localStorage is unavailable. */
    const treeState = { expanded: readExpanded() }

    function writeExpanded(value) {
      treeState.expanded = value
      try {
        window.localStorage.setItem(TREE_EXPANDED_KEY, JSON.stringify([...value]))
        // Older builds stored the inverse set; drop it so it cannot linger.
        window.localStorage.removeItem('dsh-documents.tree.collapsed')
      } catch {
        // Private mode or a blocked storage area: state still holds for this page.
      }
    }
    // Survives a remount (switching panels and coming back): the list paints from
    // the last known state and a delta refresh runs behind it.
    const panelState = { documents: [], sessionCount: 0, revision: '' }

    const CSS = `
      .dshdoc-page {
        --dshdoc-border: var(--dsw-alias-border-l1);
        display: flex;
        flex-direction: column;
        height: 100%;
        min-height: 0;
        background: var(--dsw-alias-bg-base);
        color: var(--dsw-alias-label-primary);
        font-size: 14px;
        position: relative;
      }
      .dshdoc-page, .dshdoc-page *, .dshdoc-page *::before, .dshdoc-page *::after { box-sizing: border-box; }
      .dshdoc-head { display: flex; align-items: flex-end; gap: 16px; padding: 22px 28px 14px; }
      .dshdoc-head-main { flex: 1; min-width: 0; }
      .dshdoc-title { display: flex; align-items: center; gap: 10px; font-size: 20px; line-height: 1.3; font-weight: 600; letter-spacing: -0.01em; }
      .dshdoc-brandmark { width: 30px; height: 30px; border-radius: 9px; display: inline-flex; align-items: center; justify-content: center; color: var(--dsw-alias-brand-primary); background: color-mix(in srgb, var(--dsw-alias-brand-primary) 12%, transparent); border: 1px solid color-mix(in srgb, var(--dsw-alias-brand-primary) 22%, transparent); }
      .dshdoc-badge { font-size: 11px; font-weight: 500; line-height: 1; padding: 4px 8px; border-radius: 999px; color: var(--dsw-alias-label-secondary); background: color-mix(in srgb, var(--dsw-alias-label-primary) 7%, transparent); }
      .dshdoc-sub { margin-top: 4px; font-size: 12.5px; color: var(--dsw-alias-label-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .dshdoc-head-actions { display: flex; align-items: center; gap: 8px; padding-bottom: 2px; }
      .dshdoc-refresh-hint { font-size: 10.5px; color: var(--dsw-alias-label-tertiary); white-space: nowrap; }
      @media (max-width: 1200px) { .dshdoc-refresh-hint { display: none; } }
      .dshdoc-update { display: flex; align-items: center; gap: 10px; margin: 0 28px 12px; padding: 9px 12px; border-radius: 10px; border: 1px solid color-mix(in srgb, var(--dsw-alias-brand-primary) 26%, transparent); background: color-mix(in srgb, var(--dsw-alias-brand-primary) 8%, transparent); font-size: 12.5px; }
      .dshdoc-update-text { flex: 1; min-width: 0; color: var(--dsw-alias-label-secondary); display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
      .dshdoc-update-text strong { color: var(--dsw-alias-label-primary); font-weight: 600; }
      .dshdoc-update code { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 11.5px; padding: 2px 6px; border-radius: 5px; background: color-mix(in srgb, var(--dsw-alias-label-primary) 8%, transparent); color: var(--dsw-alias-label-primary); white-space: nowrap; }
      @media (max-width: 900px) { .dshdoc-update { margin: 0 16px 10px; flex-wrap: wrap; } }
      .dshdoc-btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; height: 32px; padding: 0 12px; border-radius: 9px; border: 1px solid var(--dshdoc-border); background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary); font: inherit; font-size: 13px; cursor: pointer; white-space: nowrap; transition: background 120ms ease, border-color 120ms ease, opacity 120ms ease; }
      .dshdoc-btn:hover { background: color-mix(in srgb, var(--dsw-alias-label-primary) 6%, var(--dsw-alias-bg-layer-1)); }
      .dshdoc-btn:disabled { opacity: 0.55; cursor: default; }
      .dshdoc-btn-brand { border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 34%, transparent); background: color-mix(in srgb, var(--dsw-alias-brand-primary) 12%, transparent); color: var(--dsw-alias-brand-primary); }
      .dshdoc-btn-brand:hover { background: color-mix(in srgb, var(--dsw-alias-brand-primary) 18%, transparent); }
      .dshdoc-btn-danger { border-color: color-mix(in srgb, var(--dsw-alias-state-error-primary) 30%, transparent); background: transparent; color: var(--dsw-alias-state-error-primary); }
      .dshdoc-btn-danger:hover { background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 10%, transparent); }
      .dshdoc-iconbtn { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; padding: 0; border: none; border-radius: 8px; background: transparent; color: var(--dsw-alias-label-secondary); cursor: pointer; flex: none; }
      .dshdoc-iconbtn:hover { background: color-mix(in srgb, var(--dsw-alias-label-primary) 8%, transparent); color: var(--dsw-alias-label-primary); }
      .dshdoc-iconbtn:disabled { opacity: 0.45; cursor: default; }
      .dshdoc-toolbar { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; padding: 0 20px 14px; }
      .dshdoc-search { position: relative; display: flex; align-items: center; flex: 1 1 220px; min-width: 180px; max-width: 360px; height: 34px; border: 1px solid var(--dshdoc-border); border-radius: 10px; background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-secondary); padding: 0 10px; gap: 7px; }
      .dshdoc-search:focus-within { border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 45%, var(--dshdoc-border)); }
      .dshdoc-search input { flex: 1; min-width: 0; height: 100%; border: none; outline: none; background: transparent; color: var(--dsw-alias-label-primary); font: inherit; font-size: 13px; }
      .dshdoc-search input::placeholder { color: var(--dsw-alias-label-tertiary); }
      .dshdoc-chips { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; flex: 1 1 auto; }
      .dshdoc-chip { height: 30px; padding: 0 11px; border-radius: 999px; border: 1px solid transparent; background: transparent; color: var(--dsw-alias-label-secondary); font: inherit; font-size: 12.5px; cursor: pointer; white-space: nowrap; }
      .dshdoc-chip:hover { background: color-mix(in srgb, var(--dsw-alias-label-primary) 6%, transparent); color: var(--dsw-alias-label-primary); }
      .dshdoc-chip[data-active="true"] { color: var(--dsw-alias-brand-primary); border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 30%, transparent); background: color-mix(in srgb, var(--dsw-alias-brand-primary) 10%, transparent); }
      .dshdoc-chip-dot { display: inline-block; width: 7px; height: 7px; border-radius: 999px; margin-right: 5px; vertical-align: 1px; }
      .dshdoc-select { height: 32px; border-radius: 9px; border: 1px solid var(--dshdoc-border); background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary); font: inherit; font-size: 12.5px; padding: 0 8px; cursor: pointer; max-width: 180px; }
      .dshdoc-list-wrap { flex: 1; min-height: 0; overflow: auto; border-top: 1px solid var(--dshdoc-border); padding: 10px 14px 28px; }
      .dshdoc-row { display: flex; align-items: center; gap: 12px; width: 100%; padding: 9px 11px; border: 1px solid transparent; border-radius: 11px; background: transparent; color: inherit; font: inherit; text-align: left; cursor: pointer; outline: none; }
      .dshdoc-row:hover { background: color-mix(in srgb, var(--dsw-alias-label-primary) 4.5%, transparent); }
      .dshdoc-row:focus-visible { border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 55%, transparent); }
      .dshdoc-tile { flex: none; width: 38px; height: 42px; border-radius: 9px; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 6px; font-size: 9.5px; font-weight: 700; letter-spacing: 0.02em; position: relative; overflow: hidden; }
      .dshdoc-tile::after { content: ""; position: absolute; top: 0; right: 0; border-width: 0 9px 9px 0; border-style: solid; border-color: transparent rgba(255, 255, 255, 0.5) transparent transparent; }
      .dshdoc-row-main { flex: 1; min-width: 0; }
      .dshdoc-name { display: block; font-size: 14px; font-weight: 500; line-height: 1.45; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .dshdoc-meta { display: block; margin-top: 2px; font-size: 12px; line-height: 1.5; color: var(--dsw-alias-label-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .dshdoc-meta span + span::before { content: "·"; margin: 0 6px; color: var(--dsw-alias-label-tertiary); }
      .dshdoc-row-side { flex: none; text-align: right; font-size: 11.5px; color: var(--dsw-alias-label-tertiary); display: flex; flex-direction: column; gap: 2px; align-items: flex-end; }
      .dshdoc-edited-flag { color: var(--dsw-alias-state-warn-primary); white-space: nowrap; }
      .dshdoc-session-dot { display: inline-block; width: 6px; height: 6px; border-radius: 999px; background: var(--dsw-alias-brand-primary); margin-right: 5px; vertical-align: 1px; }
      .dshdoc-empty { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 40px 24px 80px; text-align: center; }
      .dshdoc-empty-art { color: var(--dsw-alias-label-tertiary); opacity: 0.9; margin-bottom: 4px; }
      .dshdoc-empty-title { font-size: 15px; font-weight: 600; }
      .dshdoc-empty-body { font-size: 12.5px; line-height: 1.65; color: var(--dsw-alias-label-secondary); max-width: 460px; }
      .dshdoc-skeleton { padding: 12px 4px; }
      .dshdoc-skeleton-row { display: flex; gap: 12px; align-items: center; padding: 9px 11px; }
      .dshdoc-skeleton-tile { width: 38px; height: 42px; border-radius: 9px; background: color-mix(in srgb, var(--dsw-alias-label-primary) 7%, transparent); }
      .dshdoc-skeleton-lines { flex: 1; display: flex; flex-direction: column; gap: 7px; }
      .dshdoc-skeleton-line { height: 10px; border-radius: 5px; background: color-mix(in srgb, var(--dsw-alias-label-primary) 6%, transparent); animation: dshdoc-pulse 1.4s ease-in-out infinite; }
      @keyframes dshdoc-pulse { 0%, 100% { opacity: 0.55; } 50% { opacity: 1; } }
      .dshdoc-toast { position: absolute; left: 50%; bottom: 22px; transform: translateX(-50%); max-width: min(560px, calc(100% - 40px)); padding: 9px 14px; border-radius: 10px; border: 1px solid var(--dshdoc-border); background: var(--dsw-alias-bg-overlay); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18); font-size: 12.5px; color: var(--dsw-alias-label-primary); z-index: 40; }
      .dshdoc-toast[data-error="true"] { border-color: color-mix(in srgb, var(--dsw-alias-state-error-primary) 45%, transparent); color: var(--dsw-alias-state-error-primary); }
      .dshdoc-overlay { position: absolute; inset: 0; background: rgba(10, 12, 18, 0.42); display: flex; align-items: center; justify-content: center; padding: 24px; z-index: 50; }
      .dshdoc-dialog { width: min(440px, 100%); border-radius: 14px; border: 1px solid var(--dshdoc-border); background: var(--dsw-alias-bg-overlay); box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28); padding: 20px; }
      .dshdoc-dialog-title { font-size: 15px; font-weight: 600; }
      .dshdoc-dialog-body { margin-top: 6px; font-size: 12.5px; line-height: 1.6; color: var(--dsw-alias-label-secondary); }
      .dshdoc-input { width: 100%; height: 36px; margin-top: 14px; box-sizing: border-box; border-radius: 9px; border: 1px solid var(--dshdoc-border); background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary); font: inherit; font-size: 13.5px; padding: 0 11px; outline: none; }
      .dshdoc-input:focus { border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 55%, transparent); }
      .dshdoc-dialog-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 18px; }
      .dshdoc-error { color: var(--dsw-alias-state-error-primary); }
      .dshdoc-view-head { display: flex; align-items: center; gap: 10px; padding: 12px 16px; border-bottom: 1px solid var(--dshdoc-border); background: var(--dsw-alias-bg-layer-1); }
      .dshdoc-view-tools { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; padding: 8px 16px; border-bottom: 1px solid var(--dshdoc-border); background: var(--dsw-alias-bg-layer-1); }
      .dshdoc-view-spacer { flex: 1 1 auto; min-width: 8px; }
      .dshdoc-view-titlebox { flex: 1; min-width: 0; display: flex; align-items: center; gap: 10px; }
      .dshdoc-view-name { font-size: 15px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .dshdoc-view-sub { font-size: 11.5px; color: var(--dsw-alias-label-secondary); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .dshdoc-ws-dot { display: inline-block; width: 7px; height: 7px; border-radius: 3px; margin-right: 7px; vertical-align: 1px; }
      .dshdoc-zoom { display: flex; align-items: center; gap: 2px; border: 1px solid var(--dshdoc-border); border-radius: 9px; background: var(--dsw-alias-bg-base); padding: 2px; }
      .dshdoc-zoom-value { min-width: 44px; text-align: center; font-size: 11.5px; color: var(--dsw-alias-label-secondary); }
      .dshdoc-body { flex: 1; min-height: 0; display: flex; position: relative; border-top: 1px solid var(--dshdoc-border); }
      .dshdoc-side { flex: 0 0 330px; min-width: 0; display: flex; flex-direction: column; min-height: 0; border-right: 1px solid var(--dshdoc-border); background: var(--dsw-alias-bg-base); position: relative; z-index: 2; overflow: hidden; }
      .dshdoc-side-head { display: flex; flex-direction: column; gap: 8px; padding: 12px 12px 10px; border-bottom: 1px solid var(--dshdoc-border); background: var(--dsw-alias-bg-layer-1); }
      .dshdoc-side-head .dshdoc-search { max-width: none; width: 100%; flex: none; }
      .dshdoc-side-head .dshdoc-chips { gap: 4px; }
      .dshdoc-side-head .dshdoc-chip { height: 26px; padding: 0 8px; font-size: 11.5px; }
      .dshdoc-side-head .dshdoc-select { max-width: none; width: 100%; height: 30px; }
      .dshdoc-side-filters { display: flex; gap: 8px; min-width: 0; }
      .dshdoc-side-filters .dshdoc-select { flex: 1 1 0; min-width: 0; width: auto; }
      .dshdoc-side-list { flex: 1; min-height: 0; overflow-y: auto; overflow-x: hidden; scrollbar-gutter: stable; padding: 6px 10px 24px 8px; }
      .dshdoc-side .dshdoc-row { padding: 8px 9px; gap: 10px; }
      .dshdoc-side .dshdoc-tile { width: 34px; height: 38px; font-size: 8.5px; }
      .dshdoc-tree { display: flex; flex-direction: column; gap: 3px; }
      .dshdoc-group { --ws-h: 248; min-width: 0; }
      .dshdoc-group-head { display: flex; align-items: center; gap: 6px; width: 100%; padding: 6px 8px; border: 1px solid transparent; border-radius: 9px; background: transparent; color: inherit; font: inherit; text-align: left; cursor: pointer; outline: none; transition: background 0.16s ease, border-color 0.16s ease; }
      .dshdoc-group-head:hover { background: color-mix(in srgb, var(--dsw-alias-label-primary) 5%, transparent); }
      .dshdoc-group-head:focus-visible { border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 55%, transparent); }
      .dshdoc-group[data-level="session"] > .dshdoc-group-head { padding-left: 12px; }
      .dshdoc-group-title { flex: 1; min-width: 0; font-size: 12.5px; line-height: 1.45; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .dshdoc-group[data-level="workspace"] > .dshdoc-group-head .dshdoc-group-title { font-weight: 600; color: color-mix(in oklab, hsl(var(--ws-h) 58% 40%) 72%, var(--dsw-alias-label-primary)); }
      .dshdoc-group[data-level="session"] > .dshdoc-group-head .dshdoc-group-title { color: var(--dsw-alias-label-secondary); }
      .dshdoc-group[data-level="session"] > .dshdoc-group-head:hover .dshdoc-group-title { color: color-mix(in oklab, hsl(var(--ws-h) 55% 44%) 62%, var(--dsw-alias-label-primary)); }
      .dshdoc-group-count { flex: none; font-size: 10.5px; padding-left: 4px; color: var(--dsw-alias-label-tertiary); font-variant-numeric: tabular-nums; }
      .dshdoc-group[data-level="workspace"] > .dshdoc-group-head .dshdoc-group-count { color: color-mix(in oklab, hsl(var(--ws-h) 45% 52%) 55%, var(--dsw-alias-label-tertiary)); }
      .dshdoc-caret { flex: none; display: inline-flex; color: var(--dsw-alias-label-tertiary); transition: transform 0.12s ease; }
      .dshdoc-caret[data-open="true"] { transform: rotate(90deg); }
      .dshdoc-folder { flex: none; display: inline-flex; color: var(--dsw-alias-label-secondary); }
      .dshdoc-group[data-level="workspace"] > .dshdoc-group-head .dshdoc-folder { color: color-mix(in oklab, hsl(var(--ws-h) 62% 46%) 88%, var(--dsw-alias-label-primary)); }
      .dshdoc-group[data-level="session"] > .dshdoc-group-head .dshdoc-folder { color: color-mix(in oklab, hsl(var(--ws-h) 48% 52%) 62%, var(--dsw-alias-label-tertiary)); }
      .dshdoc-group[data-level="workspace"] > .dshdoc-group-body { margin-left: 11px; padding-left: 3px; border-left: 1px solid color-mix(in oklab, hsl(var(--ws-h) 55% 50%) 24%, transparent); }
      .dshdoc-group-body { display: flex; flex-direction: column; }
      .dshdoc-side .dshdoc-row[data-grouped="true"] { padding-left: 22px; }
      .dshdoc-tree-tools { display: flex; align-items: center; gap: 4px; }
      .dshdoc-mini { height: 24px; padding: 0 8px; border-radius: 7px; border: 1px solid var(--dshdoc-border); background: var(--dsw-alias-bg-base); color: var(--dsw-alias-label-secondary); font: inherit; font-size: 11px; cursor: pointer; white-space: nowrap; }
      .dshdoc-mini:hover { color: var(--dsw-alias-label-primary); }
      .dshdoc-row[data-selected="true"] { background: color-mix(in srgb, var(--dsw-alias-brand-primary) 9%, transparent); border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 26%, transparent); box-shadow: inset 3px 0 0 var(--dsw-alias-brand-primary); }
      .dshdoc-main { flex: 1; min-width: 0; display: flex; flex-direction: column; position: relative; background: var(--dsw-alias-bg-base); overflow: hidden; }
      .dshdoc-main-empty { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 40px; text-align: center; color: var(--dsw-alias-label-secondary); font-size: 13px; }
      .dshdoc-list-toggle { display: none; }
      .dshdoc-detail-head { display: flex; align-items: center; gap: 8px; }
      .dshdoc-detail-head .dshdoc-section-title { flex: 1; }
      .dshdoc-view-body { flex: 1; min-height: 0; display: flex; position: relative; overflow: hidden; }
      .dshdoc-view-main { flex: 1; min-width: 0; overflow: auto; padding: 40px 48px 96px; scroll-behavior: smooth; }
      .dshdoc-doc { max-width: 760px; margin: 0 auto; }
      .dshdoc-doc-pre { margin: 0; white-space: pre-wrap; word-break: break-word; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; line-height: 1.7; }
      .dshdoc-md { line-height: 1.82; word-break: break-word; text-wrap: pretty; }
      .dshdoc-md > :first-child { margin-top: 0; }
      .dshdoc-md h1 { font-size: 2em; font-weight: 650; letter-spacing: -0.022em; line-height: 1.22; margin: 1.7em 0 0.7em; padding-bottom: 0.38em; border-bottom: 1px solid var(--dshdoc-border); }
      .dshdoc-md h2 { font-size: 1.45em; font-weight: 640; letter-spacing: -0.015em; line-height: 1.32; margin: 1.8em 0 0.6em; }
      .dshdoc-md h3 { font-size: 1.16em; font-weight: 600; letter-spacing: -0.008em; margin: 1.5em 0 0.45em; }
      .dshdoc-md h4, .dshdoc-md h5, .dshdoc-md h6 { font-size: 1em; font-weight: 600; margin: 1.35em 0 0.4em; }
      .dshdoc-md p { margin: 0.85em 0; }
      .dshdoc-md strong { font-weight: 650; }
      .dshdoc-md ul, .dshdoc-md ol { margin: 0.8em 0; padding-left: 1.45em; }
      .dshdoc-md li { margin: 0.34em 0; padding-left: 0.15em; }
      .dshdoc-md li::marker { color: color-mix(in oklab, var(--dsw-alias-brand-primary) 62%, var(--dsw-alias-label-tertiary)); }
      .dshdoc-md code { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 0.87em; padding: 0.16em 0.42em; border-radius: 6px; background: color-mix(in srgb, var(--dsw-alias-label-primary) 6.5%, transparent); border: 1px solid color-mix(in srgb, var(--dsw-alias-label-primary) 7%, transparent); }
      .dshdoc-md blockquote { margin: 1.25em 0; padding: 0.6em 1.05em; border-left: 3px solid color-mix(in oklab, var(--dsw-alias-brand-primary) 55%, transparent); border-radius: 0 10px 10px 0; background: color-mix(in srgb, var(--dsw-alias-brand-primary) 5%, transparent); color: var(--dsw-alias-label-secondary); }
      .dshdoc-md blockquote p { margin: 0.3em 0; }
      .dshdoc-md hr { margin: 2.4em auto; width: 38%; border: 0; border-top: 1px solid var(--dshdoc-border); }
      .dshdoc-md a { color: var(--dsw-alias-brand-primary); text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 1px; text-decoration-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 35%, transparent); transition: text-decoration-color 0.18s ease; }
      .dshdoc-md a:hover { text-decoration-color: currentColor; }
      .dshdoc-md table { width: 100%; border-collapse: separate; border-spacing: 0; margin: 1.2em 0; font-size: 0.93em; border: 1px solid var(--dshdoc-border); border-radius: 12px; overflow: hidden; font-variant-numeric: tabular-nums; }
      .dshdoc-md th, .dshdoc-md td { padding: 9px 13px; text-align: left; border-bottom: 1px solid var(--dshdoc-border); }
      .dshdoc-md th { font-weight: 600; background: color-mix(in srgb, var(--dsw-alias-label-primary) 4.5%, transparent); }
      .dshdoc-md tr:last-child td { border-bottom: none; }
      .dshdoc-md tbody tr:nth-child(even) { background: color-mix(in srgb, var(--dsw-alias-label-primary) 2.2%, transparent); }
      .dshdoc-md img { display: block; max-width: 100%; height: auto; margin: 1.35em auto; border-radius: 12px; box-shadow: 0 14px 34px color-mix(in srgb, var(--dsw-alias-label-primary) 14%, transparent); }
      .dshdoc-md-task { list-style: none; margin-left: -1.25em; display: flex; gap: 9px; align-items: flex-start; }
      .dshdoc-md-check { flex: none; width: 16px; height: 16px; margin-top: 0.24em; border-radius: 5px; border: 1px solid var(--dshdoc-border); display: inline-flex; align-items: center; justify-content: center; font-size: 10px; line-height: 1; color: #fff; }
      .dshdoc-md-task[data-done="true"] .dshdoc-md-check { background: var(--dsw-alias-brand-primary); border-color: transparent; }
      .dshdoc-md-task[data-done="true"] > span:last-child { color: var(--dsw-alias-label-tertiary); }
      .dshdoc-code { margin: 1.2em 0; border: 1px solid var(--dshdoc-border); border-radius: 12px; overflow: hidden; background: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 90%, var(--dsw-alias-bg-base)); box-shadow: inset 0 1px 0 color-mix(in srgb, var(--dsw-alias-label-primary) 4%, transparent); }
      .dshdoc-code-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 5px 8px 5px 13px; border-bottom: 1px solid color-mix(in srgb, var(--dsw-alias-label-primary) 7%, transparent); background: color-mix(in srgb, var(--dsw-alias-label-primary) 3.5%, transparent); }
      .dshdoc-code-lang { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--dsw-alias-label-tertiary); }
      .dshdoc-code-copy { font: inherit; font-size: 11px; color: var(--dsw-alias-label-secondary); background: transparent; border: 1px solid transparent; border-radius: 6px; padding: 2px 9px; cursor: pointer; transition: background 0.18s ease, color 0.18s ease; }
      .dshdoc-code-copy:hover { background: color-mix(in srgb, var(--dsw-alias-label-primary) 7%, transparent); color: var(--dsw-alias-label-primary); }
      .dshdoc-code-copy:active { transform: translateY(1px); }
      .dshdoc-code-copy[data-copied="true"] { color: var(--dsw-alias-state-success-primary); }
      .dshdoc-code-body { margin: 0; padding: 14px 16px; overflow-x: auto; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 0.86em; line-height: 1.72; tab-size: 2; }
      .dshdoc-code-body code { background: none; border: none; padding: 0; font-size: inherit; }
      .dshdoc-tok-kw { color: color-mix(in oklab, #b3452a 78%, var(--dsw-alias-label-primary)); font-weight: 600; }
      .dshdoc-tok-str { color: color-mix(in oklab, #157a5c 78%, var(--dsw-alias-label-primary)); }
      .dshdoc-tok-num { color: color-mix(in oklab, #9a5b12 80%, var(--dsw-alias-label-primary)); }
      .dshdoc-tok-const { color: color-mix(in oklab, #a13a6b 76%, var(--dsw-alias-label-primary)); }
      .dshdoc-tok-fn { color: color-mix(in oklab, #2f5fb3 80%, var(--dsw-alias-label-primary)); }
      .dshdoc-tok-type { color: color-mix(in oklab, #0e6f86 76%, var(--dsw-alias-label-primary)); }
      .dshdoc-tok-attr { color: color-mix(in oklab, #8a5a13 78%, var(--dsw-alias-label-primary)); }
      .dshdoc-tok-tag { color: color-mix(in oklab, #a63a4e 78%, var(--dsw-alias-label-primary)); }
      .dshdoc-tok-var { color: color-mix(in oklab, #6b4bb0 72%, var(--dsw-alias-label-primary)); }
      .dshdoc-tok-com { color: var(--dsw-alias-label-tertiary); font-style: italic; }
      .dshdoc-tok-op, .dshdoc-tok-punc { color: color-mix(in oklab, var(--dsw-alias-label-secondary) 85%, var(--dsw-alias-label-primary)); }
      .dshdoc-tok-add { color: color-mix(in oklab, #157a3c 80%, var(--dsw-alias-label-primary)); background: color-mix(in srgb, #157a3c 9%, transparent); }
      .dshdoc-tok-del { color: color-mix(in oklab, #b42318 78%, var(--dsw-alias-label-primary)); background: color-mix(in srgb, #b42318 9%, transparent); }
      .dshdoc-tok-meta { color: var(--dsw-alias-label-tertiary); }
      .dshdoc-md-heading { scroll-margin-top: 96px; }
      .dshdoc-outline { position: absolute; top: 0; bottom: 0; left: 0; z-index: 12; width: 340px; display: flex; align-items: center; padding: 18px 0 26px 8px; pointer-events: none; }
      .dshdoc-outline[data-mode="hidden"] { display: none; }
      .dshdoc-outline[data-mode="full"] { padding-left: 12px; }
      .dshdoc-outline-panel { --rail-w: 150px; position: relative; display: flex; flex-direction: column; width: var(--rail-w); max-height: min(66vh, 620px); box-sizing: border-box; padding: 5px 4px; pointer-events: auto; background: transparent; border: none; user-select: none; -webkit-tap-highlight-color: transparent; }
      .dshdoc-outline-list { position: relative; display: flex; flex-direction: column; gap: 1px; min-height: 0; overflow-y: auto; overflow-x: hidden; scrollbar-width: none; padding: 2px 0; }
      .dshdoc-outline-list[data-overflow="true"] { -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 12px, #000 calc(100% - 12px), transparent 100%); mask-image: linear-gradient(to bottom, transparent 0, #000 12px, #000 calc(100% - 12px), transparent 100%); }
      .dshdoc-outline-list::-webkit-scrollbar { display: none; }
      .dshdoc-outline-item { --size: 12px; --blur: 0px; --alpha: 1; display: flex; align-items: center; gap: 8px; width: 100%; height: 24px; box-sizing: border-box; margin: 0; padding: 0 9px 0 7px; border: none; border-radius: 8px; background: transparent; color: color-mix(in srgb, var(--dsw-alias-label-primary) 78%, transparent); font: inherit; font-size: var(--size); line-height: 1.35; text-align: left; cursor: pointer; outline: none; opacity: var(--alpha); filter: blur(var(--blur)); transition: font-size 0.36s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.36s ease, filter 0.36s ease, color 0.2s ease, transform 0.28s cubic-bezier(0.22, 1, 0.36, 1); }
      .dshdoc-outline-item[data-level="1"] { padding-left: 7px; }
      .dshdoc-outline-item[data-level="2"] { padding-left: 19px; }
      .dshdoc-outline-item[data-active="true"] { color: var(--dsw-alias-brand-primary); font-weight: 600; }
      .dshdoc-outline-item:hover, .dshdoc-outline-item:focus-visible { opacity: 1; filter: none; color: var(--dsw-alias-label-primary); font-size: calc(var(--size) + 1.4px); transform: translateX(2px); transition-duration: 0.18s; }
      .dshdoc-outline-item[data-active="true"]:hover, .dshdoc-outline-item[data-active="true"]:focus-visible { color: var(--dsw-alias-brand-primary); }
      .dshdoc-outline-item:focus-visible { box-shadow: 0 0 0 2px color-mix(in srgb, var(--dsw-alias-brand-primary) 38%, transparent); }
      .dshdoc-outline-tick { flex: none; width: 11px; height: 1.5px; border-radius: 2px; background: currentColor; opacity: 0.5; transition: width 0.34s cubic-bezier(0.22, 1, 0.36, 1), height 0.34s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.28s ease, box-shadow 0.3s ease; }
      .dshdoc-outline-item[data-level="2"] .dshdoc-outline-tick { width: 7px; }
      .dshdoc-outline-item[data-active="true"] .dshdoc-outline-tick { width: 18px; height: 2px; opacity: 1; box-shadow: 0 0 10px color-mix(in srgb, var(--dsw-alias-brand-primary) 62%, transparent); }
      .dshdoc-outline-label { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; transition: opacity 0.26s ease, transform 0.36s cubic-bezier(0.22, 1, 0.36, 1); }
      .dshdoc-outline[data-mode="compact"] .dshdoc-outline-label { opacity: 0; transform: translateX(-6px); }
      .dshdoc-outline[data-mode="compact"] .dshdoc-outline-item { gap: 0; }
      .dshdoc-outline[data-mode="compact"] .dshdoc-outline-item[data-level="2"] { padding-left: 12px; }
      .dshdoc-outline[data-mode="compact"] .dshdoc-outline-item[data-active="true"] .dshdoc-outline-tick { width: 14px; }
      @media (prefers-reduced-motion: reduce) {
        .dshdoc-outline-item, .dshdoc-outline-tick, .dshdoc-outline-label { transition-duration: 0.01ms !important; }
        .dshdoc-view-main { scroll-behavior: auto; }
      }
      .dshdoc-media { display: block; max-width: 100%; margin: 0 auto; border-radius: 8px; }
      .dshdoc-pdf { width: 100%; height: 100%; border: none; background: #fff; }
      .dshdoc-unsupported { max-width: 520px; margin: 60px auto; padding: 28px; border: 1px dashed var(--dshdoc-border); border-radius: 14px; text-align: center; color: var(--dsw-alias-label-secondary); font-size: 13px; line-height: 1.7; }
      .dshdoc-detail { position: absolute; top: 0; right: 0; bottom: 0; width: min(360px, 100%); z-index: 20; border-left: 1px solid var(--dshdoc-border); background: var(--dsw-alias-bg-base); box-shadow: -12px 0 32px rgba(0, 0, 0, 0.16); overflow: auto; padding: 14px 14px 28px; display: flex; flex-direction: column; gap: 12px; }
      .dshdoc-section-title { font-size: 11px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--dsw-alias-label-tertiary); }
      .dshdoc-card { border: 1px solid var(--dshdoc-border); border-radius: 12px; background: var(--dsw-alias-bg-layer-1); padding: 11px 12px; }
      .dshdoc-card-title { display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 11px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--dsw-alias-label-tertiary); margin-bottom: 9px; }
      .dshdoc-card-count { font-weight: 500; letter-spacing: 0; text-transform: none; color: var(--dsw-alias-label-secondary); }
      .dshdoc-fields { display: grid; grid-template-columns: 64px 1fr; gap: 8px 10px; font-size: 12.5px; }
      .dshdoc-field-label { color: var(--dsw-alias-label-secondary); }
      .dshdoc-field-value { color: var(--dsw-alias-label-primary); word-break: break-all; min-width: 0; }
      .dshdoc-pathbox { margin-top: 10px; padding: 7px 9px; border-radius: 8px; background: color-mix(in srgb, var(--dsw-alias-label-primary) 5%, transparent); border: 1px solid var(--dshdoc-border); font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 10.5px; line-height: 1.5; color: var(--dsw-alias-label-secondary); word-break: break-all; }
      .dshdoc-session { border: 1px solid var(--dshdoc-border); border-radius: 10px; padding: 10px 11px 4px 12px; background: var(--dsw-alias-bg-base); border-left: 3px solid transparent; }
      .dshdoc-session[data-role="origin"] { border-left-color: var(--dsw-alias-brand-primary); }
      .dshdoc-session[data-role="editor"] { border-left-color: var(--dsw-alias-state-warn-primary); }
      .dshdoc-session + .dshdoc-session { margin-top: 9px; }
      .dshdoc-session-head { display: flex; align-items: center; gap: 7px; cursor: pointer; border-radius: 7px; outline: none; }
      .dshdoc-session-head:hover .dshdoc-session-title { color: var(--dsw-alias-brand-primary); }
      .dshdoc-session-head:focus-visible { box-shadow: 0 0 0 2px color-mix(in srgb, var(--dsw-alias-brand-primary) 35%, transparent); }
      .dshdoc-session[data-open="false"] { padding-bottom: 10px; }
      .dshdoc-role { font-size: 9.5px; font-weight: 700; letter-spacing: 0.02em; padding: 2px 6px; border-radius: 5px; flex: none; }
      .dshdoc-role[data-role="origin"] { color: var(--dsw-alias-brand-primary); background: color-mix(in srgb, var(--dsw-alias-brand-primary) 13%, transparent); }
      .dshdoc-role[data-role="editor"] { color: var(--dsw-alias-state-warn-primary); background: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 14%, transparent); }
      .dshdoc-session-title { flex: 1; min-width: 0; font-size: 12.5px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .dshdoc-session-sub { margin-top: 3px; font-size: 10.5px; color: var(--dsw-alias-label-tertiary); }
      .dshdoc-jump { flex: none; font-size: 11px; color: var(--dsw-alias-brand-primary); background: transparent; border: none; padding: 2px 0; cursor: pointer; font-family: inherit; }
      .dshdoc-jump:hover { text-decoration: underline; }
      .dshdoc-event { margin-top: 9px; padding: 8px 9px 9px; border-radius: 8px; background: color-mix(in srgb, var(--dsw-alias-label-primary) 3.5%, transparent); border-left: 3px solid color-mix(in srgb, var(--dsw-alias-label-primary) 14%, transparent); }
      .dshdoc-event[data-kind="write"] { border-left-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 70%, transparent); background: color-mix(in srgb, var(--dsw-alias-brand-primary) 5%, transparent); }
      .dshdoc-event[data-kind="edit"] { border-left-color: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 75%, transparent); background: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 5%, transparent); }
      .dshdoc-event[data-kind="present"] { border-left-color: color-mix(in srgb, var(--dsw-alias-state-success-primary) 70%, transparent); background: color-mix(in srgb, var(--dsw-alias-state-success-primary) 5%, transparent); }
      .dshdoc-event-head { display: flex; align-items: flex-start; gap: 7px; }
      .dshdoc-event-summary { flex: 1; min-width: 0; font-size: 12px; line-height: 1.5; color: var(--dsw-alias-label-primary); }
      .dshdoc-kind-chip { flex: none; font-size: 9.5px; font-weight: 700; padding: 2px 6px; border-radius: 5px; color: var(--dsw-alias-label-secondary); background: color-mix(in srgb, var(--dsw-alias-label-primary) 8%, transparent); }
      .dshdoc-kind-chip[data-kind="write"] { color: var(--dsw-alias-brand-primary); background: color-mix(in srgb, var(--dsw-alias-brand-primary) 14%, transparent); }
      .dshdoc-kind-chip[data-kind="edit"] { color: var(--dsw-alias-state-warn-primary); background: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 15%, transparent); }
      .dshdoc-kind-chip[data-kind="present"] { color: var(--dsw-alias-state-success-primary); background: color-mix(in srgb, var(--dsw-alias-state-success-primary) 14%, transparent); }
      .dshdoc-event-meta { margin-top: 6px; display: flex; align-items: center; gap: 5px; flex-wrap: wrap; font-size: 10px; color: var(--dsw-alias-label-tertiary); }
      .dshdoc-pill { padding: 1px 6px; border-radius: 999px; background: color-mix(in srgb, var(--dsw-alias-label-primary) 6%, transparent); border: 1px solid var(--dshdoc-border); font-size: 10px; }
      .dshdoc-event-meta button { border: none; background: transparent; color: var(--dsw-alias-brand-primary); font: inherit; cursor: pointer; padding: 0 0 0 2px; }
      .dshdoc-event-preview { margin: 7px 0 0; padding: 7px 9px; border-radius: 7px; background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-secondary); font-size: 10.5px; line-height: 1.6; max-height: 110px; overflow: hidden; white-space: pre-wrap; word-break: break-word; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
      .dshdoc-actions { display: flex; flex-direction: column; gap: 6px; }
      .dshdoc-actions .dshdoc-btn { width: 100%; justify-content: flex-start; }
      .dshdoc-divider { height: 1px; margin: 4px 0; background: var(--dshdoc-border); }
      .dshdoc-checkbox { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--dsw-alias-label-secondary); }
      .dshdoc-scrim { display: none; }
      @media (max-width: 900px) {
        .dshdoc-scrim { display: block; position: absolute; inset: 0; z-index: 25; background: rgba(8, 10, 16, 0.32); }
        .dshdoc-side { position: absolute; top: 0; bottom: 0; left: 0; z-index: 30; width: min(340px, 88%); box-shadow: 14px 0 34px rgba(0, 0, 0, 0.2); display: none; }
        .dshdoc-side[data-open="true"] { display: flex; }
        .dshdoc-list-toggle { display: inline-flex; }
      }
    `

    function translateWith(dict) {
      return (key) => dict[key] ?? EN[key] ?? key
    }

    function formatBytes(bytes) {
      if (!Number.isFinite(bytes) || bytes < 0) return '—'
      if (bytes < 1024) return `${bytes} B`
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
      return `${(bytes / 1024 / 1024).toFixed(1)} MB`
    }

    const timeFormat = new Intl.DateTimeFormat(undefined, {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hour12: false,
    })

    function formatTime(ms) {
      const date = new Date(ms)
      return Number.isNaN(date.getTime()) ? '—' : timeFormat.format(date)
    }

    function folderOf(rel) {
      const value = String(rel || '')
      const index = Math.max(value.lastIndexOf('\\'), value.lastIndexOf('/'))
      return index > 0 ? value.slice(0, index) : '.'
    }

    function tileLabel(doc) {
      const ext = (doc.ext || '').toUpperCase()
      if (ext === 'DOCX' || ext === 'DOC') return 'DOC'
      if (ext === 'XLSX' || ext === 'XLS' || ext === 'CSV') return 'XLS'
      if (ext === 'PPTX' || ext === 'PPT') return 'PPT'
      if (ext === 'MD') return 'MD'
      if (ext === 'PDF') return 'PDF'
      return ext.slice(0, 4) || 'FILE'
    }

    function tileStyle(doc) {
      const color = doc.color || '#5b6472'
      return {
        color,
        background: `color-mix(in srgb, ${color} 16%, transparent)`,
        border: `1px solid color-mix(in srgb, ${color} 28%, transparent)`,
      }
    }

    async function requestJson(path, init) {
      const response = await fetch(API + path, {
        ...init,
        cache: 'no-store',
        headers: { 'x-dsh-documents': '1', ...(init && init.headers ? init.headers : {}) },
      })
      const data = await response.json().catch(() => null)
      if (!response.ok || data === null || data.ok === false) {
        throw new Error((data && data.error) || `HTTP ${response.status}`)
      }
      return data
    }

    function DocGlyph({ size = 18 }) {
      return h('svg', { width: size, height: size, viewBox: '0 0 20 20', fill: 'none', 'aria-hidden': true },
        h('path', { d: 'M5.2 2.6h6.1l3.5 3.4v11.4H5.2z', stroke: 'currentColor', strokeWidth: 1.4, strokeLinejoin: 'round' }),
        h('path', { d: 'M11.2 2.9v3.2h3.4', stroke: 'currentColor', strokeWidth: 1.4, strokeLinejoin: 'round' }),
        h('path', { d: 'M7.3 9.6h4.9M7.3 12.4h4.9', stroke: 'currentColor', strokeWidth: 1.3, strokeLinecap: 'round' }),
      )
    }

    function SearchGlyph() {
      return h('svg', { width: 15, height: 15, viewBox: '0 0 16 16', fill: 'none', 'aria-hidden': true },
        h('circle', { cx: 7, cy: 7, r: 4.4, stroke: 'currentColor', strokeWidth: 1.5 }),
        h('path', { d: 'M10.4 10.4 14 14', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' }),
      )
    }

    function ListGlyph() {
      return h('svg', { width: 16, height: 16, viewBox: '0 0 16 16', fill: 'none', 'aria-hidden': true },
        h('path', { d: 'M3 4.2h10M3 8h10M3 11.8h10', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' }),
      )
    }

    function CloseGlyph() {
      return h('svg', { width: 15, height: 15, viewBox: '0 0 16 16', fill: 'none', 'aria-hidden': true },
        h('path', { d: 'm4 4 8 8M12 4l-8 8', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' }),
      )
    }

    function CaretGlyph() {
      return h('svg', { width: 12, height: 12, viewBox: '0 0 16 16', fill: 'none', 'aria-hidden': true },
        h('path', { d: 'M6.2 3.4 11 8l-4.8 4.6', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }),
      )
    }

    function FolderGlyph() {
      return h('svg', { width: 14, height: 14, viewBox: '0 0 16 16', fill: 'none', 'aria-hidden': true },
        h('path', { d: 'M2 4.4a1.4 1.4 0 0 1 1.4-1.4h2.5l1.4 1.6h5.3A1.4 1.4 0 0 1 14 6v5.6a1.4 1.4 0 0 1-1.4 1.4H3.4A1.4 1.4 0 0 1 2 11.6z', stroke: 'currentColor', strokeWidth: 1.3, strokeLinejoin: 'round' }),
      )
    }

    function SessionGlyph() {
      return h('svg', { width: 14, height: 14, viewBox: '0 0 16 16', fill: 'none', 'aria-hidden': true },
        h('path', { d: 'M2.6 3.9A1.3 1.3 0 0 1 3.9 2.6h8.2a1.3 1.3 0 0 1 1.3 1.3v6.2a1.3 1.3 0 0 1-1.3 1.3H7.4L4.3 14v-2.6H3.9a1.3 1.3 0 0 1-1.3-1.3z', stroke: 'currentColor', strokeWidth: 1.3, strokeLinejoin: 'round' }),
      )
    }

    function PanelIcon({ size = 16 }) {
      return h('svg', {
        width: size, height: size, viewBox: '0 0 20 20', fill: 'none',
        'aria-hidden': true, style: { display: 'block' },
      },
      h('path', { d: 'M5.1 2.5h5.8l3.9 3.8v11.2H5.1z', stroke: 'currentColor', strokeWidth: 1.4, strokeLinejoin: 'round' }),
      h('path', { d: 'M10.8 2.8v3.6h3.7', stroke: 'currentColor', strokeWidth: 1.4, strokeLinejoin: 'round' }),
      h('path', { d: 'M7.2 9.4h4.9M7.2 12.2h4.9M7.2 15h3.1', stroke: 'currentColor', strokeWidth: 1.25, strokeLinecap: 'round' }),
      )
    }

    function inlineNodes(text, prefix) {
      const nodes = []
      const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\)|\*[^*\n]+\*)/g
      let last = 0
      let match
      let index = 0
      while ((match = pattern.exec(text)) !== null) {
        if (match.index > last) nodes.push(text.slice(last, match.index))
        const token = match[0]
        const key = `${prefix}-${index++}`
        if (token.startsWith('**')) {
          nodes.push(h('strong', { key }, token.slice(2, -2)))
        } else if (token.startsWith('`')) {
          nodes.push(h('code', { key }, token.slice(1, -1)))
        } else if (token.startsWith('[')) {
          const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(token)
          if (link && /^https?:\/\//i.test(link[2])) {
            nodes.push(h('a', { key, href: link[2], target: '_blank', rel: 'noreferrer noopener' }, link[1]))
          } else {
            nodes.push(token)
          }
        } else {
          nodes.push(h('em', { key }, token.slice(1, -1)))
        }
        last = match.index + token.length
      }
      if (last < text.length) nodes.push(text.slice(last))
      return nodes
    }

    function splitRow(line) {
      return line.replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim())
    }

    // ---------------------------------------------------------------- syntax colouring
    // Self-contained tokenizer: the plugin ships as two plain files with no
    // dependencies, so pulling in Prism or highlight.js (100 KB+) is not an option.

    const JS_KEYWORDS = 'await async break case catch class const continue debugger default delete do else export extends finally for from function get if import in instanceof let new of return set static super switch this throw try typeof var void while yield'
    const JS_TYPES = 'Array Boolean Date Error JSON Map Math Number Object Promise Proxy Reflect RegExp Set String Symbol WeakMap WeakSet Intl BigInt'
    const JS_CONSTANTS = 'true false null undefined NaN Infinity'

    const CODE_LANGS = {
      javascript: { line: '//', block: ['/*', '*/'], quotes: ['"', "'", '`'], keywords: JS_KEYWORDS, types: JS_TYPES, constants: JS_CONSTANTS },
      typescript: {
        line: '//', block: ['/*', '*/'], quotes: ['"', "'", '`'],
        keywords: `${JS_KEYWORDS} interface type enum implements namespace declare readonly abstract as satisfies keyof infer is asserts override public private protected`,
        types: `${JS_TYPES} Record Partial Readonly Pick Omit Exclude Extract NonNullable ReturnType Awaited`,
        constants: JS_CONSTANTS,
      },
      json: { line: null, block: null, quotes: ['"'], keywords: '', types: '', constants: 'true false null' },
      python: {
        line: '#', block: null, quotes: ['"', "'"], triple: true,
        keywords: 'and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield match case',
        types: 'int float str bool list dict set tuple bytes object Exception ValueError TypeError RuntimeError',
        constants: 'True False None self cls',
      },
      bash: {
        line: '#', block: null, quotes: ['"', "'"],
        keywords: 'if then else elif fi for while do done case esac function return local export readonly declare in select until time',
        types: '', constants: 'true false', variables: true,
      },
      powershell: {
        line: '#', block: ['<#', '#>'], quotes: ['"', "'"],
        keywords: 'if else elseif switch foreach for while do function param return try catch finally throw begin process end filter class enum using',
        types: '', constants: '$true $false $null', variables: true,
      },
      css: { line: null, block: ['/*', '*/'], quotes: ['"', "'"], keywords: 'important media supports keyframes import charset layer container font-face', types: '', constants: '', css: true },
      html: { html: true },
      sql: {
        line: '--', block: ['/*', '*/'], quotes: ["'", '"'],
        keywords: 'select from where join left right inner outer full on group by order having limit offset insert into values update set delete create table alter drop index view as and or not null is in like between distinct union all case when then else end primary key foreign references default',
        types: 'int integer varchar text date timestamp boolean decimal numeric',
        constants: 'null true false', caseInsensitive: true,
      },
      yaml: { yaml: true },
      go: {
        line: '//', block: ['/*', '*/'], quotes: ['"', '`'],
        keywords: 'break case chan const continue default defer else fallthrough for func go goto if import interface map package range return select struct switch type var',
        types: 'bool byte complex64 complex128 error float32 float64 int int8 int16 int32 int64 rune string uint uint8 uint16 uint32 uint64 uintptr',
        constants: 'true false nil iota',
      },
      rust: {
        line: '//', block: ['/*', '*/'], quotes: ['"'],
        keywords: 'as async await break const continue crate dyn else enum extern fn for if impl in let loop match mod move mut pub ref return self static struct super trait type unsafe use where while',
        types: 'bool char f32 f64 i8 i16 i32 i64 i128 isize str u8 u16 u32 u64 u128 usize String Vec Option Result Box',
        constants: 'true false None Some Ok Err',
      },
      java: {
        line: '//', block: ['/*', '*/'], quotes: ['"', "'"],
        keywords: 'abstract assert break case catch class const continue default do else enum extends final finally for goto if implements import instanceof interface native new package private protected public return static strictfp super switch synchronized this throw throws transient try volatile while var record sealed permits',
        types: 'boolean byte char double float int long short void String Object Integer Long Double List Map Set Optional',
        constants: 'true false null',
      },
      c: {
        line: '//', block: ['/*', '*/'], quotes: ['"', "'"],
        keywords: 'auto break case const continue default do else enum extern for goto if inline register restrict return sizeof static struct switch typedef union volatile while',
        types: 'char double float int long short signed unsigned void size_t int8_t int16_t int32_t int64_t uint8_t uint16_t uint32_t uint64_t FILE',
        constants: 'NULL true false',
      },
      diff: { diff: true },
    }

    CODE_LANGS.cpp = {
      ...CODE_LANGS.c,
      keywords: `${CODE_LANGS.c.keywords} class namespace template typename public private protected virtual override new delete nullptr using operator friend explicit`,
      constants: 'NULL true false nullptr',
    }

    const CODE_ALIASES = {
      js: 'javascript', mjs: 'javascript', cjs: 'javascript', jsx: 'javascript',
      ts: 'typescript', tsx: 'typescript', mts: 'typescript',
      py: 'python', python3: 'python',
      sh: 'bash', shell: 'bash', zsh: 'bash', console: 'bash', dockerfile: 'bash',
      ps1: 'powershell', pwsh: 'powershell', ps: 'powershell',
      scss: 'css', less: 'css', sass: 'css',
      htm: 'html', xhtml: 'html', xml: 'html', svg: 'html', vue: 'html',
      yml: 'yaml', toml: 'yaml', ini: 'yaml', conf: 'yaml', env: 'yaml',
      golang: 'go', rs: 'rust',
      cxx: 'cpp', 'c++': 'cpp', hpp: 'cpp', cc: 'cpp', h: 'c',
      patch: 'diff',
    }

    /** Map a fence info string ("```js title=x") to a known language id, or ''. */
    function canonicalLanguage(raw) {
      const key = String(raw || '').trim().toLowerCase().split(/[\s{:(]/)[0]
      if (key === '') return ''
      if (CODE_LANGS[key] !== undefined) return key
      return CODE_ALIASES[key] || ''
    }

    function wordSet(value) {
      return new Set(String(value || '').split(/\s+/).filter((entry) => entry !== ''))
    }

    /** Turn a language spec into the sets the scanner needs (cached on the spec). */
    function langSpec(lang) {
      const spec = CODE_LANGS[lang]
      if (spec.__cache === undefined) {
        spec.__cache = {
          keywords: wordSet(spec.keywords),
          types: wordSet(spec.types),
          constants: wordSet(spec.constants),
        }
      }
      return spec
    }

    function lineChunks(source) {
      return String(source).split('\n')
    }

    function yamlSpans(source) {
      const spans = []
      const lines = lineChunks(source)
      lines.forEach((line, lineIndex) => {
        if (lineIndex > 0) spans.push({ c: '', v: '\n' })
        const comment = /(^|\s)#(.*)$/.exec(line)
        const body = comment === null ? line : line.slice(0, comment.index)
        const tail = comment === null ? '' : line.slice(comment.index)
        const key = /^(\s*)(- )?([\w."'$/-][^:]*?)(:)(\s|$)/.exec(body)
        if (key === null) {
          spans.push({ c: '', v: body })
        } else {
          spans.push({ c: '', v: key[1] })
          if (key[2]) spans.push({ c: 'punc', v: key[2] })
          spans.push({ c: 'attr', v: key[3] })
          spans.push({ c: 'op', v: key[4] })
          spans.push({ c: '', v: key[5] })
          const value = body.slice(key[0].length)
          const quoted = /^(".*"|'.*')/.exec(value)
          if (quoted !== null) {
            spans.push({ c: 'str', v: quoted[0] })
            spans.push({ c: '', v: value.slice(quoted[0].length) })
          } else if (/^(true|false|null|~)$/i.test(value.trim())) {
            spans.push({ c: 'const', v: value })
          } else if (/^[+-]?\d/.test(value.trim())) {
            spans.push({ c: 'num', v: value })
          } else {
            spans.push({ c: '', v: value })
          }
        }
        if (tail !== '') spans.push({ c: 'com', v: tail })
      })
      return spans
    }

    function diffSpans(source) {
      const spans = []
      lineChunks(source).forEach((line, lineIndex) => {
        if (lineIndex > 0) spans.push({ c: '', v: '\n' })
        if (/^\+/.test(line)) spans.push({ c: 'add', v: line })
        else if (/^-/.test(line)) spans.push({ c: 'del', v: line })
        else if (/^@@/.test(line)) spans.push({ c: 'meta', v: line })
        else spans.push({ c: '', v: line })
      })
      return spans
    }

    function htmlSpans(source) {
      const spans = []
      const text = String(source)
      let index = 0
      let plain = ''
      const flush = () => {
        if (plain !== '') {
          spans.push({ c: '', v: plain })
          plain = ''
        }
      }
      while (index < text.length) {
        if (text.startsWith('<!--', index)) {
          const end = text.indexOf('-->', index + 4)
          const stop = end === -1 ? text.length : end + 3
          flush()
          spans.push({ c: 'com', v: text.slice(index, stop) })
          index = stop
          continue
        }
        if (text[index] === '<') {
          flush()
          const tag = /^<\/?([A-Za-z][\w:-]*)/.exec(text.slice(index))
          if (tag !== null) {
            spans.push({ c: 'punc', v: tag[0].slice(0, tag[0].length - tag[1].length) })
            spans.push({ c: 'tag', v: tag[1] })
            index += tag[0].length
          } else {
            spans.push({ c: 'punc', v: '<' })
            index += 1
          }
          // attributes until the closing angle bracket
          while (index < text.length && text[index] !== '>') {
            const rest = text.slice(index)
            const attr = /^\s+/.exec(rest) || /^[/=]/.exec(rest) || /^[A-Za-z_:@][\w:.-]*/.exec(rest) || /^"[^"]*"|^'[^']*'/.exec(rest)
            if (attr !== null) {
              const value = attr[0]
              let cls = ''
              if (/^\s+$/.test(value)) cls = ''
              else if (value === '=' || value === '/') cls = 'op'
              else if (/^["']/.test(value)) cls = 'str'
              else cls = 'attr'
              spans.push({ c: cls, v: value })
              index += value.length
            } else {
              spans.push({ c: 'punc', v: text[index] })
              index += 1
            }
          }
          if (index < text.length) {
            spans.push({ c: 'punc', v: '>' })
            index += 1
          }
          continue
        }
        plain += text[index]
        index += 1
      }
      flush()
      return spans
    }

    function genericSpans(source, lang) {
      const spec = langSpec(lang)
      const { keywords, types, constants } = spec.__cache
      const text = String(source)
      const spans = []
      let index = 0
      let plain = ''
      const flush = () => {
        if (plain !== '') {
          spans.push({ c: '', v: plain })
          plain = ''
        }
      }
      const push = (cls, value) => {
        flush()
        spans.push({ c: cls, v: value })
      }
      const normalise = (word) => (spec.caseInsensitive ? word.toLowerCase() : word)

      while (index < text.length) {
        const rest = text.slice(index)

        if (spec.block !== null && spec.block !== undefined && rest.startsWith(spec.block[0])) {
          const end = text.indexOf(spec.block[1], index + spec.block[0].length)
          const stop = end === -1 ? text.length : end + spec.block[1].length
          push('com', text.slice(index, stop))
          index = stop
          continue
        }

        if (spec.line !== null && rest.startsWith(spec.line)) {
          let end = text.indexOf('\n', index)
          if (end === -1) end = text.length
          push('com', text.slice(index, end))
          index = end
          continue
        }

        const quote = text[index]
        if (spec.quotes.includes(quote)) {
          const triple = spec.triple === true && rest.startsWith(quote.repeat(3))
          const fence = triple ? quote.repeat(3) : quote
          let cursor = index + fence.length
          while (cursor < text.length) {
            if (text[cursor] === '\\') {
              cursor += 2
              continue
            }
            if (text.startsWith(fence, cursor)) {
              cursor += fence.length
              break
            }
            if (!triple && text[cursor] === '\n') break
            cursor += 1
          }
          push('str', text.slice(index, Math.min(cursor, text.length)))
          index = Math.min(cursor, text.length)
          continue
        }

        if (spec.variables === true && (quote === '$' || quote === '@')) {
          const variable = /^[$@]{1,2}\{?[A-Za-z_][\w:.-]*\}?/.exec(rest)
          if (variable !== null) {
            push('var', variable[0])
            index += variable[0].length
            continue
          }
        }

        if (/[0-9]/.test(quote) && !/[\w$]/.test(text[index - 1] || '')) {
          const number = /^(0[xX][0-9a-fA-F]+|0[bB][01]+|[0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)?)([a-zA-Z%]+)?/.exec(rest)
          if (number !== null) {
            push('num', number[0])
            index += number[0].length
            continue
          }
        }

        if (/[A-Za-z_$]/.test(quote)) {
          const word = /^[A-Za-z_$][\w$]*/.exec(rest)[0]
          const key = normalise(word)
          const after = text.slice(index + word.length)
          let cls = ''
          if (spec.variables === true && (word.startsWith('$') || word.startsWith('@'))) cls = 'var'
          else if (constants.has(key)) cls = 'const'
          else if (keywords.has(key)) cls = 'kw'
          else if (types.has(key)) cls = 'type'
          else if (/^\s*\(/.test(after)) cls = 'fn'
          else if (spec.css === true && /^\s*:/.test(after)) cls = 'attr'
          if (cls === '') plain += word
          else push(cls, word)
          index += word.length
          continue
        }

        if (/\s/.test(quote)) {
          const space = /^\s+/.exec(rest)[0]
          plain += space
          index += space.length
          continue
        }

        push('op', quote)
        index += 1
      }
      flush()
      return spans
    }

    function highlightSpans(source, lang) {
      const spec = CODE_LANGS[lang]
      if (spec === undefined) return [{ c: '', v: String(source) }]
      if (spec.html === true) return htmlSpans(source)
      if (spec.diff === true) return diffSpans(source)
      if (spec.yaml === true) return yamlSpans(source)
      return genericSpans(source, lang)
    }

    function highlightNodes(source, lang, prefix) {
      return highlightSpans(source, lang).map((span, spanIndex) => (
        span.c === ''
          ? span.v
          : h('span', { key: `${prefix}-${spanIndex}`, className: `dshdoc-tok-${span.c}` }, span.v)
      ))
    }

    function CodeBlock({ code, lang, t }) {
      // Falling back to the English dictionary keeps raw keys out of the UI when
      // the host locale is unavailable.
      const translate = typeof t === 'function' ? t : translateWith(EN)
      const canonical = canonicalLanguage(lang)
      const [copied, setCopied] = React.useState(false)
      const timer = React.useRef(null)

      React.useEffect(() => () => {
        if (timer.current !== null) window.clearTimeout(timer.current)
      }, [])

      const copy = React.useCallback(() => {
        try {
          const clipboard = navigator.clipboard
          if (clipboard && typeof clipboard.writeText === 'function') {
            clipboard.writeText(code).then(() => {
              setCopied(true)
              if (timer.current !== null) window.clearTimeout(timer.current)
              timer.current = window.setTimeout(() => setCopied(false), 1600)
            }).catch(() => {})
          }
        } catch {
          // Clipboard unavailable: the block stays plain text, nothing breaks.
        }
      }, [code])

      return h('div', { className: 'dshdoc-code' },
        h('div', { className: 'dshdoc-code-head' },
          h('span', { className: 'dshdoc-code-lang' }, canonical === '' ? 'text' : canonical),
          h('button', {
            type: 'button',
            className: 'dshdoc-code-copy',
            'data-copied': String(copied),
            title: copied ? translate('code.copied') : translate('code.copy'),
            onClick: copy,
          }, copied ? translate('code.copied') : translate('code.copy')),
        ),
        h('pre', { className: 'dshdoc-code-body' },
          h('code', null, highlightNodes(code, canonical, 'tok'))),
      )
    }

    const OUTLINE_LEVEL = 2
    const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

    function prefersReducedMotion() {
      try {
        return typeof window.matchMedia === 'function' && window.matchMedia(REDUCED_MOTION).matches
      } catch {
        return false
      }
    }

    /** Heading text as it should read in the outline: inline markers removed. */
    function headingLabel(raw) {
      const text = String(raw)
        .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/`([^`]*)`/g, '$1')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/\s+/g, ' ')
        .trim()
      return text === '' ? '—' : text
    }

    function renderMarkdown(text, t) {
      const lines = String(text || '').replace(/\r\n/g, '\n').split('\n')
      const nodes = []
      const headings = []
      let index = 0
      let key = 0
      // The opening H1 is the document title, not a section of its own.
      let firstHeading = true
      const nextKey = () => `md-${key++}`
      while (index < lines.length) {
        const line = lines[index]
        if (/^\s*$/.test(line)) {
          index += 1
          continue
        }
        const fence = /^\s*```(.*)$/.exec(line)
        if (fence) {
          const language = fence[1].trim()
          index += 1
          const body = []
          while (index < lines.length && !/^\s*```/.test(lines[index])) {
            body.push(lines[index])
            index += 1
          }
          index += 1
          nodes.push(h(CodeBlock, { key: nextKey(), code: body.join('\n'), lang: language, t }))
          continue
        }
        const heading = /^(#{1,6})\s+(.*)$/.exec(line)
        if (heading) {
          const level = heading[1].length
          const source = heading[2].trim().replace(/\s+#+\s*$/, '')
          const documentTitle = firstHeading && level === 1
          firstHeading = false
          if (level <= OUTLINE_LEVEL && !documentTitle) {
            const outlineIndex = headings.length
            headings.push({ id: `dshdoc-heading-${outlineIndex}`, index: outlineIndex, level, text: headingLabel(source) })
            nodes.push(h(`h${level}`, {
              key: nextKey(),
              id: `dshdoc-heading-${outlineIndex}`,
              className: 'dshdoc-md-heading',
              'data-dshdoc-h': String(outlineIndex),
            }, inlineNodes(source, nextKey())))
          } else {
            nodes.push(h(`h${level}`, { key: nextKey() }, inlineNodes(source, nextKey())))
          }
          index += 1
          continue
        }
        if (/^\s*(---+|\*\*\*+|___+)\s*$/.test(line)) {
          nodes.push(h('hr', { key: nextKey() }))
          index += 1
          continue
        }
        if (/^\s*[-*+]\s+/.test(line)) {
          const items = []
          while (index < lines.length && /^\s*[-*+]\s+/.test(lines[index])) {
            items.push(lines[index].replace(/^\s*[-*+]\s+/, ''))
            index += 1
          }
          nodes.push(h('ul', { key: nextKey() }, items.map((item, itemIndex) => {
            const task = /^\[([ xX])\]\s+/.exec(item)
            if (task === null) {
              return h('li', { key: `${nextKey()}-${itemIndex}` }, inlineNodes(item, nextKey()))
            }
            const done = task[1].toLowerCase() === 'x'
            return h('li', { key: `${nextKey()}-${itemIndex}`, className: 'dshdoc-md-task', 'data-done': String(done) },
              h('span', { className: 'dshdoc-md-check', 'aria-hidden': true }, done ? '✓' : ''),
              h('span', null, inlineNodes(item.slice(task[0].length), nextKey())))
          })))
          continue
        }
        if (/^\s*\d+\.\s+/.test(line)) {
          const items = []
          while (index < lines.length && /^\s*\d+\.\s+/.test(lines[index])) {
            items.push(lines[index].replace(/^\s*\d+\.\s+/, ''))
            index += 1
          }
          nodes.push(h('ol', { key: nextKey() }, items.map((item, itemIndex) => (
            h('li', { key: `${nextKey()}-${itemIndex}` }, inlineNodes(item, nextKey()))
          ))))
          continue
        }
        if (/^>\s?/.test(line)) {
          const body = []
          while (index < lines.length && /^>\s?/.test(lines[index])) {
            body.push(lines[index].replace(/^>\s?/, ''))
            index += 1
          }
          nodes.push(h('blockquote', { key: nextKey() }, inlineNodes(body.join(' '), nextKey())))
          continue
        }
        if (/^\s*\|/.test(line) && index + 1 < lines.length && /^\s*\|?[\s:|-]+\|?\s*$/.test(lines[index + 1])) {
          const header = splitRow(lines[index])
          index += 2
          const rows = []
          while (index < lines.length && /^\s*\|/.test(lines[index])) {
            rows.push(splitRow(lines[index]))
            index += 1
          }
          nodes.push(h('table', { key: nextKey() },
            h('thead', null, h('tr', null, header.map((cell, cellIndex) => (
              h('th', { key: `th-${cellIndex}` }, inlineNodes(cell, nextKey()))
            )))),
            h('tbody', null, rows.map((row, rowIndex) => (
              h('tr', { key: `tr-${rowIndex}` }, row.map((cell, cellIndex) => (
                h('td', { key: `td-${cellIndex}` }, inlineNodes(cell, nextKey()))
              )))
            ))),
          ))
          continue
        }
        const paragraph = []
        while (
          index < lines.length
          && !/^\s*$/.test(lines[index])
          && !/^\s*```/.test(lines[index])
          && !/^(#{1,6})\s+/.test(lines[index])
          && !/^\s*[-*+]\s+/.test(lines[index])
          && !/^\s*\d+\.\s+/.test(lines[index])
          && !/^>\s?/.test(lines[index])
          && !/^\s*(---+|\*\*\*+|___+)\s*$/.test(lines[index])
          && !/^\s*\|/.test(lines[index])
        ) {
          paragraph.push(lines[index])
          index += 1
        }
        if (paragraph.length > 0) {
          nodes.push(h('p', { key: nextKey() }, inlineNodes(paragraph.join(' '), nextKey())))
        } else {
          index += 1
        }
      }
      return { nodes, headings }
    }

    /**
     * Document outline: a quiet rail in the left gutter that grows into a glass
     * panel on hover. Entries fade and blur with their distance from the section
     * currently being read, so the eye lands on the present position first.
     */
    function DocOutline({ headings, scrollerRef, docKey, t }) {
      const [active, setActive] = React.useState(0)
      const [mode, setMode] = React.useState('hidden')
      const [railWidth, setRailWidth] = React.useState(150)
      const [expanded, setExpanded] = React.useState(false)
      const listRef = React.useRef(null)
      const collapseTimer = React.useRef(null)
      const frame = React.useRef(0)
      const lockUntil = React.useRef(0)
      const centered = React.useRef(false)
      const count = headings.length

      const clearCollapse = () => {
        if (collapseTimer.current !== null) {
          window.clearTimeout(collapseTimer.current)
          collapseTimer.current = null
        }
      }

      const expand = () => {
        clearCollapse()
        setExpanded(true)
      }

      const collapse = () => {
        clearCollapse()
        collapseTimer.current = window.setTimeout(() => {
          collapseTimer.current = null
          setExpanded(false)
        }, 110)
      }

      React.useEffect(() => () => clearCollapse(), [])

      React.useEffect(() => {
        centered.current = false
        setActive(0)
        setExpanded(false)
      }, [docKey])

      // Keep the rail inside the gutter: full labels when the gutter affords them,
      // a bare tick rail when it does not. It never covers the body text at rest.
      React.useLayoutEffect(() => {
        const scroller = scrollerRef.current
        if (scroller === null) return undefined
        const measure = () => {
          const doc = scroller.querySelector('.dshdoc-doc')
          if (doc === null) return
          const bounds = scroller.getBoundingClientRect()
          const gutter = doc.getBoundingClientRect().left - bounds.left
          if (scroller.clientWidth < 520 || gutter < 40) {
            setMode('hidden')
            return
          }
          if (gutter >= 140) {
            setMode('full')
            setRailWidth(Math.round(Math.min(240, gutter - 22)))
          } else {
            setMode('compact')
            setRailWidth(36)
          }
        }
        measure()
        const observer = new ResizeObserver(measure)
        observer.observe(scroller)
        const doc = scroller.querySelector('.dshdoc-doc')
        if (doc !== null) observer.observe(doc)
        return () => observer.disconnect()
      }, [scrollerRef, docKey, count])

      // Scroll spy: the active section is the last heading above the reading line.
      React.useEffect(() => {
        const scroller = scrollerRef.current
        if (scroller === null) return undefined
        const update = () => {
          frame.current = 0
          if (Date.now() < lockUntil.current) return
          const marks = scroller.querySelectorAll('[data-dshdoc-h]')
          if (marks.length === 0) return
          const top = scroller.getBoundingClientRect().top
          let next = 0
          for (let cursor = 0; cursor < marks.length; cursor += 1) {
            if (marks[cursor].getBoundingClientRect().top - top <= 96) next = cursor
            else break
          }
          if (
            scroller.scrollHeight > scroller.clientHeight + 2
            && scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2
          ) {
            next = marks.length - 1
          }
          setActive((previous) => (previous === next ? previous : next))
        }
        const onScroll = () => {
          if (frame.current !== 0) return
          frame.current = window.requestAnimationFrame(update)
        }
        update()
        scroller.addEventListener('scroll', onScroll, { passive: true })
        const observer = new ResizeObserver(onScroll)
        observer.observe(scroller)
        return () => {
          scroller.removeEventListener('scroll', onScroll)
          observer.disconnect()
          if (frame.current !== 0) {
            window.cancelAnimationFrame(frame.current)
            frame.current = 0
          }
        }
      }, [scrollerRef, docKey, count])

      // Keep the active entry near the middle of the rail as the reader moves.
      React.useLayoutEffect(() => {
        const list = listRef.current
        if (list === null) return
        list.dataset.overflow = String(list.scrollHeight > list.clientHeight + 4)
        const row = list.querySelector('[data-active="true"]')
        if (row === null) return
        const target = row.offsetTop - (list.clientHeight - row.offsetHeight) / 2
        list.scrollTo({ top: Math.max(0, target), behavior: centered.current && !prefersReducedMotion() ? 'smooth' : 'auto' })
        centered.current = true
      }, [active, expanded, mode, count])

      const jumpTo = (outlineIndex) => {
        const scroller = scrollerRef.current
        if (scroller === null) return
        const target = scroller.querySelector(`[data-dshdoc-h="${outlineIndex}"]`)
        if (target === null) return
        const top = target.getBoundingClientRect().top
          - scroller.getBoundingClientRect().top
          + scroller.scrollTop
          - 84
        lockUntil.current = Date.now() + 1000
        setActive(outlineIndex)
        scroller.scrollTo({ top: Math.max(0, top), behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
      }

      return h('div', {
        className: 'dshdoc-outline',
        'data-mode': mode,
      },
      h('nav', {
        className: 'dshdoc-outline-panel',
        'aria-label': t('outline.title'),
        style: { '--rail-w': `${railWidth}px` },
        onMouseEnter: expand,
        onMouseLeave: collapse,
        onFocus: expand,
        onBlur: (event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) collapse()
        },
      },
      h('div', { className: 'dshdoc-outline-list', ref: listRef },
        headings.map((heading, outlineIndex) => {
          const distance = Math.min(Math.abs(outlineIndex - active), 5)
          const baseSize = Math.max(9.4, 13 - distance * 0.62)
          const size = expanded ? baseSize + Math.max(0, 2.2 - distance * 0.55) : baseSize
          const blur = distance * (expanded ? 0.44 : 0.5)
          const alpha = expanded ? Math.max(0.22, 1 - distance * 0.15) : Math.max(0.16, 1 - distance * 0.168)
          return h('button', {
            key: heading.id,
            type: 'button',
            className: 'dshdoc-outline-item',
            'data-level': String(heading.level),
            'data-active': String(outlineIndex === active),
            'aria-current': outlineIndex === active ? 'location' : undefined,
            title: heading.text,
            style: {
              '--size': `${size.toFixed(2)}px`,
              '--blur': `${blur.toFixed(2)}px`,
              '--alpha': alpha.toFixed(3),
            },
            onClick: () => jumpTo(outlineIndex),
          },
          h('span', { className: 'dshdoc-outline-tick', 'aria-hidden': true }),
          h('span', { className: 'dshdoc-outline-label' }, heading.text))
        }),
      )))
    }

    /** Stable hue per workspace name, so every folder keeps its own colour. */
    function workspaceHue(name) {
      const text = String(name || '')
      let hash = 7
      for (let index = 0; index < text.length; index += 1) {
        hash = (hash * 31 + text.charCodeAt(index)) >>> 0
      }
      return hash % 360
    }

    function DocumentsPage(props) {      const t = typeof props.t === 'function' ? props.t : translateWith(EN)
      const jumpToSession = props.jumpToSession

      const [documents, setDocuments] = React.useState(() => panelState.documents)
      const [sessionCount, setSessionCount] = React.useState(() => panelState.sessionCount)
      const [loading, setLoading] = React.useState(() => panelState.documents.length === 0)
      const [error, setError] = React.useState(null)
      const [truncated, setTruncated] = React.useState(false)
      const [query, setQuery] = React.useState('')
      const [kind, setKind] = React.useState('all')
      const [sort, setSort] = React.useState('recent')
      const [expanded, setExpanded] = React.useState(() => treeState.expanded)
      const [viewerPath, setViewerPath] = React.useState(null)
      const [listOpen, setListOpen] = React.useState(false)
      const [detailOpen, setDetailOpen] = React.useState(false)
      // Session cards in the details panel start collapsed; opening one shows its events.
      const [openSessions, setOpenSessions] = React.useState(() => new Set())
      const [zoom, setZoom] = React.useState(100)
      const [sourceMode, setSourceMode] = React.useState(false)
      const [preview, setPreview] = React.useState(null)
      const [previewEpoch, setPreviewEpoch] = React.useState(0)
      const [refreshing, setRefreshing] = React.useState(false)
      const [streaming, setStreaming] = React.useState(false)
      const [update, setUpdate] = React.useState(null)
      const [busy, setBusy] = React.useState(false)
      const [toast, setToast] = React.useState(null)
      const [dialog, setDialog] = React.useState(null)
      const [draftName, setDraftName] = React.useState('')

      const alive = React.useRef(true)
      const loadId = React.useRef(0)
      const toastTimer = React.useRef(null)
      const lastLoaded = React.useRef(0)
      const inFlight = React.useRef(false)
      const previewCache = React.useRef(new Map())
      const mainRef = React.useRef(null)
      const reloadTimer = React.useRef(null)
      /** Server revision of the list currently on screen; '' forces a full reload. */
      const revision = React.useRef(panelState.revision)

      React.useEffect(() => {
        alive.current = true
        return () => {
          alive.current = false
          if (toastTimer.current !== null) window.clearTimeout(toastTimer.current)
          if (reloadTimer.current !== null) window.clearTimeout(reloadTimer.current)
        }
      }, [])

      React.useEffect(() => {
        panelState.documents = documents
        panelState.sessionCount = sessionCount
        panelState.revision = revision.current
      }, [documents, sessionCount])

      const showToast = React.useCallback((text, isError) => {
        setToast({ text, isError: isError === true })
        if (toastTimer.current !== null) window.clearTimeout(toastTimer.current)
        toastTimer.current = window.setTimeout(() => {
          if (alive.current) setToast(null)
        }, 4200)
      }, [])

      /**
       * Read the whole library as a stream of NDJSON batches.
       *
       * The host scans session logs in chunks and pushes one `docs` event per
       * chunk, so rows land on screen while the remaining logs are still being
       * read. Returning early (unmount, newer load) cancels the reader.
       */
      const loadStream = React.useCallback(async (ticket) => {
        const response = await fetch(API + '/list?stream=1', {
          cache: 'no-store',
          headers: { 'x-dsh-documents': '1' },
        })
        if (!response.ok || response.body === null) throw new Error(`HTTP ${response.status}`)
        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        const collected = new Map()
        let buffer = ''
        let painted = false
        let final = null
        const paint = () => {
          if (!alive.current || ticket !== loadId.current) return false
          setDocuments([...collected.values()])
          if (!painted) {
            painted = true
            setLoading(false)
          }
          return true
        }
        try {
          for (;;) {
            const step = await reader.read()
            if (step.done) break
            buffer += decoder.decode(step.value, { stream: true })
            let newline = buffer.indexOf('\n')
            while (newline !== -1) {
              const line = buffer.slice(0, newline).trim()
              buffer = buffer.slice(newline + 1)
              newline = buffer.indexOf('\n')
              if (line === '') continue
              let event
              try {
                event = JSON.parse(line)
              } catch {
                continue
              }
              if (event.t === 'docs') {
                if (!Array.isArray(event.documents)) continue
                for (const doc of event.documents) collected.set(doc.path.toLowerCase(), doc)
                // Paint only once there is something to show: an empty first chunk
                // must not flash the "no documents" state.
                if (event.documents.length > 0 && !paint()) return
                if (typeof event.sessionCount === 'number') setSessionCount(event.sessionCount)
              } else if (event.t === 'done') {
                final = event
              } else if (event.t === 'error') {
                throw new Error(String(event.error || 'list failed'))
              } else if (event.ok === true && Array.isArray(event.documents)) {
                // Host without streaming support answered with the plain JSON shape.
                for (const doc of event.documents) collected.set(doc.path.toLowerCase(), doc)
                if (!paint()) return
              }
            }
          }
        } finally {
          reader.cancel().catch(() => {})
        }
        if (!alive.current || ticket !== loadId.current) return
        if (final !== null) {
          revision.current = typeof final.rev === 'string' ? final.rev : ''
          panelState.revision = revision.current
          setSessionCount(typeof final.sessionCount === 'number' ? final.sessionCount : collected.size)
          setTruncated(final.truncated === true)
          const limit = typeof final.limit === 'number' ? final.limit : 0
          if (limit > 0 && collected.size > limit) {
            setDocuments([...collected.values()].slice(0, limit))
          }
        }
        if (!painted) setDocuments([...collected.values()])
        setLoading(false)
      }, [])

      /** Apply an incremental refresh: only rows that appeared, changed, or vanished. */
      const mergeDelta = React.useCallback((data) => {
        const added = Array.isArray(data.added) ? data.added : []
        const updated = Array.isArray(data.updated) ? data.updated : []
        const removed = Array.isArray(data.removed) ? data.removed : []
        if (added.length === 0 && updated.length === 0 && removed.length === 0) return false
        setDocuments((current) => {
          const map = new Map(current.map((doc) => [doc.path.toLowerCase(), doc]))
          for (const doc of added) map.set(doc.path.toLowerCase(), doc)
          for (const doc of updated) map.set(doc.path.toLowerCase(), doc)
          for (const key of removed) map.delete(String(key).toLowerCase())
          return [...map.values()]
        })
        return true
      }, [])

      const load = React.useCallback(async (options) => {
        const force = options === true || (options !== undefined && options.force === true)
        const silent = options !== undefined && options.silent === true
        if (inFlight.current) {
          if (!silent) setRefreshing(false)
          return
        }
        const now = Date.now()
        if (!force && lastLoaded.current !== 0 && now - lastLoaded.current < REFRESH_MS) return
        const ticket = ++loadId.current
        inFlight.current = true
        const full = revision.current === ''
        if (full) setStreaming(true)
        if (!silent) setLoading(true)
        setError(null)
        try {
          if (full) {
            await loadStream(ticket)
          } else {
            const data = await requestJson('/list?since=' + encodeURIComponent(revision.current))
            if (!alive.current || ticket !== loadId.current) return
            if (data.full === true) {
              revision.current = typeof data.rev === 'string' ? data.rev : ''
              panelState.revision = revision.current
              setDocuments(Array.isArray(data.documents) ? data.documents : [])
            } else {
              if (typeof data.rev === 'string' && data.rev !== '') {
                revision.current = data.rev
                panelState.revision = data.rev
              }
              if (data.unchanged !== true) mergeDelta(data)
            }
            if (typeof data.sessionCount === 'number') setSessionCount(data.sessionCount)
            setTruncated(data.truncated === true)
            setLoading(false)
          }
          lastLoaded.current = Date.now()
        } catch (loadError) {
          if (!alive.current || ticket !== loadId.current) return
          setError(String((loadError && loadError.message) || loadError))
          setLoading(false)
          if (full) {
            revision.current = ''
            panelState.revision = ''
          }
        } finally {
          inFlight.current = false
          if (alive.current) {
            setRefreshing(false)
            setStreaming(false)
          }
        }
      }, [loadStream, mergeDelta])

      const refreshNow = React.useCallback(() => {
        previewCache.current.clear()
        setPreviewEpoch((value) => value + 1)
        setRefreshing(true)
        load({ force: true })
      }, [load])

      const scheduleReconcile = React.useCallback(() => {
        if (reloadTimer.current !== null) window.clearTimeout(reloadTimer.current)
        reloadTimer.current = window.setTimeout(() => {
          reloadTimer.current = null
          load({ force: true, silent: true })
        }, 1800)
      }, [load])

      const dismissUpdate = React.useCallback(() => {
        setUpdate((current) => {
          if (current !== null) {
            try {
              window.localStorage.setItem(UPDATE_DISMISS_KEY, current.latest)
            } catch {
              // Private mode or a blocked storage area: the hint simply comes back.
            }
          }
          return null
        })
      }, [])

      const copyUpgradeCommand = React.useCallback(() => {
        const command = 'dsh plugin add dsh-documents@latest'
        try {
          if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
            navigator.clipboard.writeText(command).then(
              () => showToast(t('update.copied')),
              () => showToast(command),
            )
            return
          }
        } catch {
          // Fall through to showing the command instead of copying it.
        }
        showToast(command)
      }, [showToast, t])

      /**
       * DSH never upgrades a third-party plugin by itself, so the panel asks the
       * host whether the registry offers something newer and, if so, how to upgrade.
       */
      React.useEffect(() => {
        let cancelled = false
        requestJson('/version')
          .then((data) => {
            if (cancelled || data.updateAvailable !== true) return
            let dismissed = ''
            try {
              dismissed = window.localStorage.getItem(UPDATE_DISMISS_KEY) || ''
            } catch {
              dismissed = ''
            }
            if (dismissed === data.latest) return
            setUpdate({ current: String(data.current ?? ''), latest: String(data.latest ?? '') })
          })
          .catch(() => {
            // Offline, or the registry is unreachable: no hint, and no error either.
          })
        return () => {
          cancelled = true
        }
      }, [])

      React.useEffect(() => {
        load({ force: true })
      }, [load])

      React.useEffect(() => {
        const onFocus = () => {
          if (dialog === null && Date.now() - lastLoaded.current > REFRESH_MS) load({ silent: true })
        }
        window.addEventListener('focus', onFocus)
        return () => window.removeEventListener('focus', onFocus)
      }, [load, dialog])

      React.useEffect(() => {
        const timer = window.setInterval(() => {
          if (document.visibilityState === 'visible') load({ force: true, silent: true })
        }, REFRESH_MS)
        return () => window.clearInterval(timer)
      }, [load])

      // A delta refresh can drop the document that was open (rename, trash, delete).
      React.useEffect(() => {
        if (loading || streaming) return
        if (viewerPath === null) return
        if (!documents.some((doc) => doc.path === viewerPath)) setViewerPath(null)
      }, [documents, viewerPath, loading, streaming])

      const selected = React.useMemo(
        () => documents.find((doc) => doc.path === viewerPath) || null,
        [documents, viewerPath],
      )

      const selectedPath = selected === null ? '' : selected.path
      const markdownReading = selected !== null
        && selected.kind === 'markdown'
        && preview !== null
        && preview.loading !== true
        && preview.ok !== false
        && preview.supported === true

      // Parsing once per preview keeps outline hover and zoom changes from
      // walking the whole Markdown source again.
      const markdownDoc = React.useMemo(
        () => (markdownReading ? renderMarkdown(String(preview.text || ''), t) : null),
        [selectedPath, markdownReading, preview, t],
      )

      React.useEffect(() => {
        if (selected === null) {
          setPreview(null)
          return undefined
        }
        const cached = previewCache.current.get(selected.path)
        if (cached !== undefined) {
          setPreview(cached)
          return undefined
        }
        let cancelled = false
        setPreview({ loading: true })
        requestJson('/preview?path=' + encodeURIComponent(selected.path))
          .then((data) => {
            if (cancelled) return
            previewCache.current.set(selected.path, data)
            setPreview(data)
          })
          .catch((previewError) => {
            if (!cancelled) setPreview({ ok: false, error: String((previewError && previewError.message) || previewError) })
          })
        return () => {
          cancelled = true
        }
      }, [selected, previewEpoch])

      const counts = React.useMemo(() => {
        const result = { all: documents.length }
        for (const doc of documents) result[doc.kind] = (result[doc.kind] || 0) + 1
        return result
      }, [documents])

      const visible = React.useMemo(() => {
        const needle = query.trim().toLowerCase()
        let list = documents
        if (kind !== 'all') list = list.filter((doc) => doc.kind === kind)
        if (needle !== '') {
          list = list.filter((doc) => {
            const sessions = (doc.sessions || []).map((session) => session.title).join(' ')
            return doc.name.toLowerCase().includes(needle)
              || String(doc.rel || '').toLowerCase().includes(needle)
              || String(doc.rootTitle || '').toLowerCase().includes(needle)
              || sessions.toLowerCase().includes(needle)
          })
        }
        const copy = list.slice()
        if (sort === 'name') copy.sort((a, b) => a.name.localeCompare(b.name))
        else if (sort === 'size') copy.sort((a, b) => b.bytes - a.bytes)
        else copy.sort((a, b) => b.lastTime - a.lastTime)
        return copy
      }, [documents, query, kind, sort])

      /**
       * Workspace → session → document, in the order the (already sorted) list
       * presents them: a workspace folder sits with its most recent session, and
       * a document lives under the session that created it. Documents edited by
       * other sessions stay in one place and carry a "shared" marker instead.
       */
      const groups = React.useMemo(() => {
        const byWorkspace = new Map()
        for (const doc of visible) {
          const workspaceTitle = doc.rootTitle || t('tree.noWorkspace')
          let workspaceEntry = byWorkspace.get(workspaceTitle)
          if (workspaceEntry === undefined) {
            workspaceEntry = { key: `w:${workspaceTitle}`, title: workspaceTitle, total: 0, sessions: new Map(), hue: workspaceHue(workspaceTitle) }
            byWorkspace.set(workspaceTitle, workspaceEntry)
          }
          workspaceEntry.total += 1
          const origin = doc.origin
          const sessionKey = origin && origin.sessionId ? String(origin.sessionId) : ''
          const sessionTitle = origin && origin.title ? origin.title : t('tree.noSession')
          let sessionEntry = workspaceEntry.sessions.get(sessionKey)
          if (sessionEntry === undefined) {
            sessionEntry = { key: `s:${workspaceTitle}\u0000${sessionKey}`, id: sessionKey, title: sessionTitle, docs: [] }
            workspaceEntry.sessions.set(sessionKey, sessionEntry)
          }
          sessionEntry.docs.push(doc)
        }
        return [...byWorkspace.values()].map((entry) => ({ ...entry, sessions: [...entry.sessions.values()] }))
      }, [visible, t])

      const searchActive = query.trim() !== ''

      const toggleGroup = React.useCallback((key) => {
        setExpanded((previous) => {
          const next = new Set(previous)
          if (next.has(key)) next.delete(key)
          else next.add(key)
          writeExpanded(next)
          return next
        })
      }, [])

      const collapseAll = React.useCallback(() => {
        const next = new Set()
        setExpanded(next)
        writeExpanded(next)
      }, [])

      const expandAll = React.useCallback(() => {
        const next = new Set()
        for (const workspaceEntry of groups) {
          next.add(workspaceEntry.key)
          for (const sessionEntry of workspaceEntry.sessions) next.add(sessionEntry.key)
        }
        setExpanded(next)
        writeExpanded(next)
      }, [groups])

      const runAction = React.useCallback(async (action, doc, extra) => {
        setBusy(true)
        try {
          const data = await requestJson('/action', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ action, path: doc.path, ...(extra || {}) }),
          })
          if (action === 'trash') {
            setDocuments((list) => list.filter((entry) => entry.path !== doc.path))
            previewCache.current.delete(doc.path)
            setViewerPath(null)
            showToast(t('toast.trash'))
            scheduleReconcile()
          } else if (action === 'rename') {
            const nextPath = typeof data.path === 'string' ? data.path : doc.path
            previewCache.current.delete(doc.path)
            setDocuments((list) => list.map((entry) => (
              entry.path === doc.path ? { ...entry, path: nextPath, name: data.name || entry.name } : entry
            )))
            setViewerPath(nextPath)
            showToast(t('toast.rename'))
            scheduleReconcile()
          } else {
            showToast(action === 'reveal' ? t('toast.reveal') : t('toast.open'))
          }
          setDialog(null)
        } catch (actionError) {
          showToast(String((actionError && actionError.message) || actionError), true)
        } finally {
          if (alive.current) setBusy(false)
        }
      }, [scheduleReconcile, showToast, t])

      const copyPath = React.useCallback(async (doc) => {
        try {
          await navigator.clipboard.writeText(doc.path)
          showToast(t('toast.copied'))
        } catch {
          showToast(t('toast.copyFailed'), true)
        }
      }, [showToast, t])

      const openViewer = React.useCallback((doc) => {
        setViewerPath(doc.path)
        setZoom(100)
        setSourceMode(false)
        setDetailOpen(false)
        setListOpen(false)
        setOpenSessions(new Set())
      }, [])

      const toggleSession = React.useCallback((sessionId) => {
        setOpenSessions((previous) => {
          const next = new Set(previous)
          if (next.has(sessionId)) next.delete(sessionId)
          else next.add(sessionId)
          return next
        })
      }, [])

      // A different document starts with every session card collapsed again.
      const selectedSessionKey = selected === null ? '' : String(selected.path || '')
      React.useEffect(() => {
        setOpenSessions(new Set())
      }, [selectedSessionKey])

      const jump = React.useCallback((sessionId, event) => {
        if (typeof jumpToSession !== 'function') {
          showToast(t('toast.jumpFailed'), true)
          return
        }
        try {
          jumpToSession(sessionId, event && event.seq)
          showToast(t('toast.jump'))
        } catch {
          showToast(t('toast.jumpFailed'), true)
        }
      }, [jumpToSession, showToast, t])

      const openRename = React.useCallback((doc) => {
        setDraftName(doc.name)
        setDialog({ type: 'rename', doc })
      }, [])

      const openTrash = React.useCallback((doc) => {
        setDialog({ type: 'trash', doc })
      }, [])

      React.useEffect(() => {
        if (dialog === null) return undefined
        const onKey = (event) => {
          if (event.key === 'Escape') setDialog(null)
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
      }, [dialog])

      const kindChips = KIND_ORDER.filter((entry) => (counts[entry] || 0) > 0)

      const toastNode = toast !== null && h('div', {
        className: 'dshdoc-toast',
        'data-error': String(toast.isError),
        role: 'status',
      }, toast.text)

      const dialogNode = dialog !== null && h('div', {
        className: 'dshdoc-overlay',
        onClick: (event) => { if (event.target === event.currentTarget) setDialog(null) },
      },
      h('div', {
        className: 'dshdoc-dialog',
        role: 'dialog',
        'aria-modal': true,
        'aria-label': dialog.type === 'rename' ? t('rename.title') : t('trash.title'),
      },
      h('div', { className: 'dshdoc-dialog-title' }, dialog.type === 'rename' ? t('rename.title') : t('trash.title')),
      dialog.type === 'rename'
        ? h('div', null,
          h('div', { className: 'dshdoc-dialog-body' }, t('rename.label')),
          h('input', {
            className: 'dshdoc-input',
            value: draftName,
            autoFocus: true,
            onChange: (event) => setDraftName(event.target.value),
            onKeyDown: (event) => {
              if (event.key === 'Enter' && draftName.trim() !== '') {
                runAction('rename', dialog.doc, { name: draftName.trim() })
              }
            },
          }),
        )
        : h('div', { className: 'dshdoc-dialog-body' }, t('trash.body')),
      h('div', { className: 'dshdoc-dialog-actions' },
        h('button', {
          type: 'button',
          className: 'dshdoc-btn',
          disabled: busy,
          onClick: () => setDialog(null),
        }, t('action.cancel')),
        h('button', {
          type: 'button',
          className: dialog.type === 'rename' ? 'dshdoc-btn dshdoc-btn-brand' : 'dshdoc-btn dshdoc-btn-danger',
          disabled: busy || (dialog.type === 'rename' && draftName.trim() === ''),
          onClick: () => {
            if (dialog.type === 'rename') runAction('rename', dialog.doc, { name: draftName.trim() })
            else runAction('trash', dialog.doc)
          },
        }, dialog.type === 'rename' ? t('action.save') : t('action.trash')),
      ),
      ),
      )

      let viewer = null
      if (selected !== null) {
        const scale = zoom / 100
        const wsHue = workspaceHue(selected.rootTitle)
        const rawUrl = API + '/raw?path=' + encodeURIComponent(selected.path)
        let content
        if (preview === null || preview.loading === true) {
          content = h('div', { className: 'dshdoc-unsupported' }, t('loading'))
        } else if (preview.ok === false) {
          content = h('div', { className: 'dshdoc-unsupported dshdoc-error' }, preview.error)
        } else if (selected.kind === 'markdown' && preview.supported === true) {
          content = sourceMode
            ? h('pre', { className: 'dshdoc-doc-pre', style: { fontSize: `${13 * scale}px` } }, preview.text || '')
            : h('div', { className: 'dshdoc-md', style: { fontSize: `${15 * scale}px` } },
              markdownDoc === null ? null : markdownDoc.nodes)
        } else if (preview.supported === true) {
          content = h('pre', { className: 'dshdoc-doc-pre', style: { fontSize: `${13 * scale}px` } }, preview.text || '')
        } else if (selected.kind === 'pdf') {
          content = h('iframe', { className: 'dshdoc-pdf', src: rawUrl, title: selected.name })
        } else if (['png', 'jpg', 'jpeg', 'webp', 'gif'].includes(selected.ext)) {
          content = h('img', {
            className: 'dshdoc-media',
            src: rawUrl,
            alt: selected.name,
            style: { width: `${Math.min(200, zoom)}%` },
          })
        } else {
          content = h('div', { className: 'dshdoc-unsupported' },
            h('div', null, t('viewer.unsupported')),
            h('button', {
              type: 'button',
              className: 'dshdoc-btn dshdoc-btn-brand',
              style: { marginTop: '14px' },
              disabled: busy,
              onClick: () => runAction('open', selected),
            }, t('action.openExternal')),
          )
        }

        const outline = markdownDoc !== null && !sourceMode && markdownDoc.headings.length > 1
          ? h(DocOutline, {
            headings: markdownDoc.headings,
            scrollerRef: mainRef,
            docKey: selected.path,
            t,
          })
          : null

        viewer = h('div', { className: 'dshdoc-main' },
          h('header', { className: 'dshdoc-view-head' },
            h('button', {
              type: 'button',
              className: 'dshdoc-iconbtn dshdoc-list-toggle',
              title: t('viewer.list'),
              'aria-label': t('viewer.list'),
              onClick: () => setListOpen((value) => !value),
            }, h(ListGlyph, null)),
            h('span', { className: 'dshdoc-tile', style: tileStyle(selected) }, tileLabel(selected)),
            h('div', { className: 'dshdoc-view-titlebox' },
              h('div', { style: { minWidth: 0 } },
                h('div', { className: 'dshdoc-view-name' }, selected.name),
                h('div', { className: 'dshdoc-view-sub' },
                  selected.rootTitle !== '' && h('span', {
                    className: 'dshdoc-ws-dot',
                    style: { background: `hsl(${wsHue} 62% 48%)` },
                    'aria-hidden': true,
                  }),
                  [
                    selected.rootTitle,
                    t('kind.' + selected.kind),
                    formatBytes(selected.bytes),
                    selected.origin ? selected.origin.title : '',
                  ].filter((part) => part !== '' && part !== undefined).join(' · ')),
              ),
            ),
            h('button', {
              type: 'button',
              className: 'dshdoc-iconbtn',
              title: t('viewer.close'),
              'aria-label': t('viewer.close'),
              onClick: () => setViewerPath(null),
            }, h(CloseGlyph, null)),
          ),
          h('div', { className: 'dshdoc-view-tools' },
            selected.kind === 'markdown' && h('button', {
              type: 'button',
              className: 'dshdoc-btn',
              onClick: () => setSourceMode((value) => !value),
            }, sourceMode ? t('viewer.reading') : t('viewer.source')),
            h('div', { className: 'dshdoc-zoom' },
              h('button', {
                type: 'button',
                className: 'dshdoc-iconbtn',
                title: t('viewer.zoomOut'),
                'aria-label': t('viewer.zoomOut'),
                disabled: zoom <= 60,
                onClick: () => setZoom((value) => Math.max(60, value - 10)),
              }, '−'),
              h('button', {
                type: 'button',
                className: 'dshdoc-zoom-value',
                style: { border: 'none', background: 'transparent', color: 'inherit', font: 'inherit', cursor: 'pointer' },
                title: t('viewer.zoomReset'),
                onClick: () => setZoom(100),
              }, `${zoom}%`),
              h('button', {
                type: 'button',
                className: 'dshdoc-iconbtn',
                title: t('viewer.zoomIn'),
                'aria-label': t('viewer.zoomIn'),
                disabled: zoom >= 200,
                onClick: () => setZoom((value) => Math.min(200, value + 10)),
              }, '+'),
            ),
            h('span', { className: 'dshdoc-view-spacer' }),
            h('button', {
              type: 'button',
              className: 'dshdoc-btn',
              onClick: () => setDetailOpen((value) => !value),
            }, t('viewer.detail')),
            h('button', {
              type: 'button',
              className: 'dshdoc-btn dshdoc-btn-brand',
              disabled: busy,
              onClick: () => runAction('open', selected),
            }, t('action.open')),
          ),
          h('div', { className: 'dshdoc-view-body' },
            h('div', { className: 'dshdoc-view-main', ref: mainRef },
              h('div', { className: 'dshdoc-doc' }, content)),
            outline,
            detailOpen && h('aside', { className: 'dshdoc-detail' },
              h('div', { className: 'dshdoc-detail-head' },
                h('div', { className: 'dshdoc-section-title' }, t('detail.title')),
                h('button', {
                  type: 'button',
                  className: 'dshdoc-iconbtn',
                  title: t('viewer.close'),
                  onClick: () => setDetailOpen(false),
                }, h(CloseGlyph, null)),
              ),
              h('div', { className: 'dshdoc-card' },
                h('div', { className: 'dshdoc-fields' },
                  h('span', { className: 'dshdoc-field-label' }, t('detail.workspace')),
                  h('span', { className: 'dshdoc-field-value' }, selected.rootTitle || '—'),
                  h('span', { className: 'dshdoc-field-label' }, t('detail.size')),
                  h('span', { className: 'dshdoc-field-value' }, formatBytes(selected.bytes)),
                  h('span', { className: 'dshdoc-field-label' }, t('detail.modified')),
                  h('span', { className: 'dshdoc-field-value' }, formatTime(selected.mtime)),
                ),
                h('div', { className: 'dshdoc-pathbox' }, selected.path),
              ),
              h('div', { className: 'dshdoc-card' },
                h('div', { className: 'dshdoc-card-title' },
                  h('span', null, t('detail.sessions')),
                  h('span', { className: 'dshdoc-card-count' }, String((selected.sessions || []).length)),
                ),
                (selected.sessions || []).map((session) => {
                  const sessionOpen = openSessions.has(session.id)
                  const lastEvent = session.events.length > 0 ? session.events[session.events.length - 1] : null
                  return h('div', {
                    key: session.id,
                    className: 'dshdoc-session',
                    'data-role': session.role,
                    'data-open': String(sessionOpen),
                  },
                  h('div', {
                    className: 'dshdoc-session-head',
                    role: 'button',
                    tabIndex: 0,
                    'aria-expanded': String(sessionOpen),
                    title: session.title,
                    onClick: () => toggleSession(session.id),
                    onKeyDown: (event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        toggleSession(session.id)
                      }
                    },
                  },
                  h('span', { className: 'dshdoc-caret', 'data-open': String(sessionOpen) }, h(CaretGlyph, null)),
                  h('span', { className: 'dshdoc-role', 'data-role': session.role }, session.role === 'origin' ? t('detail.created') : t('detail.edited')),
                  h('span', { className: 'dshdoc-session-title' }, session.title),
                  session.events.length > 0 && h('button', {
                    type: 'button',
                    className: 'dshdoc-jump',
                    onClick: (event) => {
                      event.stopPropagation()
                      jump(session.id, session.events[0])
                    },
                  }, t('detail.jump')),
                  ),
                  h('div', { className: 'dshdoc-session-sub' },
                    `${session.workspace || ''}${session.workspace ? ' · ' : ''}${session.events.length} ${t('detail.events')}${lastEvent ? ` · ${formatTime(lastEvent.time)}` : ''}`),
                  sessionOpen && session.events.map((event, eventIndex) => h('div', {
                    key: `${session.id}-${event.seq}-${eventIndex}`,
                    className: 'dshdoc-event',
                    'data-kind': event.kind,
                  },
                  h('div', { className: 'dshdoc-event-head' },
                    h('span', { className: 'dshdoc-kind-chip', 'data-kind': event.kind }, t('event.' + event.kind)),
                    h('span', { className: 'dshdoc-event-summary' }, event.summary),
                  ),
                  h('div', { className: 'dshdoc-event-meta' },
                    h('span', { className: 'dshdoc-pill' }, `${t('detail.turn')} ${event.turn}`),
                    h('span', { className: 'dshdoc-pill' }, `#${event.seq}`),
                    h('span', { className: 'dshdoc-pill' }, formatTime(event.time)),
                    h('button', {
                      type: 'button',
                      onClick: () => jump(session.id, event),
                    }, t('detail.jump')),
                  ),
                  event.preview !== '' && h('pre', { className: 'dshdoc-event-preview' }, event.preview),
                  )))
                }),
                (selected.sessions || []).length === 0 && h('div', { className: 'dshdoc-empty-body' }, t('detail.noSessions')),
              ),
              h('div', { className: 'dshdoc-card dshdoc-actions' },
                h('button', {
                  type: 'button',
                  className: 'dshdoc-btn dshdoc-btn-brand',
                  disabled: busy,
                  onClick: () => runAction('open', selected),
                }, t('action.openExternal')),
                h('button', {
                  type: 'button',
                  className: 'dshdoc-btn',
                  disabled: busy,
                  onClick: () => runAction('reveal', selected),
                }, t('action.reveal')),
                h('button', {
                  type: 'button',
                  className: 'dshdoc-btn',
                  disabled: busy,
                  onClick: () => copyPath(selected),
                }, t('action.copy')),
                h('button', {
                  type: 'button',
                  className: 'dshdoc-btn',
                  disabled: busy,
                  onClick: () => openRename(selected),
                }, t('action.rename')),
                h('div', { className: 'dshdoc-divider' }),
                h('button', {
                  type: 'button',
                  className: 'dshdoc-btn dshdoc-btn-danger',
                  disabled: busy,
                  onClick: () => openTrash(selected),
                }, t('action.trash')),
              ),
            ),
          ),
        )
      }

      const renderDocRow = (doc) => h('div', {
        key: doc.path,
        className: 'dshdoc-row',
        role: 'button',
        tabIndex: 0,
        'data-grouped': 'true',
        'aria-label': doc.name,
        'data-selected': String(doc.path === viewerPath),
        onClick: () => openViewer(doc),
        onKeyDown: (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            openViewer(doc)
          }
        },
      },
      h('span', { className: 'dshdoc-tile', style: tileStyle(doc) }, tileLabel(doc)),
      h('span', { className: 'dshdoc-row-main' },
        h('span', { className: 'dshdoc-name' }, doc.name),
        h('span', { className: 'dshdoc-meta' },
          h('span', null, formatTime(doc.lastTime)),
          (doc.sessionCount || 0) > 1 && h('span', null, `${doc.sessionCount} ${t('sessionCount')}`),
        ),
      ),
      h('span', { className: 'dshdoc-row-side' },
        doc.editedByOthers && (() => {
          const editors = (doc.sessions || []).filter((session) => session.role !== 'origin').map((session) => session.title)
          return h('span', {
            className: 'dshdoc-edited-flag',
            title: editors.length > 0 ? `${t('detail.edited')}: ${editors.join('、')}` : undefined,
          }, t('row.editedElsewhere'))
        })(),
        h('span', { style: { color: `color-mix(in oklab, ${KIND_DOT[doc.kind] || '#5b6472'} 66%, var(--dsw-alias-label-tertiary))` } }, t('kind.' + doc.kind)),
      ),
      )

      const renderFolder = (entry, level, isOpen, children) => h('div', {
        key: entry.key,
        className: 'dshdoc-group',
        'data-level': level,
        style: level === 'workspace' ? { '--ws-h': String(entry.hue ?? 248) } : undefined,
      },
      h('button', {
        type: 'button',
        className: 'dshdoc-group-head',
        'data-open': String(isOpen),
        'aria-expanded': String(isOpen),
        title: entry.title,
        onClick: () => toggleGroup(entry.key),
      },
      h('span', { className: 'dshdoc-caret', 'data-open': String(isOpen) }, h(CaretGlyph, null)),
      h('span', { className: 'dshdoc-folder' }, level === 'workspace' ? h(FolderGlyph, null) : h(SessionGlyph, null)),
      h('span', { className: 'dshdoc-group-title' }, entry.title),
      h('span', { className: 'dshdoc-group-count' }, String(level === 'workspace' ? entry.total : entry.docs.length)),
      ),
      isOpen && h('div', { className: 'dshdoc-group-body' }, children),
      )

      let listContent
      if (loading && documents.length === 0) {
        listContent = h('div', { className: 'dshdoc-skeleton' },
          [0, 1, 2, 3, 4].map((index) => h('div', { key: index, className: 'dshdoc-skeleton-row' },
            h('div', { className: 'dshdoc-skeleton-tile' }),
            h('div', { className: 'dshdoc-skeleton-lines' },
              h('div', { className: 'dshdoc-skeleton-line', style: { width: `${52 + (index * 9) % 34}%` } }),
              h('div', { className: 'dshdoc-skeleton-line', style: { width: `${28 + (index * 7) % 22}%`, opacity: 0.7 } }),
            ),
          )),
        )
      } else if (error !== null) {
        listContent = h('div', { className: 'dshdoc-empty' },
          h('div', { className: 'dshdoc-empty-art' }, h(DocGlyph, { size: 40 })),
          h('div', { className: 'dshdoc-empty-title dshdoc-error' }, t('error.title')),
          h('div', { className: 'dshdoc-empty-body' }, error),
          h('button', { type: 'button', className: 'dshdoc-btn', onClick: refreshNow }, t('retry')),
        )
      } else if (visible.length === 0) {
        listContent = h('div', { className: 'dshdoc-empty' },
          h('div', { className: 'dshdoc-empty-art' }, h(DocGlyph, { size: 40 })),
          h('div', { className: 'dshdoc-empty-title' }, documents.length === 0 ? t('empty.title') : t('empty.filtered')),
          documents.length === 0 && h('div', { className: 'dshdoc-empty-body' }, t('empty.body')),
        )
      } else {
        listContent = h('div', { className: 'dshdoc-tree' }, groups.map((workspaceEntry) => {
          const workspaceOpen = searchActive || expanded.has(workspaceEntry.key)
          return renderFolder(workspaceEntry, 'workspace', workspaceOpen,
            workspaceEntry.sessions.map((sessionEntry) => {
              const sessionOpen = searchActive || expanded.has(sessionEntry.key)
              return renderFolder(sessionEntry, 'session', sessionOpen, sessionEntry.docs.map(renderDocRow))
            }))
        }))
        if (truncated) {
          listContent = h(React.Fragment, null, listContent,
            h('div', { className: 'dshdoc-empty-body', style: { padding: '14px 12px 0' } }, t('empty.filtered')),
          )
        }
      }

      if (streaming && documents.length > 0) {
        listContent = h(React.Fragment, null, listContent,
          h('div', { className: 'dshdoc-empty-body', style: { padding: '12px 12px 0' } },
            String(t('loading.partial') || '').replace('{count}', String(documents.length))),
        )
      }

      const sidePanel = h('div', { className: 'dshdoc-side', 'data-open': String(listOpen) },
        h('div', { className: 'dshdoc-side-head' },
          h('label', { className: 'dshdoc-search' },
            h(SearchGlyph, null),
            h('input', {
              type: 'search',
              value: query,
              placeholder: t('search'),
              'aria-label': t('search'),
              onChange: (event) => setQuery(event.target.value),
            }),
          ),
          h('div', { className: 'dshdoc-chips' },
            h('button', {
              type: 'button',
              className: 'dshdoc-chip',
              'data-active': String(kind === 'all'),
              onClick: () => setKind('all'),
            }, `${t('filter.all')} ${counts.all}`),
            kindChips.map((entry) => h('button', {
              key: entry,
              type: 'button',
              className: 'dshdoc-chip',
              'data-active': String(kind === entry),
              onClick: () => setKind(entry),
            },
            h('span', { className: 'dshdoc-chip-dot', style: { background: KIND_DOT[entry] || '#5b6472' } }),
            `${t('kind.' + entry)} ${counts[entry]}`)),
          ),
          h('div', { className: 'dshdoc-side-filters' },
            h('div', { className: 'dshdoc-tree-tools' },
              h('button', {
                type: 'button',
                className: 'dshdoc-mini',
                onClick: expandAll,
                title: t('tree.expandAll'),
              }, t('tree.expandAll')),
              h('button', {
                type: 'button',
                className: 'dshdoc-mini',
                onClick: collapseAll,
                title: t('tree.collapseAll'),
              }, t('tree.collapseAll')),
            ),
            h('select', {
              className: 'dshdoc-select',
              value: sort,
              'aria-label': t('sort.recent'),
              onChange: (event) => setSort(event.target.value),
            },
            h('option', { value: 'recent' }, t('sort.recent')),
            h('option', { value: 'name' }, t('sort.name')),
            h('option', { value: 'size' }, t('sort.size')),
            ),
          ),
        ),
        h('div', { className: 'dshdoc-side-list' }, listContent),
      )

      const emptyMain = h('div', { className: 'dshdoc-main' },
        h('div', { className: 'dshdoc-main-empty' },
          h('div', { className: 'dshdoc-empty-art' }, h(DocGlyph, { size: 44 })),
          h('div', null, t('viewer.pick')),
        ),
      )

      const updateBanner = update === null ? null : h('div', { className: 'dshdoc-update', role: 'status' },
        h('span', { className: 'dshdoc-update-text' },
          h('strong', null, String(t('update.title') || '').replace('{version}', update.latest)),
          h('span', null, t('update.body')),
          h('code', null, 'dsh plugin add dsh-documents@latest'),
        ),
        h('button', {
          type: 'button',
          className: 'dshdoc-btn dshdoc-btn-brand',
          onClick: copyUpgradeCommand,
        }, t('update.copy')),
        h('button', {
          type: 'button',
          className: 'dshdoc-btn',
          onClick: dismissUpdate,
        }, t('update.dismiss')),
      )

      return h('div', { className: 'dshdoc-page' },
        h('style', null, CSS),
        h('header', { className: 'dshdoc-head' },
          h('div', { className: 'dshdoc-head-main' },
            h('div', { className: 'dshdoc-title' },
              h('span', { className: 'dshdoc-brandmark' }, h(DocGlyph, { size: 18 })),
              h('span', null, t('title')),
              h('span', { className: 'dshdoc-badge' }, `${documents.length} ${t('count')}`),
              h('span', { className: 'dshdoc-badge' }, `${sessionCount} ${t('sessionCount')}`),
            ),
            h('div', { className: 'dshdoc-sub' }, t('subtitle')),
          ),
          h('div', { className: 'dshdoc-head-actions' },
            h('button', {
              type: 'button',
              className: 'dshdoc-btn dshdoc-list-toggle',
              onClick: () => setListOpen((value) => !value),
            }, t('viewer.list')),
            h('span', { className: 'dshdoc-refresh-hint' }, t('refresh.auto')),
            h('button', {
              type: 'button',
              className: 'dshdoc-btn',
              onClick: refreshNow,
              disabled: loading || refreshing,
              title: t('refresh'),
            }, t('refresh')),
          ),
        ),
        updateBanner,
        h('div', { className: 'dshdoc-body' },
          listOpen && h('div', { className: 'dshdoc-scrim', onClick: () => setListOpen(false) }),
          sidePanel,
          viewer !== null ? viewer : emptyMain,
        ),
        toastNode,
        dialogNode,
      )
    }

    function apply(ctx) {
      let t = (key) => key
      try {
        t = ctx.locale.bind(NS)
      } catch {
        t = translateWith(EN)
      }
      const labelOf = (key) => {
        try {
          const value = t(key)
          if (typeof value === 'string' && value !== key && value !== '') return value
        } catch {
          // Fall through to English.
        }
        return EN[key] ?? key
      }

      const jumpToSession = (sessionId, seq) => {
        const uiWorkspace = ctx.get('uiWorkspace')
        const sessions = ctx.get('sessions')
        let opened = false
        if (uiWorkspace && typeof uiWorkspace.openSession === 'function') {
          uiWorkspace.openSession(sessionId)
          opened = true
        }
        const focus = () => {
          try {
            const binding = sessions && typeof sessions.binding === 'function' ? sessions.binding(sessionId) : undefined
            if (binding && binding.session && typeof binding.session.loadThrough === 'function') {
              binding.session.loadThrough(seq).catch(() => {})
            }
          } catch {
            // Position focus is best-effort.
          }
        }
        focus()
        window.setTimeout(focus, 700)
        if (!opened) throw new Error('会话导航不可用')
      }

      ctx.slots.inject('sidebar.panellist', () => {
        const disposeEntry = ctx.slots.register({
          name: 'sidebar.panellist',
          id: 'documents',
          order: 20,
          label: () => labelOf('panel.label'),
        }, PanelIcon)
        let disposeLocale = () => {}
        try {
          disposeLocale = ctx.locale.register(NS, { en: EN, zh: ZH })
        } catch {
          disposeLocale = () => {}
        }
        return () => {
          try {
            disposeLocale()
          } catch {
            // Already released.
          }
          disposeEntry()
        }
      })

      ctx.slots.inject('main', () => ctx.slots.register({
        name: 'main',
        key: 'documents',
        locale: NS,
        label: labelOf('title'),
        inject: () => ({ jumpToSession }),
      }, DocumentsPage))
    }

    return { inject: ['slots', 'locale'], apply }
  },
})
