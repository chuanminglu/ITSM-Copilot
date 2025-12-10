# Vite 构建命令快速参考

## 开发模式
```bash
# 启动开发服务器
vite

# 或指定端口
vite --port 3000

# 指定host暴露到网络
vite --host
```

## 生产构建
```bash
# 类型检查
tsc --noEmit

# 构建生产版本
vite build

# 复制manifest到dist
node scripts/copy-manifest.js

# 完整构建流程
tsc && vite build && node scripts/copy-manifest.js
```

## 预览构建结果
```bash
vite preview
```

## 常用选项
```bash
# 清除缓存后构建
vite build --force

# 查看构建详情
vite build --debug

# 生成sourcemap
vite build --sourcemap
```

## 开发调试
```bash
# 开发模式 + 打开浏览器
vite --open

# 查看vite配置
vite --config vite.config.ts
```
