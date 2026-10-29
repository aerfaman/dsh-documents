# 文档库（Document Library）插件

DSH Desktop 插件：把**会话生成、编辑或交付过的文档**集中起来管理。每个文档都能追溯到具体会话与事件位置。

> 插件包名：`dsh-documents`（npm）。客户端模块 id、bundle 行名与包名必须一致，`npm run check` 会校验。

## 安装

发布到 npm 后，DSH Desktop 里可以直接按插件名安装：

- **界面**：设置 → 插件 → 安装，输入 `dsh-documents`（或 `dsh-documents@1.0.0`）。
- **CLI**：`dsh plugin add dsh-documents`。
- **本地目录**：`dsh plugin add C:\path\to\dsh-documents`。
- **本地 tarball**：`dsh plugin add .\dsh-documents-1.0.0.tgz`。
- **GitHub 源码**（无需构建）：`dsh plugin add github:aerfaman/dsh-documents`。

安装后按 **Ctrl+R** 刷新窗口，侧边栏出现「文档」图标。

## 数据来源

不再扫描目录。文档来自 DSH 会话日志：

- `write` / `edit` 等写文件工具调用：记录写入、修改的内容摘要与行数变化。
- `deliverables/presented`（`present` 工具）：记录“交付文档”事件及说明。
- 只有能被上述事件映射到、且当前仍存在于工作区内的文档才会出现。

因此“另一个会话编辑过”会体现为同一文档下的多条会话记录，并注明修改摘要和片段。

## 界面

- 侧边栏「文档」图标打开文档库。
- **左侧始终保留文档列表**，右侧是查看器；点击列表中的另一个文档即可直接切换查看。
- 列表按最近活动排序，显示创建会话、更新时间；可按类型 / 工作区筛选，按名称、文件夹、会话标题搜索。
- **缓存与刷新**：列表和文档预览都会缓存在页面内，打开 / 切换文档不会重新请求；列表每 **60 秒**自动后台刷新一次（仅页面可见时），窗口重新聚焦时只有在缓存过期后才刷新。右上角「刷新」按钮可立即强制刷新并清空预览缓存。
- 重命名后的文件会记录映射并在列表中保留（映射存放在 `~/.dsh/documents-renames.json`），不会因为会话日志里还是旧路径而消失。
- 查看器：
  - Markdown 默认**阅读模式**（渲染标题、列表、表格、代码块、链接），可切换源码。
  - 文本文件等宽预览。
  - 图片、PDF 内嵌显示。
  - 缩放 60%–200%，点百分比可重置。
  - 「详情」默认收起，点工具条上的「详情」展开：路径、大小、修改时间、来源会话、每次编辑的事件坐标（轮次 / `#seq` / 时间）与内容片段；窄屏时列表和详情都变成可切换的抽屉。
- 每个会话和每条编辑事件都有「打开会话」：跳转到对应会话，并把历史加载到该事件。
- 详情分区有明确视觉层次：元信息卡、会话卡、操作卡；会话卡按「创建 / 编辑」用不同色条与徽章区分；每条变动按「写入 / 修改 / 交付」使用不同颜色的徽章、色条和底色，长列表也容易扫读。
- 操作：用桌面应用打开、在文件夹中显示、复制路径、重命名、移入回收站。
- 「用桌面应用打开」走 DSH 的桌面打开接口（`sessionController.openWorkspacePath`），与 DSH 自带的文件打开行为一致；插件进程不会直接 spawn GUI 程序（会被沙箱拦截），失败时界面会提示原因。

> 说明：Harness 目前没有公开“滚动并高亮某条会话事件”的客户端 API，所以跳转会打开会话并加载到该事件，但不会自动滚动到屏幕中央；事件坐标会显示在按钮旁。

## 已知范围

- 通过 `bash` / `pwsh` 调用脚本生成、且没有经过 `write` / `edit` / `present` 的文件不会被收录。
- 通过 `write` / `edit` 产生的同名文件在不同会话中的记录会合并到同一文档。
- 回收站：`%USERPROFILE%\.dsh\documents-trash\`。

## 配置（可选）

```yaml
- id: dsh-documents
  config:
    extraRoots:
      - "D:/Documents/Reports"
