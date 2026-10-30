#Requires -Version 5.1
# 注意：本文件必须保存为 UTF-8 with BOM。Windows PowerShell 5.1 会把无 BOM 的
# .ps1 当成 ANSI 读，中文提示会变成乱码并导致解析失败。
<#
.SYNOPSIS
  本地打包并安装 dsh-documents，用 tarball 形式的 file: 依赖绕开 npm 发布时间策略
  （pnpm 11 的 minimumReleaseAge），用来测试刚发布或还没发布的新版本。

.DESCRIPTION
  1. 校验包结构（node --check + scripts/verify.mjs）
  2. npm pack 到 dist/；用 -Version 可以打一个独立的本地版本号，和 npm 上的版本区分开
  3. 清掉 profile 里上次中断留下的 dsh-documents_tmp_* 目录（留着会让 pnpm 报 ERR_PNPM_EPERM）
  4. 在 profile 目录里直接跑 pnpm add <tarball>（桌面 profile 由 Electron 独占管理，
     `dsh plugin add` 会被拒绝，所以不走 CLI）
  5. 读回安装后的版本号确认

.EXAMPLE
  .\scripts\local-install.ps1

.EXAMPLE
  .\scripts\local-install.ps1 -Version 1.0.4-local.1

.EXAMPLE
  .\scripts\local-install.ps1 -Profile web

.EXAMPLE
  .\scripts\local-install.ps1 -Restore
#>
[CmdletBinding()]
param(
  [string]$Profile = 'desktop',
  [string]$ProfileDir,
  [string]$Version,
  [string]$DistDir = 'dist',
  [switch]$SkipCheck,
  [switch]$Restore
)

$ErrorActionPreference = 'Stop'

$repo = Split-Path $PSScriptRoot -Parent
$dist = Join-Path $repo $DistDir
if (-not $ProfileDir) { $ProfileDir = Join-Path $env:USERPROFILE ".dsh\profiles\$Profile" }
$profileDir = (Resolve-Path $ProfileDir).Path
$installedDir = Join-Path $profileDir 'node_modules\dsh-documents'

function Write-Step([string]$Text) { Write-Host "==> $Text" -ForegroundColor Cyan }
function Invoke-Pnpm([string[]]$Arguments) {
  Push-Location $profileDir
  try { & pnpm @Arguments } finally { Pop-Location }
}

if (-not (Test-Path $profileDir)) {
  throw "找不到 profile 目录：$profileDir（先用 DSH 打开过一次该 profile，或检查 -Profile 名字）"
}
if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
  throw 'PATH 里没有 pnpm，先装 pnpm 或从 DSH 的运行时里调用它。'
}

if ($Restore) {
  Write-Step '把 dsh-documents 切回 npm registry 上的版本'
  Invoke-Pnpm @('add', 'dsh-documents@latest')
  if ($LASTEXITCODE -ne 0) { throw "pnpm add 失败，退出码 $LASTEXITCODE" }
  $v = (Get-Content (Join-Path $installedDir 'package.json') -Raw | ConvertFrom-Json).version
  Write-Host "    已恢复 registry 版本：$v" -ForegroundColor Green
  return
}

New-Item -ItemType Directory -Force -Path $dist | Out-Null

if (-not $SkipCheck) {
  Write-Step '校验包结构'
  Push-Location $repo
  try {
    node --check index.js
    node --check client.js
    node scripts/verify.mjs
  } finally {
    Pop-Location
  }
}

$pkg = Get-Content (Join-Path $repo 'package.json') -Raw | ConvertFrom-Json
$packVersion = if ($Version) { $Version } else { $pkg.version }

Write-Step "打包 dsh-documents@$packVersion"

