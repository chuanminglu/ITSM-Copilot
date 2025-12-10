# ITSM智能辅助浏览器插件

> **项目愿景**: 通过AI+规则双轨推荐技术，将ITSM工单创建时的系统选择准确率从60%提升至85%+，用户操作时间减少50%

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.x-61dafb.svg)](https://reactjs.org/)

## 📊 项目进度

- **总体完成度**: 0% 
- **当前阶段**: Sprint 1准备启动
- **预计开始时间**: 2025-12-16
- **当前里程碑**: 前期规划与文档完成 ✅

## 🎯 核心特性

### 🌟 智能推荐引擎
- **AI增强推荐**: 集成DeepSeek API，基于用户输入智能推荐Top3系统
- **规则引擎备份**: 使用Fuse.js实现本地模糊搜索（中文/拼音/英文）
- **双轨降级策略**: AI超时5秒自动降级到规则引擎，确保可用性

### 🌟 用户体验优化
- **Sidebar实时搜索**: 侧边栏300ms防抖搜索，无需页面跳转
- **一键自动填充**: 点击推荐结果自动填充ITSM下拉框
- **置信度反馈**: 5星评分收集用户反馈，持续优化推荐质量

## ⚡ 技术架构

- **前端**: React 18 + TypeScript 5.x + TailwindCSS 3.x
- **状态管理**: Zustand 4.x
- **扩展框架**: Chrome Extension Manifest V3 + Vite 5.x
- **AI集成**: DeepSeek API (OpenAI SDK 4.x) + Fuse.js 7.x
- **数据存储**: chrome.storage.local (5MB配额，TTL缓存1小时)

## 📈 预期价值

**性能指标**:
- 系统选择准确率: 60% → 85% (提升42%)
- 操作时间: 120秒 → 30秒 (减少75%)
- 响应速度: P95 < 200ms (规则引擎), P95 < 3秒 (AI)

**成本控制**:
- 月运营成本: < 100元 (DeepSeek API 0.14元/百万Token)
- 部署成本: 0元 (无后端架构)

## 📋 项目文档

- [迭代计划文档](./docs/迭代计划文档-ITSM智能辅助插件_单人全栈版.md) - Sprint 1详细任务拆解
- [项目状态跟踪](./docs/PROJECT_STATUS_v1.0.md) - 实时进度跟踪
- [软件架构文档](./docs/软件架构文档-ITSM智能辅助浏览器插件.md) - 系统架构设计
- [用户故事文档](./docs/ITSM系统需求提交优化_用户故事文档.md) - US-001至US-009

## 🚀 快速开始

> **注意**: 项目当前处于规划阶段，代码实现将于2025-12-16开始

### 前置要求

- Node.js >= 18.x
- npm >= 9.x
- Chrome浏览器 >= 90

### 安装依赖

```bash
# 克隆仓库
git clone https://github.com/chuanminglu/ITSM-Copilot.git
cd ITSM-Copilot

# 安装依赖（开发阶段暂无）
npm install
```

### 开发模式

```bash
# 启动开发服务器（开发阶段暂无）
npm run dev

# 构建生产版本
npm run build
```

### 加载到Chrome

1. 打开 `chrome://extensions/`
2. 开启"开发者模式"
3. 点击"加载已解压的扩展程序"
4. 选择 `dist` 目录

## 🗂️ 项目结构

```
ITSM助手/
├── docs/                           # 项目文档
│   ├── 迭代计划文档-ITSM智能辅助插件_单人全栈版.md
│   ├── PROJECT_STATUS_v1.0.md
│   ├── 软件架构文档-ITSM智能辅助浏览器插件.md
│   ├── 用户故事文档.md
│   └── prototype/                  # 交互原型
├── .github/
│   └── copilot-instructions.md     # GitHub Copilot全局指令
├── src/                            # 源代码（待开发）
├── README.md
└── .gitignore
```

## 📅 开发计划

### Sprint 1 (2025-12-16 至 2025-12-27)

**核心目标**:
- ✅ US-001: 系统智能搜索与选择功能
- ✅ US-002: 系统选择置信度反馈

**时间安排**:
- Day 1-3: 环境搭建 + Sidebar UI
- Day 4-6: 规则引擎 + AI集成 + 双轨推荐
- Day 7-8: 置信度反馈功能
- Day 9-10: 测试验收与文档

## 🤝 贡献指南

本项目目前为单人全栈开发模式，暂不接受外部贡献。

## 📄 开发规范

请遵循 `.github/copilot-instructions.md` 中定义的开发规范：
- 迭代计划文档不允许修改
- 每个任务组完成后必须更新项目状态文档
- 所有代码必须通过验收标准

## 📝 License

MIT License - 详见 [LICENSE](LICENSE) 文件

## 👤 作者

**开发者A** - 单人全栈工程师

## 🙏 致谢

- DeepSeek AI - 提供高性价比AI能力
- Chrome Extension Team - 优秀的扩展平台
- React & TypeScript 社区

---

**项目状态**: 🟡 规划阶段  
**最后更新**: 2025-12-10  
**下一里程碑**: Sprint 1启动 (2025-12-16)
