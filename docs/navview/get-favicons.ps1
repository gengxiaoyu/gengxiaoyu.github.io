# 获取网站 Favicon 图标的 PowerShell 脚本

# 使用方法：
# 1. 在 PowerShell 中运行此脚本
# 2. 脚本会自动获取所有网址的 favicon 并保存到 icons 目录

$websites = @(
    "apifox.com",
    "sqlpub.com",
    "www.qiniu.com",
    "gitee.com",
    "github.com",
    "www.gitpp.com",
    "gitcode.net",
    "www.csdn.net",
    "juejin.cn",
    "www.oschina.net",
    "element-plus.org",
    "www.naiveui.com",
    "www.antdv.com",
    "vxetable.cn",
    "arco.design",
    "www.shadcn.com.cn",
    "uviewui.com",
    "nutui.jd.com",
    "datav.jiaminghi.com",
    "d3js.org",
    "echarts.apache.org",
    "threejs.org",
    "v3.vuejs.org",
    "router.vuejs.org",
    "pinia.vuejs.org",
    "nuxt.com",
    "react.dev",
    "nextjs.org"
)

$iconsDir = ".\icons"
if (-not (Test-Path $iconsDir)) {
    New-Item -ItemType Directory -Path $iconsDir | Out-Null
}

foreach ($site in $websites) {
    $url = "https://www.google.com/s2/favicons?domain=$site&sz=32"
    $filename = "$site.ico"
    $filepath = Join-Path $iconsDir $filename

    try {
        Write-Host "获取 $site 的图标..."
        Invoke-WebRequest -Uri $url -OutFile $filepath -ErrorAction Stop
        Write-Host "✓ $site - $filename" -ForegroundColor Green
        Start-Sleep -Milliseconds 100
    }
    catch {
        Write-Host "✗ $site - 获取失败" -ForegroundColor Red
    }
}

Write-Host "`n所有图标已保存到 $iconsDir 目录"