```

- `extraRoots`：在工作区之外额外纳入扫描的目录（仍只允许对工作区内文件做操作）。

## 发布到 npm

### 一次性准备

使用 **npm trusted publishing（OIDC）**：GitHub 里不存任何 npm token，凭据由 Actions 的 `id-token` 现换现用，provenance 自动生成。

1. 包已存在于 npm（trusted publishing 不能创建新包，首次发布需手动；`dsh-documents@1.0.0` 已发布）。
2. npmjs.com → 该包 → **Settings → Trusted publishing** → 添加 **GitHub Actions**：
   - Organization or user：`aerfaman`
   - Repository：`dsh-documents`
   - Workflow filename：`release.yml`（必须与 `.github/workflows/release.yml` 同名）
   - Environment：留空（除非 workflow 里也写了同名的 `environment:`）
3. **不要**再配置 `NPM_TOKEN` / `NODE_AUTH_TOKEN`：npm 一旦发现 token 就会放弃 OIDC，退回 token 认证。
4. 仓库 **Settings → Actions → General → Workflow permissions** 勾选 `Read and write`（创建 Release 需要 `contents: write`，workflow 内已声明 `permissions`）。
5. workflow 里 `actions/setup-node` **不要**加 `registry-url`（它会写入 `${NODE_AUTH_TOKEN}` 的 `.npmrc`），registry 由 `package.json` 的 `publishConfig.registry` 决定。

### 发布新版本

推 main 即自动发布，`release.yml` 做这些事：

```bash
npm version patch     # 或 minor / major：只改 package.json 版本号
git push origin main  # 或者 git push --follow-tags，同时推 v* tag
```

1. `npm run check` 校验包结构；
2. 查 npm 上是否已有该版本：**已有 → 跳过发布**（所以只推代码、没改版本号不会失败）；
3. 版本是新的 → `npm publish --provenance --access public`（OIDC 换短期凭证，provenance 自动生成）；
4. 该 tag 还没有 GitHub Release → `npm pack` 并把 `.tgz` 附到 Release，同时创建 `v<version>` tag。

补充：

- 打 `v*` tag 触发时会额外校验 tag 与 `package.json` 版本一致。
- 手动重跑：Actions → Release → **Run workflow**（`workflow_dispatch`）。
- 运行环境需要 npm ≥ 11.5.1，workflow 里已 `npm install -g npm@latest` 并校验。
- 也可以在本机手动发布（npm ≥ 11.5.1，注意本机 npm 默认 registry 可能是 npmmirror，必须显式指定官方源）：

```bash
npm login --registry https://registry.npmjs.org
npm publish --registry https://registry.npmjs.org
```

### 为什么按名字能装

DSH 插件管理器用 pnpm 安装 spec，npm 包名就是安装名。`installBundle` 接受 registry 名称、路径、git 地址或 tarball，所以 `dsh-documents` 会直接解析到 npm 上的这个包。客户端 bundle 的模块 id（`client.js` 里的 `id`）必须等于包名，`cordis.patch.yml` 的行名也一样；`scripts/verify.mjs` 会在 CI 和 `prepack` 时校验。

## 开发

```bash
npm run check       # node --check + 包结构校验
npm run pack:dry    # 查看 npm 包内容
```

当前包内容：`index.js`、`client.js`、`cordis.patch.yml`、`locale/*.json`、`icon.svg`、`README.md`、`LICENSE`。

## 文件结构

| 文件 | 作用 |
| --- | --- |
| `index.js` | Host 半：读取会话日志、聚合文档、预览、raw 文件流、文件操作、`documents` 工具、本地 API |
| `client.js` | Client 半：侧边栏入口、文档库、查看器、Markdown 渲染、会话溯源与跳转 |
| `cordis.patch.yml` | 插入 `dsh-documents` 行 |
| `locale/*.json` | 插件管理器显示用的标题和描述 |
| `icon.svg` | 插件图标 |
| `scripts/verify.mjs` | 包名 / 客户端 id / patch 行名一致性校验 |
| `.github/workflows/ci.yml` | 推送与 PR 时校验包结构 |
| `.github/workflows/release.yml` | 推 main / `v*` tag 时发布到 npm 并创建 GitHub Release |

## 本地接口

- `GET /dsh-documents/api/list` — `{ documents, sessionCount, truncated }`
- `GET /dsh-documents/api/preview?path=...` — 文本预览
- `GET /dsh-documents/api/raw?path=...` — 图片 / PDF 内嵌流（支持 Range）
- `POST /dsh-documents/api/action` — `{ action: "open" | "reveal" | "rename" | "trash", path, name? }`

POST 需要 `x-dsh-documents: 1`；所有路径先做 realpath 校验，必须位于已配置的工作区根目录内。

## 已验证

- 包名切换为 `dsh-documents` 后重新安装成功，插件行 active，`/list` 返回 31 个会话文档 / 32 个会话。
- 客户端 bundle 以 `dsh-documents` 模块 id 正常下发。
- `npm run check` 与 `npm pack --dry-run` 通过，tarball 包含全部运行文件（9 个）。
