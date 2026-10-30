# 文档库（Document Library）

DSH Desktop 插件：把**会话生成、编辑或交付过的文档**集中成一个列表，每个文档都能追溯到具体会话和事件位置。

你不再需要回忆「刚才那个报告是哪个会话写的、写到哪一步了」——打开侧边栏的「文档」，路径、来源会话、每次修改的事件坐标都在里面。

- 包名：`dsh-documents`（[npm](https://www.npmjs.com/package/dsh-documents)）· 版本 1.1.0 · MIT
- 要求：DSH Desktop `>= 0.2.1-rc.3`，Node.js `>= 22.19.0`

---

## 功能

- **目录树浏览**：左侧按 **工作区 → 会话 → 文档** 三级展开，一个工作区一个目录、一个会话一个目录，文件夹显示文档数。默认全部收起，展开状态会记住（刷新窗口也不变）。
- **自动收录，不用手动添加**：只读 DSH 会话日志，凡是会话里 `write` / `edit` 过的文件、或被 `present` 标记为交付物的文件，自动进入文档库。不扫描目录、不索引全盘。
- **来源可追溯**：每个文档带创建它的会话、编辑过它的其他会话，以及每次变动的事件坐标（轮次 / `#seq` / 时间）和内容片段。
- **一键回到现场**：点「打开会话」跳到对应会话，并把历史加载到那条事件。
- **内置查看器**：Markdown 阅读模式（标题、列表、表格、代码块、链接）与源码切换、纯文本等宽预览、图片与 PDF 内嵌显示、60%–200% 缩放。
- **筛选与搜索**：按类型筛选，按文件名 / 文件夹 / 工作区 / 会话标题搜索（有搜索词时自动展开命中目录），按最近活动、名称、大小排序。
- **文件操作**：用桌面应用打开、在文件夹中显示、复制路径、重命名、移入回收站。
- **快**：分块流式加载，先扫完的先显示；每 60 秒增量刷新，没有变化时完全不重绘。
- **版本自检**：npm 上有新版本时，面板顶部给出一条升级提示和可复制的升级命令（只提示，不自动安装）。

---

## 安装

### 方式一：界面安装（推荐）

DSH Desktop → **设置 → 插件 → 安装**，输入：

```
dsh-documents
```

需要固定版本时写 `dsh-documents@1.0.2`。

> 「插件」页有两个容易混淆的入口：**安装**是输入包名安装；**发现**是搜索第三方插件市场索引，不会列出 npm 上的包。

### 方式二：命令行安装（`desktop` 以外的 profile）

```bash
dsh plugin add dsh-documents --profile web
```

`dsh plugin` 只是把参数转发给 profile 目录里的 pnpm。**`desktop` 这个 profile 由桌面应用独占**，CLI 会直接拒绝：

```
error: profile "desktop" is managed exclusively by the Electron application
```

所以桌面版的安装和升级走方式一（界面）或方式三（本地构建）。

### 方式三：本地构建（自测刚发布、甚至还没发布的版本）

```powershell
npm run install:local                            # 校验 → 打包到 dist/ → 装进 desktop profile
npm run install:local -- -Version 1.0.4-local.1  # 顺便换成独立的本地版本号
npm run install:local -- -Restore                # 切回 npm 上的版本
```

脚本在 profile 目录里直接 `pnpm add <tarball>`。tarball 是 pnpm 的 `file:` 依赖，**不查 registry、不查发布时间**，正好绕过 `minimumReleaseAge`。装到别的 profile 加 `-Profile web`。

装完按 **Ctrl+R**；`index.js`（宿主侧）的改动要完全退出 DSH 再启动才生效。

> `dist/` 里的 tarball 是 profile 依赖的来源，不要手动删。`git clean -xdf` 清掉之后重跑一次脚本即可。

### 方式四：直接从 GitHub 安装（`desktop` 以外的 profile）

仓库没有构建步骤，源码即产物：

```bash
dsh plugin add github:aerfaman/dsh-documents --profile web
```

### 安装之后

按 **Ctrl+R** 刷新窗口，侧边栏出现「文档」图标。

### 升级

桌面版**不会自动更新第三方插件**：插件页那个「可更新 / 更新」按钮只对官方按需目录里的包生效，普通 npm 包不会出现。升级要手动触发：

- **桌面版**：**设置 → 插件 → 安装**里再输入一次 `dsh-documents`；自己改过源码就用 `npm run install:local`。
- **其他 profile**：`dsh plugin add dsh-documents@latest --profile <name>`。
- **刚发布就装、结果还是旧版本**：这是 pnpm 的发布时间策略，见 FAQ「发布后立刻升级，装上的还是旧版本」。

**半自动提示**：打开文档库时，插件会向 npm registry 查一次当前版本（最多 6 小时一次，只取版本号、不上传任何内容）。有新版本就在顶部显示：

> 有新版本 1.0.3 · 升级后按 Ctrl+R 生效 `dsh plugin add dsh-documents@latest` [复制命令] [跳过此版本]

桌面版这条命令会被 CLI 拒绝，按上面「设置 → 插件 → 安装」那条走即可。点「跳过此版本」后，同一个版本不再提示；出现更新的版本会重新提示。离线或 registry 不可达时静默跳过，不影响使用。

### 卸载

```bash
dsh plugin remove dsh-documents --profile <name>   # desktop profile 在插件页里卸载
```

---

## 快速上手

1. 在任意会话里让 Agent 写一份文件（例如让它在工作区里生成 `report.md`）。
2. 打开侧边栏的「文档」——这份文件会出现在所属工作区 → 该会话的目录下。
3. 点开它看内容；点工具条上的「详情」可以看到它是哪个会话、在哪条事件写下的。
4. 需要回到当时那一刻，点「打开会话」。

---

## 界面说明

### 左侧：目录树

左侧始终保留目录树，右侧是查看器；点树里的另一份文档即可直接切换，不会丢失位置。

```
▾ dsh-documents            12        ← 工作区
  ▾ 文档库重构 · 3                      ← 会话
      report.md
      spec.docx
  ▸ 发布收尾 · 2
▸ 另一个工作区              4
```

- **三级结构**：工作区（目录）→ 会话（目录）→ 文档。层级由会话日志推导：文档归到**创建它的会话**下；被别的会话编辑过的，文档行右侧标「其他会话改过」，鼠标悬停显示是哪些会话。
- **默认全部收起**：第一次打开只列出工作区，点文件夹逐级展开到会话、文档。
- 展开状态按目录记在本地（`localStorage`），**刷新窗口、切走再切回来都保持原样**，不会被重新展开或收起；顶部有「全部展开 / 全部收起」。
- 文件夹右侧数字是该目录下的文档数。
- 默认按**最近活动**排序：工作区、会话都按各自最新文档排序，同层的文档按所选排序方式。
- 顶部搜索框匹配文件名、文件夹路径、工作区名和会话标题；输入搜索词时自动展开命中的目录。
- 类型 chips 按 Word / Excel / 幻灯片 / PDF / Markdown / 文本 过滤，并显示各类型数量。
- 标题右侧的徽章显示当前文档数与会话数。
- 首次打开时列表**边扫边显示**，底部提示「正在继续扫描会话…已显示 N 个」；扫描结束提示消失。

### 右侧：查看器

| 类型 | 显示方式 |
| --- | --- |
| Markdown（`.md` `.markdown` `.mdx`） | 阅读模式渲染，可切「源码」 |
| 纯文本（`.txt` `.log` `.tex` `.json` `.yml` `.csv` 等） | 等宽源码预览 |
| 图片（`.png` `.jpg` `.jpeg` `.webp` `.gif`） | 内嵌显示，支持大图 |
| PDF | 内嵌显示（支持 Range 分段读取） |
| Office 文档（`.docx` `.xlsx` `.pptx` 等） | 不做内嵌渲染，用「打开」交给桌面应用 |

- 缩放按钮 60% → 200%，每次 10%；点中间百分比回到 100%。
- 大文件预览会截断并提示。
- 文件已被删除时显示「文件已不存在」。

### 详情面板

「详情」默认收起，展开后：

- **元信息卡**：完整路径、所在工作区、类型、大小、修改时间。
- **会话卡**：创建它的会话，以及编辑过它的其他会话（色条和徽章区分「创建 / 编辑」）。**每张卡默认收起**，点卡片标题展开该会话的变动列表；收起时卡片副标题仍显示工作区、变动次数和最近一次时间，头部也保留「打开会话」。
- **变动列表**：每次写入 / 修改 / 交付一行，带事件坐标、行数变化和内容片段；每条都有「打开会话」。

窄屏时列表和详情变成可切换的抽屉。

### 操作

| 操作 | 说明 |
| --- | --- |
| 打开 | 用系统默认应用打开，走 DSH 的桌面打开接口 |
| 在文件夹中显示 | 在资源管理器 / Finder 中定位 |
| 复制路径 | 复制绝对路径 |
| 重命名 | 改名后即使会话日志里还是旧路径，文档也不会从列表消失 |
| 移入回收站 | 移到 `%USERPROFILE%\.dsh\documents-trash\`，不直接删除 |

---

## 支持的文件类型

| 类型 | 扩展名 |
| --- | --- |
| Word | `doc` `docx` `docm` `rtf` `odt` `pages` |
| Excel | `xls` `xlsx` `xlsm` `csv` `ods` |
| 幻灯片 | `ppt` `pptx` `pptm` `odp` `key` |
| PDF | `pdf` |
| Markdown | `md` `markdown` `mdx` |
| 文本 | `txt` `log` `tex` |

---

## 数据来源与收录规则

文档库**不扫描目录**，内容全部来自 DSH 会话日志：

- `write` / `edit` / `apply_patch` 等写文件工具调用 → 记为一次「写入」或「修改」，记录行数变化与内容片段。
- `deliverables/presented`（`present` 工具）→ 记为一次「交付」。
- 只有能映射到上述事件、**且当前仍存在于工作区内**的文件才会出现在列表里。

同一个文件被多个会话碰过时，会合并成一份文档，下面挂多条会话记录。

---

## 性能

- **渐进加载**：列表接口按会话日志分块返回（NDJSON 流），先扫完的先上屏，其余在后台继续扫描。会话日志多的机器（几十个会话、几十 MB）不必等整体扫完。
- **增量刷新**：每 60 秒后台刷新一次（仅页面可见时），只回传新增 / 变化 / 删除的文档；没有变化时服务端只回一个「无变化」，界面不重绘、不闪、不跳滚动位置。
- **面板复用**：切走再切回文档页，直接用上次的列表做增量校验，不重新拉全表。
- **预览缓存**：切换文档不重复请求，点右上角「刷新」才清空。
- **目录树在客户端拼装**：层级直接用已拿到的文档数据分组，不额外请求接口；几百份文档的分组开销可以忽略。

---

## 配置（可选）

在 profile 的插件行里配置，例如 `~/.dsh/profiles/<profile>/cordis.patch.yml`：

```yaml
- id: dsh-documents
  config:
    extraRoots:
      - "D:/Documents/Reports"
    # 可选：自定义版本自检使用的 registry（默认同时问 npmjs 与 npmmirror）
    registry: "https://registry.npmjs.org"
    # 可选：关掉版本自检，完全不联网
    updateCheck: false
```

- `extraRoots`：在工作区之外额外纳入的目录。文件操作仍限制在这些根目录内（realpath 校验，不允许越界）。
- `registry`：版本自检查询的 registry。不填时同时请求 `registry.npmjs.org` 与 `registry.npmmirror.com`，取先返回的可用结果（优先官方源）。
- `updateCheck`：设为 `false` 时完全不查 npm，面板不显示新版本提示。

---

## 常见问题

**装好了但侧边栏没有「文档」图标**
按 Ctrl+R 刷新窗口；仍没有就去「设置 → 插件」确认 `dsh-documents` 已启用、没有加载失败。

**打开面板只看到几个工作区，文档去哪了**
目录树默认全部收起：点工作区展开到会话，再点会话才看到文档；也可以点顶部「全部展开」。展开状态会记住，刷新窗口不会重置。

**列表是空的 / 少了很多文件**
文档只从会话事件推导，下面这些情况不会出现：用 `bash` / `pwsh` 跑脚本生成、没经过 `write` / `edit` / `present` 的文件；扩展名不在支持列表里的文件；已被移动或删除出工作区的文件。

**文档行右侧的「其他会话改过」是什么**
表示这份文档除了创建它的会话，还被**另一个会话**写过/改过——徽章是提示，不是错误。判断依据是会话日志里同一路径的写事件来自多个会话；只有一个会话碰过的文档就不会有这条标记。鼠标悬停能看到具体是哪些会话，点「详情」能看到每次变动的事件坐标。文档本身只挂在创建会话的目录下，不会重复出现。

**安装时报 `ERR_PNPM_EPERM ... importPackage`**
通常是 `node_modules` 里留了旧的同名目录（例如早期用本地目录安装留下的链接），pnpm 无法覆盖。删掉再装：

```powershell
$nm = "$env:USERPROFILE\.dsh\profiles\desktop\node_modules"
Remove-Item "$nm\dsh-documents" -Recurse -Force -ErrorAction SilentlyContinue
Get-ChildItem $nm -Filter 'dsh-documents_tmp_*' | Remove-Item -Recurse -Force
```

**发布后立刻升级，装上的还是旧版本（pnpm 的 `minimumReleaseAge`）**
pnpm 11 默认带供应链策略：发布不足 24 小时的版本不参与解析。于是 `dsh plugin add dsh-documents@latest` 会解析回 lockfile 里的旧版本，看起来像「有新版本但升级无效」。三种绕法：

1. **本地 tarball**（推荐自测）：`npm run install:local`，走 `file:` 依赖，不查发布时间。
2. **把该版本加进豁免**：在 `~/.dsh/profiles/<profile>/pnpm-workspace.yaml` 的 `minimumReleaseAgeExclude` 列表里加一行 `dsh-documents@1.0.3`，再装一次。
3. **等冷却期**：发布满 24 小时后 `dsh plugin add dsh-documents@latest` 自然可装。

**点「打开」没反应 / 提示无法打开**
打开动作交给 DSH 的桌面接口执行。插件进程本身不直接启动 GUI 程序（会被沙箱拦截），失败时界面会给出原因。

**「打开会话」跳过去了，但没有高亮到具体那一行**
Harness 目前没有公开「滚动并高亮某条事件」的客户端 API，所以只做到打开会话并加载到该事件；事件坐标（轮次 / `#seq` / 时间）显示在按钮旁，方便手动定位。

---

## 已知限制

- 列表中最多显示 800 个文档，超出会提示截断。
- 列表和预览按文件内容读取，超大文件的预览会被截断（默认 400 KB）。
- 文档的「创建会话」由会话事件时间推断：如果一个文件在多个会话里都被首次写入，取最早的那次。
- 目录树里每份文档只出现一次，挂在创建它的会话下；被其他会话编辑过的不会重复挂载，「详情」里能看到全部会话。

---

## 开发

```bash
npm run check       # node --check + 包结构校验
npm run pack:dry    # 查看 npm 包内容
```

### 本地自测（不经过 npm）

改完代码要在 DSH 里看效果，打成本地 tarball 装回去就行，不需要发布、也不会被 `minimumReleaseAge` 挡住：

```bash
npm run install:local                    # 校验 + 打包到 dist/ + 装进 desktop profile
npm run install:local -- -Version 1.0.4-local.1   # 顺便换一个本地版本号
npm run install:local -- -Profile web    # 装到别的 profile
```

脚本做这些事：校验包结构 → `npm pack` 到 `dist/` → 清掉上次中断留下的 `dsh-documents_tmp_*` 目录（避免 `ERR_PNPM_EPERM`）→ 在 profile 目录里 `pnpm remove` + `pnpm add <tarball>`（同版本号重装时 pnpm 只会报 `Already up to date`，必须先 remove）→ 用 SHA256 比对装进去的文件和本地构建是否一致。

装完按 **Ctrl+R** 刷新窗口；`index.js`（宿主侧）改动要完全退出 DSH 再启动才生效。想回到 npm 正式版：`npm run install:local -- -Restore`。

包内容固定为：`index.js`、`client.js`、`cordis.patch.yml`、`locale/*.json`、`icon.svg`、`README.md`、`LICENSE`。

| 文件 | 作用 |
| --- | --- |
| `index.js` | Host 半：读会话日志、聚合文档、流式/增量列表、预览、raw 文件流、文件操作、`documents` 工具、本地 API |
| `client.js` | Client 半：侧边栏入口、文档库、查看器、Markdown 渲染、会话溯源与跳转 |
| `cordis.patch.yml` | 插入 `dsh-documents` 行 |
| `locale/*.json` | 插件管理器显示用的标题与描述 |
| `icon.svg` | 插件图标 |
| `scripts/verify.mjs` | 校验包名 / 客户端模块 id / patch 行名一致 |
| `scripts/local-install.ps1` | 本地打包 + 装进 profile，用于自测未发布版本 |
| `.github/workflows/ci.yml` | 推送与 PR 时校验包结构 |
| `.github/workflows/release.yml` | 推 main / `v*` tag 时发布到 npm 并创建 GitHub Release |

---

## 发布（维护者）

推 main 即自动发布，前提是版本号变了：

```bash
npm version patch     # 或 minor / major
git push origin main
```

`.github/workflows/release.yml` 做这些事：校验包结构 → 查 npm 上是否已有该版本（已有就跳过，所以只推代码不会失败）→ 用 **npm trusted publishing（OIDC）** 发布并生成 provenance → 创建 `v<version>` tag 与 GitHub Release（附 `.tgz`）。

配置要点（一次性）：

- npmjs 包设置 → **Trusted publishing** → GitHub Actions：`aerfaman` / `dsh-documents` / `release.yml` / Environment **`release`**（必须与 workflow 的 `environment: release` 一致，否则 OIDC 交换返回 404、npm 报含糊的 `ENEEDAUTH`）。
- 不要在仓库里配 `NPM_TOKEN`，workflow 里也不要用 `registry-url`——两者都会让 npm 退回 token 认证而放弃 OIDC。

---

## 本地接口（开发用）

- `GET /dsh-documents/api/list` — `{ documents, sessionCount, truncated, rev }`
- `GET /dsh-documents/api/list?stream=1` — NDJSON：每扫完一块会话输出一行 `{ t: "docs", documents, scanned, sessions, sessionCount }`，结束为 `{ t: "done", rev, total, limit, truncated }`
- `GET /dsh-documents/api/list?since=<rev>` — 增量：`{ rev, added, updated, removed }`；无变化 `{ unchanged: true }`；`rev` 已过期（宿主重启或落后太多）`{ full: true, documents }`
- `GET /dsh-documents/api/version` — `{ current, latest, source, updateAvailable, checkedAt }`；`?force=1` 绕过 6 小时缓存；`latest` 为 `null` 表示查不到（离线 / registry 不可达）
- `GET /dsh-documents/api/preview?path=...` — 文本预览
- `GET /dsh-documents/api/raw?path=...` — 图片 / PDF 内嵌流（支持 Range）
- `POST /dsh-documents/api/action` — `{ action: "open" | "reveal" | "rename" | "trash", path, name? }`

POST 需要请求头 `x-dsh-documents: 1`；所有路径先做 realpath 校验，必须落在已配置的工作区根目录内。
