#!/usr/bin/env pwsh
# Vite 构建脚本 - PowerShell版本

Write-Host "🚀 开始构建 ITSM Assistant..." -ForegroundColor Cyan

# 设置路径
$projectRoot = Split-Path -Parent $PSScriptRoot
$vitePath = Join-Path $projectRoot "node_modules\.bin\vite.ps1"

# 步骤1: TypeScript类型检查
Write-Host "`n📝 步骤1/3: TypeScript类型检查..." -ForegroundColor Yellow
& tsc --noEmit
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ TypeScript类型检查失败" -ForegroundColor Red
    exit 1
}
Write-Host "✅ TypeScript类型检查通过" -ForegroundColor Green

# 步骤2: Vite构建
Write-Host "`n🔨 步骤2/3: Vite构建生产版本..." -ForegroundColor Yellow
if (Test-Path $vitePath) {
    & $vitePath build
} else {
    & npx vite build
}
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Vite构建失败" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Vite构建成功" -ForegroundColor Green

# 步骤3: 复制manifest
Write-Host "`n📦 步骤3/3: 复制manifest到dist..." -ForegroundColor Yellow
& node scripts/copy-manifest.js
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 复制manifest失败" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Manifest复制成功" -ForegroundColor Green

Write-Host "`n🎉 构建完成！输出目录: dist/" -ForegroundColor Cyan
Write-Host "📝 下一步: 在chrome://extensions中刷新扩展" -ForegroundColor Gray
