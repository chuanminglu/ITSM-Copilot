# ITSM智能辅助浏览器插件 - 开发指南

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 加载到Chrome浏览器

1. 运行 `npm run build` 构建项目
2. 打开 Chrome 浏览器，访问 `chrome://extensions/`
3. 开启右上角的"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择项目的 `dist` 目录

## 项目结构

```
itsm-assistant/
├── public/              # 静态资源
│   ├── manifest.json    # Chrome扩展配置
│   └── icons/          # 扩展图标
├── src/
│   ├── sidebar/        # Sidebar侧边栏UI
│   │   ├── App.tsx     # 主应用组件
│   │   ├── main.tsx    # 入口文件
│   │   └── index.css   # 样式文件
│   ├── background/     # Background Service Worker
│   │   └── index.ts    # 后台服务脚本
│   ├── content/        # Content Script
│   │   └── index.ts    # 内容脚本
│   └── types/          # TypeScript类型定义
├── sidebar.html        # Sidebar HTML模板
├── package.json
├── tsconfig.json       # TypeScript配置
├── vite.config.ts      # Vite构建配置
└── tailwind.config.js  # TailwindCSS配置
```

## 技术栈

- **前端**: React 18 + TypeScript 5.x
- **样式**: TailwindCSS 3.x
- **状态管理**: Zustand 4.x
- **构建工具**: Vite 5.x
- **AI集成**: DeepSeek API (OpenAI SDK 4.x)
- **搜索引擎**: Fuse.js 7.x + pinyin-pro
- **Chrome Extension**: Manifest V3

## 开发规范

请遵循 `.github/copilot-instructions.md` 中的开发规范：

1. **迭代计划文档不可修改**
2. **完成任务组后必须更新PROJECT_STATUS_v1.0.md**
3. **所有代码必须通过验收标准**

## 验收标准 - T1.1

**功能验收**:
- ✅ `npm run dev` 启动成功，无报错
- ✅ Chrome浏览器加载扩展成功
- ✅ Sidebar页面正常打开

**代码质量**:
- ✅ manifest.json包含必需字段
- ✅ vite.config.ts配置正确
- ✅ TypeScript编译无错误

## License

MIT
