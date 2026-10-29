# 文档库（Document Library）

DSH Desktop 插件：把**会话生成、编辑或交付过的文档**集中成一个列表，每个文档都能追溯到具体会话和事件位置。

你不再需要回忆「刚才那个报告是哪个会话写的、写到哪一步了」——打开侧边栏的「文档」，路径、来源会话、每次修改的事件坐标都在里面。

- 包名：`dsh-documents`（[npm](https://www.npmjs.com/package/dsh-documents)）· 版本 1.0.2 · MIT
- 要求：DSH Desktop `>= 0.2.1-rc.3`，Node.js `>= 22.19.0`

---

## 功能

- **自动收录，不用手动添加**：只读 DSH 会话日志，凡是会话里 `write` / `edit` 过的文件、或被 `present` 标记为交付物的文件，自动进入文档库。不扫描目录、不索引全盘。
- **来源可追溯**：每个文档带创建它的会话、编辑过它的其他会话，以及每次变动的事件坐标（轮次 / `#seq` / 时间）和内容片段。
- **一键回到现场**：点「打开会话」跳到对应会话，并把历史加载到那条事件。
- **内置查看器**：Markdown 阅读模式（标题、列表、表格、代码块、链接）与源码切换、纯文本等宽预览、图片与 PDF 内嵌显示、60%–200% 缩放。
- **筛选与搜索**：按类型、工作区筛选，按文件名 / 文件夹 / 会话标题搜索，按最近活动、名称、大小排序。
- **文件操作**：用桌面应用打开、在文件夹中显示、复制路径、重命名、移入回收站。
- **快**：分块流式加载，先扫完的先显示；每 60 秒增量刷新，没有变化时完全不重绘。

---

## 安装

### 方式一：界面安装（推荐）

DSH Desktop → **设置 → 插件 → 安装**，输入：

```
dsh-documents
```

需要固定版本时写 `dsh-documents@1.0.2`。

> 「插件」页有两个容易混淆的入口：**安装**是输入包名安装；**发现**是搜索第三方插件市场索引，不会列出 npm 上的包。

### 方式二：命令行安装

```bash
dsh plugin add dsh-documents
```

`dsh plugin` 会把参数转发给 profile 目录下的 pnpm，所以 `dsh-documents@1.0.2`、`dsh plugin remove dsh-documents` 这类写法都能用。多 profile 时加 `--profile <name>`。

### 方式三：本地目录或 tarball

```bash
# 源码目录（会建立链接，方便改代码后热更新）
dsh plugin add C:\path\to\dsh-documents

# 本地打包产物
npm pack
dsh plugin add .\dsh-documents-1.0.2.tgz
```

### 方式四：直接从 GitHub 安装

仓库没有构建步骤，源码即产物：

```bash
dsh plugin add github:aerfaman/dsh-documents
```

### 安装之后

按 **Ctrl+R** 刷新窗口，侧边栏出现「文档」图标。

### 升级

```bash
dsh plugin add dsh-documents@latest
```

或在插件页把版本改成新的再装一次。装完同样按 Ctrl+R。

### 卸载

```bash
dsh plugin remove dsh-documents
```

---

## 快速上手

1. 在任意会话里让 Agent 写一份文件（例如让它在工作区里生成 `report.md`）。
2. 打开侧边栏的「文档」——这份文件会出现在列表顶部，右侧显示来源会话。
3. 点开它看内容；点工具条上的「详情」可以看到它是哪个会话、在哪条事件写下的。
4. 需要回到当时那一刻，点「打开会话」。

---

## 界面说明

### 左侧：文档列表

左侧始终保留列表，右侧是查看器；点列表里的另一份文档即可直接切换，不会丢失列表位置。

- 默认按**最近活动**排序。
- 顶部搜索框匹配文件名、文件夹路径和会话标题。
- 类型 chips 按 Word / Excel / 幻灯片 / PDF / Markdown / 文本 过滤，并显示各类型数量。
- 有多个工作区时可切换工作区。
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
- **会话卡**：创建它的会话，以及编辑过它的其他会话（色条和徽章区分「创建 / 编辑」）。
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

---

## 配置（可选）

在 profile 的插件行里配置，例如 `~/.dsh/profiles/<profile>/cordis.patch.yml`：

```yaml
- id: dsh-documents
  config:
    extraRoots:
      - "D:/Documents/Reports"
```

- `extraRoots`：在工作区之外额外纳入的目录。文件操作仍限制在这些根目录内（realpath 校验，不允许越界）。

---

## 常见问题

**装好了但侧边栏没有「文档」图标**
按 Ctrl+R 刷新窗口；仍没有就去「设置 → 插件」确认 `dsh-documents` 已启用、没有加载失败。

**列表是空的 / 少了很多文件**
文档只从会话事件推导，下面这些情况不会出现：用 `bash` / `pwsh` 跑脚本生成、没经过 `write` / `edit` / `present` 的文件；扩展名不在支持列表里的文件；已被移动或删除出工作区的文件。

**安装时报 `ERR_PNPM_EPERM ... importPackage`**
通常是 `node_modules` 里留了旧的同名目录（例如早期用本地目录安装留下的链接），pnpm 无法覆盖。删掉再装：

```powershell
cmd /c rmdir "$env:USERPROFILE\.dsh\profiles\desktop\node_modules\dsh-documents"
```

**点「打开」没反应 / 提示无法打开**
打开动作交给 DSH 的桌面接口执行。插件进程本身不直接启动 GUI 程序（会被沙箱拦截），失败时界面会给出原因。

**「打开会话」跳过去了，但没有高亮到具体那一行**
Harness 目前没有公开「滚动并高亮某条事件」的客户端 API，所以只做到打开会话并加载到该事件；事件坐标（轮次 / `#seq` / 时间）显示在按钮旁，方便手动定位。

---

## 已知限制

- 列表中最多显示 800 个文档，超出会提示截断。
- 列表和预览按文件内容读取，超大文件的预览会被截断（默认 400 KB）。
- 文档的「创建会话」由会话事件时间推断：如果一个文件在多个会话里都被首次写入，取最早的那次。

---

## 开发

```bash
npm run check       # node --check + 包结构校验
npm run pack:dry    # 查看 npm 包内容
```

包内容固定为：`index.js`、`client.js`、`cordis.patch.yml`、`locale/*.json`、`icon.svg`、`README.md`、`LICENSE`。

| 文件 | 作用 |
| --- | --- |
| `index.js` | Host 半：读会话日志、聚合文档、流式/增量列表、预览、raw 文件流、文件操作、`documents` 工具、本地 API |
| `client.js` | Client 半：侧边栏入口、文档库、查看器、Markdown 渲染、会话溯源与跳转 |
| `cordis.patch.yml` | 插入 `dsh-documents` 行 |
| `locale/*.json` | 插件管理器显示用的标题与描述 |
| `icon.svg` | 插件图标 |
| `scripts/verify.mjs` | 校验包名 / 客户端模块 id / patch 行名一致 |
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
- `GET /dsh-documents/api/preview?path=...` — 文本预览
- `GET /dsh-documents/api/raw?path=...` — 图片 / PDF 内嵌流（支持 Range）
- `POST /dsh-documents/api/action` — `{ action: "open" | "reveal" | "rename" | "trash", path, name? }`

POST 需要请求头 `x-dsh-documents: 1`；所有路径先做 realpath 校验，必须落在已配置的工作区根目录内。
