# 图标说明

当前使用SVG占位图标。在正式发布前，需要使用以下命令将SVG转换为PNG：

```bash
# 使用在线工具或本地工具转换
# 需要生成 16x16, 48x48, 128x128 三种尺寸

# 临时方案：复制icon.svg为各个尺寸文件名
cp icon.svg icon-16.png
cp icon.svg icon-48.png  
cp icon.svg icon-128.png
```

或者暂时修改manifest.json使用SVG图标（部分浏览器支持）