if ($Version) {
  # npm pack 没有 --version 覆盖，复制一份带上本地版本号再打
  $stage = Join-Path ([System.IO.Path]::GetTempPath()) ("dsh-documents-pack-" + [guid]::NewGuid().ToString('N'))
  New-Item -ItemType Directory -Force -Path $stage | Out-Null
  try {
    $files = @('index.js', 'client.js', 'cordis.patch.yml', 'icon.svg', 'README.md', 'LICENSE')
    foreach ($f in $files) { Copy-Item (Join-Path $repo $f) (Join-Path $stage $f) }
    New-Item -ItemType Directory -Force -Path (Join-Path $stage 'locale') | Out-Null
    Copy-Item (Join-Path $repo 'locale\*.json') (Join-Path $stage 'locale')

    $staged = Get-Content (Join-Path $repo 'package.json') -Raw | ConvertFrom-Json
    $staged.version = $Version
    $staged | ConvertTo-Json -Depth 20 | Set-Content (Join-Path $stage 'package.json') -Encoding utf8

    Push-Location $stage
    try {
      npm pack --ignore-scripts --pack-destination $dist | Out-Null
    } finally {
      Pop-Location
    }
  } finally {
    Remove-Item $stage -Recurse -Force -ErrorAction SilentlyContinue
  }
} else {
  Push-Location $repo
  try {
    npm pack --ignore-scripts --pack-destination $dist | Out-Null
  } finally {
    Pop-Location
  }
}

$tarball = Join-Path $dist "dsh-documents-$packVersion.tgz"
if (-not (Test-Path $tarball)) { throw "打包失败，没找到 $tarball" }
$size = [math]::Round((Get-Item $tarball).Length / 1KB, 1)
Write-Host "    $tarball ($size KB)" -ForegroundColor DarkGray

# 上次中断留下的 _tmp_ 目录会让 pnpm 报 ERR_PNPM_EPERM，先清掉；
# 当前正常安装的目录不要动，pnpm 会自己替换掉。
$leftovers = Get-ChildItem (Join-Path $profileDir 'node_modules') -Filter 'dsh-documents_tmp_*' -Force -ErrorAction SilentlyContinue
foreach ($item in $leftovers) {
  Write-Step "清理残留目录 $($item.Name)"
  Remove-Item $item.FullName -Recurse -Force -ErrorAction SilentlyContinue
}

Write-Step "安装到 $profileDir（file: 依赖，pnpm 不查发布时间）"
# 同一个版本号、同一个 tarball 路径再装一次时，pnpm 只比对 lockfile，会报
# "Already up to date" 而不重新解包；所以先 remove 再 add，保证装进去的是刚打的包。
Invoke-Pnpm @('remove', 'dsh-documents')
if ($LASTEXITCODE -ne 0) {
  Write-Host '    （此前没有安装 dsh-documents，跳过 remove）' -ForegroundColor DarkGray
}
Invoke-Pnpm @('add', $tarball)
if ($LASTEXITCODE -ne 0) {
  throw "pnpm add 失败（退出码 $LASTEXITCODE）。若报 ERR_PNPM_EPERM，先完全退出 DSH 再跑一次；装坏了就再跑一次本脚本。"
}

Write-Step '确认安装结果'
if (-not (Test-Path $installedDir)) { throw "安装后仍然没有 $installedDir" }
$actual = (Get-Content (Join-Path $installedDir 'package.json') -Raw | ConvertFrom-Json).version
$changed = @()
foreach ($file in @('index.js', 'client.js', 'cordis.patch.yml')) {
  $built = (Get-FileHash (Join-Path $repo $file) -Algorithm SHA256).Hash
  $landed = (Get-FileHash (Join-Path $installedDir $file) -Algorithm SHA256).Hash
  if ($built -ne $landed) { $changed += $file }
}
if ($changed.Count -gt 0) {
  throw "装进去的文件和本地构建不一致：$($changed -join ', ')（多半是 pnpm 用了旧缓存，再跑一次本脚本）"
}
Write-Host "    已安装版本：$actual（文件校验一致）" -ForegroundColor Green

Write-Host ''
Write-Host '下一步：回到 DSH 按 Ctrl+R；宿主侧代码改动需要完全退出 DSH 再启动才生效。' -ForegroundColor Yellow
Write-Host '回到 npm 正式版：.\scripts\local-install.ps1 -Restore' -ForegroundColor DarkGray
