# ITSM系统需求提交优化 - 设计元素分析报告

> **📌 文档说明**: 本报告基于用户旅程分析和用户故事文档，提取ITSM需求助手浏览器插件的核心设计元素，包括页面结构、UI组件清单和数据字段定义。
>
> **分析日期**: 2025年12月8日
> **产品形态**: 浏览器插件（侧边栏交互模式）
> **目标系统**: ITSM需求提交系统

---

## 第1章：页面结构分析

### 1.1 核心页面架构

| 页面名称 | 主要功能 | 目标用户 | 触发场景 | 优先级 |
|---------|---------|---------|---------|-------|
| **侧边栏主界面** | 系统选择、模板推荐、需求填写、质量评分 | 所有需求提交者 | 打开ITSM页面时自动展示 | P0 |
| **系统分类导航页** | 系统分类浏览、快速定位目标系统 | 不确定系统的用户 | 点击"不确定选哪个系统？浏览分类" | P0 |
| **需求示例库页** | 查看高质量需求案例、一键复制示例 | 不知道如何描述的用户 | 点击"查看示例"按钮 | P0 |
| **质量诊断详情页** | 查看详细的质量诊断结果和改进建议 | 质量评分<60分的用户 | 点击质量评分区域 | P0 |
| **历史记录列表页** | 查看已提交需求、复用历史内容 | 重复提交类似需求的用户 | 点击"历史记录"标签 | P1 |
| **草稿管理页** | 查看和恢复未提交的草稿 | 需要分批填写的用户 | 点击"草稿"标签 | P1 |

### 1.2 页面层级关系

```
侧边栏插件根容器
│
├── 📌 侧边栏主界面（默认页）
│   ├── 系统选择区
│   │   ├── 智能搜索框
│   │   └── 分类导航入口 → 🔗 系统分类导航页
│   ├── 模板推荐区
│   ├── 结构化表单区
│   │   └── 查看示例链接 → 🔗 需求示例库页
│   ├── 质量评分区
│   │   └── 点击展开 → 🔗 质量诊断详情页
│   └── 操作按钮区
│
├── 📁 系统分类导航页（独立页面）
│   ├── 分类卡片列表（6大类）
│   └── 系统列表（每类5-8个系统）
│
├── 📚 需求示例库页（独立页面）
│   ├── 场景筛选器（Bug/优化/新功能）
│   ├── 示例卡片列表
│   └── 示例详情面板
│
├── 📊 质量诊断详情页（抽屉/模态框）
│   ├── 质量雷达图
│   ├── 缺失项清单
│   └── 改进建议
│
└── ⏱️ 历史记录/草稿页（Tab切换）
    ├── 历史记录列表
    └── 草稿列表
```

### 1.3 页面尺寸与布局规范

| 页面类型 | 宽度 | 高度 | 布局方式 | 滚动方式 |
|---------|------|------|---------|---------|
| 侧边栏主界面 | 380px | 100%视口 | 垂直单列 | 整体滚动 |
| 系统分类导航页 | 380px | 100%视口 | 垂直单列 | 整体滚动 |
| 需求示例库页 | 380px | 100%视口 | 垂直单列 | 整体滚动 |
| 质量诊断详情页 | 360px | 自适应（最大70%视口） | 垂直单列 | 内容区滚动 |
| 历史记录/草稿页 | 380px | 100%视口 | 垂直单列 | 列表滚动 |

---

## 第2章：UI组件清单

### 2.1 侧边栏主界面组件

| 组件分区 | 组件类型 | 组件名称 | 用途 | 交互行为 | 优先级 |
|---------|---------|---------|------|---------|-------|
| **顶部导航** | Logo + 标题 | "ITSM需求助手" | 品牌标识 | 静态展示 | P0 |
| **顶部导航** | 图标按钮组 | 历史记录/草稿/设置 | 快捷入口 | 点击切换页面 | P1 |
| **系统选择区** | 智能搜索框 | 系统搜索输入框 | 搜索目标系统 | 实时搜索+下拉匹配 | P0 |
| **系统选择区** | 下拉匹配列表 | 搜索结果列表 | 显示匹配系统 | 点击选中系统 | P0 |
| **系统选择区** | 文字链接 | "不确定？浏览分类" | 引导分类导航 | 点击跳转分类页 | P0 |
| **系统选择区** | 信心度评分器 | 信心度选择按钮组 | 收集用户信心度 | 点击选择（不确定/一般/确定） | P0 |
| **模板推荐区** | 信息卡片 | 智能推荐模板卡 | 显示推荐模板 | 点击应用模板 | P0 |
| **模板推荐区** | 标签组 | 场景标签（Bug/优化/新功能） | 手动选择场景 | 点击切换模板 | P0 |
| **表单填写区** | 文本输入框 | 需求标题输入框 | 输入需求标题 | 实时触发模板推荐 | P0 |
| **表单填写区** | 多行文本框 | 需求背景输入框 | 描述问题背景 | 支持多行输入 | P0 |
| **表单填写区** | 多行文本框 | 需求目标输入框 | 描述预期目标 | 支持多行输入 | P0 |
| **表单填写区** | 多行文本框 | 使用场景输入框 | 描述典型场景 | 支持多行输入 | P0 |
| **表单填写区** | 多行文本框 | 验收标准输入框 | 定义验收条件 | 支持多行输入 | P0 |
| **表单填写区** | 字段提示标签 | 引导性提示文字 | 降低填写门槛 | 点击查看详细说明 | P0 |
| **表单填写区** | 文字链接 | "查看示例"按钮 | 打开示例库 | 点击跳转示例页 | P0 |
| **实时检测区** | 警告提示条 | 缺失项高亮提示 | 实时反馈缺失 | 自动检测+动态显示 | P0 |
| **质量评分区** | 评分卡片 | 质量评分展示卡 | 显示0-100分+星级 | 实时刷新评分 | P0 |
| **质量评分区** | 进度条 | 质量进度条 | 可视化质量 | 颜色分级（红<60/黄60-80/绿>80） | P0 |
| **质量评分区** | 文字链接 | "查看详情"按钮 | 打开诊断详情 | 点击展开抽屉 | P0 |
| **操作按钮区** | 主操作按钮 | "填充到ITSM"按钮 | 一键填充表单 | 点击后填充原页面 | P0 |
| **操作按钮区** | 次要按钮 | "保存草稿"按钮 | 保存当前内容 | 点击保存到LocalStorage | P1 |
| **操作按钮区** | 警告弹窗 | 提交前警告对话框 | 拦截低质量提交 | 质量<60分时触发 | P0 |

### 2.2 系统分类导航页组件

| 组件分区 | 组件类型 | 组件名称 | 用途 | 交互行为 | 优先级 |
|---------|---------|---------|------|---------|-------|
| **顶部导航** | 返回按钮 | "返回"图标按钮 | 返回主界面 | 点击返回上一页 | P0 |
| **顶部导航** | 页面标题 | "系统分类导航" | 页面标识 | 静态展示 | P0 |
| **分类区** | 卡片网格 | 分类卡片（6个） | 展示系统分类 | 点击展开系统列表 | P0 |
| **分类区** | 图标 | 分类图标 | 视觉识别 | 静态展示 | P0 |
| **分类区** | 文字 | 分类名称+数量 | 分类标识 | 显示"客户类(8)" | P0 |
| **系统列表** | 列表项 | 系统列表项 | 展示具体系统 | 点击选中并返回 | P0 |
| **系统列表** | 标签 | 系统别名标签 | 展示关键词 | 辅助识别系统 | P0 |

### 2.3 需求示例库页组件

| 组件分区 | 组件类型 | 组件名称 | 用途 | 交互行为 | 优先级 |
|---------|---------|---------|------|---------|-------|
| **顶部导航** | 返回按钮 | "返回"图标按钮 | 返回主界面 | 点击返回 | P0 |
| **顶部导航** | 页面标题 | "需求示例库" | 页面标识 | 静态展示 | P0 |
| **筛选区** | 标签按钮组 | 场景筛选器 | 筛选示例类型 | 点击切换场景（Bug/优化/新功能） | P0 |
| **列表区** | 卡片列表 | 示例卡片 | 展示需求案例 | 点击展开详情 | P0 |
| **列表区** | 标题文字 | 示例标题 | 案例标识 | 静态展示 | P0 |
| **列表区** | 标签 | 场景标签 | 案例分类 | 静态展示 | P0 |
| **详情面板** | 展开面板 | 示例详情展示 | 显示完整内容 | 展开/收起 | P0 |
| **详情面板** | 复制按钮 | "一键复制"按钮 | 复制示例内容 | 点击复制到剪贴板 | P0 |
| **详情面板** | 应用按钮 | "应用此示例"按钮 | 填充到表单 | 点击后返回并填充 | P0 |

### 2.4 质量诊断详情页组件

| 组件分区 | 组件类型 | 组件名称 | 用途 | 交互行为 | 优先级 |
|---------|---------|---------|------|---------|-------|
| **顶部** | 关闭按钮 | "关闭"图标按钮 | 关闭抽屉 | 点击关闭 | P0 |
| **顶部** | 评分展示 | 大号评分数字+星级 | 突出显示质量 | 静态展示 | P0 |
| **雷达图区** | 雷达图 | 质量维度雷达图 | 可视化各维度质量 | 静态展示（5维：字数/结构/关键词/场景/验收） | P0 |
| **缺失项区** | 列表 | 缺失项清单 | 列出缺失字段 | 点击定位到表单 | P0 |
| **缺失项区** | 图标 | 警告图标 | 突出显示问题 | 静态展示 | P0 |
| **建议区** | 卡片列表 | 改进建议卡片 | 提供具体建议 | 静态展示 | P0 |
| **建议区** | 示例文字 | 优化示例 | 展示优秀写法 | 点击复制 | P0 |

### 2.5 历史记录/草稿页组件

| 组件分区 | 组件类型 | 组件名称 | 用途 | 交互行为 | 优先级 |
|---------|---------|---------|------|---------|-------|
| **顶部导航** | Tab切换器 | "历史记录/草稿"Tab | 切换视图 | 点击切换 | P1 |
| **列表区** | 列表项 | 记录/草稿卡片 | 展示历史条目 | 点击查看详情 | P1 |
| **列表项** | 标题文字 | 需求标题 | 标识记录 | 静态展示 | P1 |
| **列表项** | 时间戳 | 创建/修改时间 | 时间信息 | 静态展示 | P1 |
| **列表项** | 状态标签 | 状态标识 | 显示草稿/已提交 | 静态展示 | P1 |
| **操作区** | 按钮组 | "恢复/删除"按钮 | 操作历史记录 | 点击恢复内容或删除 | P1 |

---

## 第3章：数据字段定义

### 3.1 系统选择相关字段

| 字段名称 | 数据类型 | 是否必填 | 验证规则 | 默认值 | 存储位置 | 说明 |
|---------|---------|---------|---------|--------|---------|------|
| `systemId` | String | 是 | 系统ID格式（如"SYS001"） | - | 插件状态 | 选中的系统ID |
| `systemName` | String | 是 | 长度2-50字符 | - | 插件状态 | 系统显示名称 |
| `systemCategory` | String | 否 | 枚举值（客户/计费/网络/数据/运维/HR） | - | 插件状态 | 系统分类 |
| `confidenceLevel` | String | 是 | 枚举值（不确定/一般/确定） | "一般" | 插件状态 | 用户信心度 |
| `searchKeyword` | String | 否 | 长度0-30字符 | "" | 临时变量 | 搜索关键词 |

### 3.2 模板推荐相关字段

| 字段名称 | 数据类型 | 是否必填 | 验证规则 | 默认值 | 存储位置 | 说明 |
|---------|---------|---------|---------|--------|---------|------|
| `templateType` | String | 是 | 枚举值（Bug反馈/功能优化/新功能开发） | "Bug反馈" | 插件状态 | 需求场景类型 |
| `templateId` | String | 是 | 模板ID格式（如"TPL001"） | "TPL001" | 插件状态 | 模板ID |
| `autoRecommended` | Boolean | 否 | true/false | false | 插件状态 | 是否自动推荐 |
| `recommendConfidence` | Number | 否 | 0-100整数 | 0 | 插件状态 | 推荐置信度 |

### 3.3 需求内容相关字段

| 字段名称 | 数据类型 | 是否必填 | 验证规则 | 默认值 | 存储位置 | 说明 |
|---------|---------|---------|---------|--------|---------|------|
| `title` | String | 是 | 长度10-100字符 | "" | 插件状态 | 需求标题 |
| `background` | String | 是 | 长度50-500字符 | "" | 插件状态 | 需求背景（问题描述） |
| `goal` | String | 是 | 长度20-300字符 | "" | 插件状态 | 需求目标（预期效果） |
| `scenario` | String | 是 | 长度30-400字符 | "" | 插件状态 | 使用场景（谁在什么时候用） |
| `acceptance` | String | 是 | 长度20-300字符 | "" | 插件状态 | 验收标准（如何判断解决） |
| `attachment` | Array | 否 | 文件列表 | [] | 插件状态 | 附件文件（截图等） |
| `priority` | String | 否 | 枚举值（P0/P1/P2） | "P1" | 插件状态 | 需求优先级 |

### 3.4 质量检测相关字段

| 字段名称 | 数据类型 | 是否必填 | 验证规则 | 默认值 | 存储位置 | 说明 |
|---------|---------|---------|---------|--------|---------|------|
| `qualityScore` | Number | 否 | 0-100整数 | 0 | 计算字段 | 需求质量评分 |
| `qualityLevel` | String | 否 | 枚举值（差<60/中60-80/优>80） | "差" | 计算字段 | 质量等级 |
| `starRating` | Number | 否 | 0-5整数 | 0 | 计算字段 | 星级评价 |
| `missingFields` | Array | 否 | 字符串数组 | [] | 计算字段 | 缺失字段列表 |
| `detectionRules` | Object | 否 | JSON对象 | {} | 计算字段 | 检测规则详情 |

**质量评分算法规则**:

```javascript
qualityScore = (
  字数评分(30%) +
  结构化评分(25%) +
  关键词评分(20%) +
  场景描述评分(15%) +
  验收标准评分(10%)
)

// 详细规则
字数评分 = {
  background: 字数>=50 ? 30分 : 字数*0.6,
  goal: 字数>=20 ? 25分 : 字数*1.25,
  scenario: 字数>=30 ? 25分 : 字数*0.83,
  acceptance: 字数>=20 ? 20分 : 字数*1.0
}

结构化评分 = {
  四个字段都填写: 25分,
  缺1个: 18分,
  缺2个: 10分,
  缺3个: 3分,
  全空: 0分
}

关键词评分 = {
  包含场景词(如"客服"/"查询"): +5分,
  包含量化词(如"100+客户"/"5秒"): +5分,
  包含问题词(如"卡顿"/"报错"): +5分,
  包含目标词(如"提升"/"降低"): +5分
}
```

### 3.5 历史记录/草稿相关字段

| 字段名称 | 数据类型 | 是否必填 | 验证规则 | 默认值 | 存储位置 | 说明 |
|---------|---------|---------|---------|--------|---------|------|
| `draftId` | String | 是 | UUID格式 | - | LocalStorage | 草稿唯一ID |
| `createTime` | Timestamp | 是 | ISO 8601格式 | - | LocalStorage | 创建时间 |
| `updateTime` | Timestamp | 是 | ISO 8601格式 | - | LocalStorage | 最后修改时间 |
| `status` | String | 是 | 枚举值（草稿/已提交） | "草稿" | LocalStorage | 记录状态 |
| `content` | Object | 是 | JSON对象 | {} | LocalStorage | 完整需求内容 |
| `autoSaved` | Boolean | 否 | true/false | false | LocalStorage | 是否自动保存 |

**LocalStorage存储结构**:

```json
{
  "itsm_drafts": [
    {
      "draftId": "uuid-xxxx-xxxx",
      "createTime": "2025-12-08T10:30:00Z",
      "updateTime": "2025-12-08T10:35:00Z",
      "status": "草稿",
      "content": {
        "systemId": "SYS001",
        "systemName": "CRM客户管理系统",
        "templateType": "Bug反馈",
        "title": "客户查询响应慢",
        "background": "...",
        "goal": "...",
        "scenario": "...",
        "acceptance": "..."
      },
      "autoSaved": true
    }
  ],
  "itsm_history": [
    {
      "draftId": "uuid-yyyy-yyyy",
      "createTime": "2025-12-07T14:20:00Z",
      "updateTime": "2025-12-07T14:25:00Z",
      "status": "已提交",
      "content": { /* ... */ },
      "submittedToITSM": true,
      "itsmTicketId": "REQ20251207001"
    }
  ]
}
```

### 3.6 系统分类数据结构

| 字段名称 | 数据类型 | 是否必填 | 验证规则 | 默认值 | 存储位置 | 说明 |
|---------|---------|---------|---------|--------|---------|------|
| `categoryId` | String | 是 | 分类ID格式（如"CAT001"） | - | 静态配置 | 分类ID |
| `categoryName` | String | 是 | 长度2-20字符 | - | 静态配置 | 分类名称 |
| `categoryIcon` | String | 是 | emoji或图标类名 | - | 静态配置 | 分类图标 |
| `systems` | Array | 是 | 系统对象数组 | [] | 静态配置 | 该分类下的系统列表 |

**系统数据结构**:

```json
{
  "categories": [
    {
      "categoryId": "CAT001",
      "categoryName": "客户类",
      "categoryIcon": "👥",
      "systems": [
        {
          "systemId": "SYS001",
          "systemName": "CRM客户管理系统V2.0",
          "displayName": "CRM客户管理",
          "keywords": ["CRM", "客户", "客管", "kehu", "kh"],
          "description": "客户信息管理、查询、统计"
        },
        {
          "systemId": "SYS002",
          "systemName": "客户服务工单系统",
          "displayName": "客服工单",
          "keywords": ["客服", "工单", "kefu", "gongdan"],
          "description": "客户投诉、咨询工单处理"
        }
      ]
    },
    {
      "categoryId": "CAT002",
      "categoryName": "计费类",
      "categoryIcon": "💰",
      "systems": [ /* ... */ ]
    }
  ]
}
```

### 3.7 示例库数据结构

| 字段名称 | 数据类型 | 是否必填 | 验证规则 | 默认值 | 存储位置 | 说明 |
|---------|---------|---------|---------|--------|---------|------|
| `exampleId` | String | 是 | 示例ID格式（如"EX001"） | - | 静态配置 | 示例ID |
| `exampleTitle` | String | 是 | 长度10-50字符 | - | 静态配置 | 示例标题 |
| `templateType` | String | 是 | 枚举值（Bug反馈/功能优化/新功能开发） | - | 静态配置 | 适用场景 |
| `systemCategory` | String | 否 | 枚举值（客户/计费/网络等） | - | 静态配置 | 适用系统类别 |
| `qualityScore` | Number | 是 | 80-100整数 | - | 静态配置 | 示例质量评分 |
| `content` | Object | 是 | JSON对象 | - | 静态配置 | 示例完整内容 |

**示例库数据结构**:

```json
{
  "examples": [
    {
      "exampleId": "EX001",
      "exampleTitle": "CRM客户查询响应慢",
      "templateType": "Bug反馈",
      "systemCategory": "客户类",
      "qualityScore": 95,
      "content": {
        "title": "CRM客户管理系统-客户信息查询响应时间过长",
        "background": "客服人员在处理客户咨询时，使用CRM系统查询客户历史订单信息，系统响应时间平均5-8秒，高峰期甚至超过10秒。客户需要等待较长时间，影响服务体验，投诉率上升15%。",
        "goal": "优化查询性能，使客户信息查询的P95响应时间从当前5秒降低至1秒以内，提升客服工作效率和客户满意度。",
        "scenario": "客服专员在工作日9:00-18:00处理客户电话咨询时，需要快速查询客户基本信息、历史订单、服务记录等，日均查询量约2000次，高峰期并发查询100+。",
        "acceptance": "1. P95响应时间<1秒（当前5秒）\n2. P99响应时间<2秒（当前8秒）\n3. 并发100查询时系统不卡顿\n4. 客户投诉率下降至5%以下"
      }
    },
    {
      "exampleId": "EX002",
      "exampleTitle": "工单系统批量导出功能",
      "templateType": "新功能开发",
      "systemCategory": "客户类",
      "qualityScore": 92,
      "content": { /* ... */ }
    }
  ]
}
```

---

## 第4章：交互流程与状态管理

### 4.1 核心交互流程

#### 流程1：系统选择流程

```
用户进入ITSM页面
    ↓
侧边栏自动展开（默认状态）
    ↓
用户输入关键词（如"CRM"）
    ↓
【F8智能搜索】实时匹配系统列表
    ↓
用户点击选中系统
    ↓
【F9信心度反馈】弹出询问："是否确定选择CRM客户管理系统？"
    ├─ 用户选择"确定" → 进入表单填写
    ├─ 用户选择"一般" → 显示提示："可以先填写，提交前可修改"
    └─ 用户选择"不确定" → 推荐"浏览分类"或"查看该系统说明"
```

#### 流程2：需求填写流程

```
用户选择系统后
    ↓
输入需求标题（如"客户查询很慢"）
    ↓
【F4智能模板推荐】分析关键词"慢" → 推荐"Bug反馈"模板
    ↓
用户点击"应用模板"
    ↓
【F5结构化引导】展示4个引导字段：
  - 需求背景（为什么要做？遇到了什么问题？）
  - 需求目标（做了之后要达到什么效果？）
  - 使用场景（谁在什么时候会用到？）
  - 验收标准（怎么判断问题解决了？）
    ↓
用户填写内容
    ↓
【F1实时完整性检测】每输入50字触发一次检测
  - 检测到"背景"字段空 → 高亮提示"建议补充需求背景"
  - 检测到"验收标准"缺少量化指标 → 提示"建议添加具体数字"
    ↓
用户继续填写
    ↓
【F2质量评分】实时刷新评分（如75分 ⭐⭐⭐⭐）
    ↓
用户点击"查看示例"
    ↓
跳转到【需求示例库页】
    ↓
用户选择示例"CRM客户查询响应慢"
    ↓
点击"应用此示例" → 内容填充到表单
    ↓
【F2质量评分】更新为95分 ⭐⭐⭐⭐⭐
```

#### 流程3：提交前检测流程

```
用户点击"填充到ITSM"按钮
    ↓
【F3提交前缺失警告】检测质量评分
    ├─ 质量≥60分 → 直接填充到ITSM页面
    └─ 质量<60分 → 弹窗警告
          ↓
        "当前需求质量评分45分，建议补充以下信息：
         - 需求背景缺失
         - 验收标准过于简单
         是否继续提交？"
          ├─ 用户点击"继续提交" → 填充到ITSM
          └─ 用户点击"返回修改" → 关闭弹窗，高亮缺失项
```

### 4.2 状态管理结构

```javascript
// 插件全局状态
const state = {
  // 系统选择状态
  systemSelection: {
    selectedSystem: null,      // 当前选中的系统对象
    confidenceLevel: '一般',   // 用户信心度
    searchKeyword: '',         // 搜索关键词
    searchResults: []          // 搜索结果列表
  },
  
  // 模板推荐状态
  templateRecommendation: {
    currentTemplate: null,     // 当前应用的模板
    recommendedTemplate: null, // 智能推荐的模板
    autoRecommended: false     // 是否自动推荐
  },
  
  // 表单内容状态
  formContent: {
    title: '',                 // 需求标题
    background: '',            // 需求背景
    goal: '',                  // 需求目标
    scenario: '',              // 使用场景
    acceptance: '',            // 验收标准
    attachment: []             // 附件列表
  },
  
  // 质量检测状态
  qualityDetection: {
    score: 0,                  // 质量评分0-100
    level: '差',               // 质量等级
    starRating: 0,             // 星级0-5
    missingFields: [],         // 缺失字段列表
    suggestions: []            // 改进建议列表
  },
  
  // UI状态
  ui: {
    currentPage: 'main',       // 当前页面（main/category/examples/diagnosis）
    sidebarVisible: true,      // 侧边栏是否可见
    warningDialogVisible: false, // 警告弹窗是否显示
    exampleDetailVisible: false  // 示例详情是否展开
  },
  
  // 历史记录/草稿状态
  storage: {
    drafts: [],                // 草稿列表
    history: []                // 历史记录列表
  }
}
```

---

## 第5章：视觉设计规范

### 5.1 色彩体系

| 用途 | 色值 | 应用场景 |
|------|------|---------|
| **主色调** | `#1890ff` | 主操作按钮、链接、选中状态 |
| **成功色** | `#52c41a` | 质量评分>80、成功提示 |
| **警告色** | `#faad14` | 质量评分60-80、一般提示 |
| **错误色** | `#f5222d` | 质量评分<60、缺失警告 |
| **背景色** | `#f5f5f5` | 侧边栏背景 |
| **卡片背景** | `#ffffff` | 卡片组件背景 |
| **文字主色** | `#262626` | 标题、正文 |
| **文字次色** | `#8c8c8c` | 辅助文字、提示 |
| **边框色** | `#d9d9d9` | 分割线、输入框边框 |

### 5.2 字体规范

| 元素类型 | 字体大小 | 字重 | 行高 |
|---------|---------|------|------|
| 大标题 | 20px | 600 | 28px |
| 页面标题 | 16px | 600 | 24px |
| 卡片标题 | 14px | 600 | 22px |
| 正文 | 14px | 400 | 22px |
| 辅助文字 | 12px | 400 | 20px |
| 按钮文字 | 14px | 500 | 22px |

### 5.3 间距规范

| 间距类型 | 数值 | 应用场景 |
|---------|------|---------|
| 特小间距 | 4px | 图标与文字间距 |
| 小间距 | 8px | 表单字段内边距 |
| 中间距 | 16px | 卡片内边距、区块间距 |
| 大间距 | 24px | 页面内边距、区块组间距 |
| 特大间距 | 32px | 页面顶部/底部边距 |

### 5.4 组件尺寸规范

| 组件类型 | 高度 | 圆角 | 边框 |
|---------|------|------|------|
| 主按钮 | 36px | 4px | 无 |
| 次要按钮 | 32px | 4px | 1px solid |
| 文本输入框 | 36px | 4px | 1px solid |
| 多行文本框 | 80px | 4px | 1px solid |
| 卡片 | 自适应 | 8px | 1px solid |
| 标签 | 24px | 12px | 无 |

---

## 第6章：技术实现要点

### 6.1 核心技术栈

| 技术类别 | 技术选型 | 用途 |
|---------|---------|------|
| **浏览器插件框架** | Chrome Extension Manifest V3 | 插件基础框架 |
| **前端框架** | Vue 3 + Composition API | 侧边栏UI开发 |
| **状态管理** | Pinia | 全局状态管理 |
| **UI组件库** | Ant Design Vue | 基础组件 |
| **数据存储** | LocalStorage | 草稿/历史记录存储 |
| **LLM接口** | DeepSeek API / 通义千问API | 智能推荐、质量检测 |

### 6.2 关键技术实现

#### 6.2.1 ITSM页面DOM访问

```javascript
// content-script.js
// 检测ITSM页面DOM元素
const itsmFormFields = {
  systemSelect: document.querySelector('#system-select'),
  titleInput: document.querySelector('#requirement-title'),
  descriptionTextarea: document.querySelector('#requirement-description')
}

// 一键填充功能
function fillITSMForm(formData) {
  // 填充系统选择
  itsmFormFields.systemSelect.value = formData.systemId
  itsmFormFields.systemSelect.dispatchEvent(new Event('change'))
  
  // 填充需求标题
  itsmFormFields.titleInput.value = formData.title
  
  // 填充需求描述（组合结构化字段）
  const description = `
【需求背景】
${formData.background}

【需求目标】
${formData.goal}

【使用场景】
${formData.scenario}

【验收标准】
${formData.acceptance}
  `.trim()
  
  itsmFormFields.descriptionTextarea.value = description
}
```

#### 6.2.2 智能搜索算法

```javascript
// 系统搜索算法
function searchSystems(keyword) {
  const results = systemDatabase.flatMap(category => 
    category.systems.filter(system => {
      const matchName = system.displayName.includes(keyword)
      const matchKeywords = system.keywords.some(kw => kw.includes(keyword))
      const matchPinyin = pinyinMatch(system.keywords, keyword) // 拼音匹配
      
      return matchName || matchKeywords || matchPinyin
    })
  )
  
  // 按匹配度排序
  return results.sort((a, b) => {
    const scoreA = calculateMatchScore(a, keyword)
    const scoreB = calculateMatchScore(b, keyword)
    return scoreB - scoreA
  })
}

// 匹配度评分
function calculateMatchScore(system, keyword) {
  let score = 0
  if (system.displayName === keyword) score += 100 // 完全匹配
  if (system.displayName.startsWith(keyword)) score += 50 // 前缀匹配
  if (system.displayName.includes(keyword)) score += 30 // 包含匹配
  if (system.keywords.includes(keyword)) score += 20 // 关键词匹配
  return score
}
```

#### 6.2.3 质量评分算法实现

```javascript
// 质量评分计算
function calculateQualityScore(formContent) {
  let score = 0
  
  // 1. 字数评分（30分）
  const wordCountScore = {
    background: Math.min(formContent.background.length * 0.6, 30),
    goal: Math.min(formContent.goal.length * 1.25, 25),
    scenario: Math.min(formContent.scenario.length * 0.83, 25),
    acceptance: Math.min(formContent.acceptance.length, 20)
  }
  score += Object.values(wordCountScore).reduce((a, b) => a + b, 0)
  
  // 2. 结构化评分（25分）
  const filledFields = [
    formContent.background,
    formContent.goal,
    formContent.scenario,
    formContent.acceptance
  ].filter(field => field.trim().length > 0)
  
  const structureScore = {
    4: 25, 3: 18, 2: 10, 1: 3, 0: 0
  }[filledFields.length]
  score += structureScore
  
  // 3. 关键词评分（20分）
  const keywordScore = detectKeywords(formContent)
  score += keywordScore
  
  // 4. 场景描述评分（15分）
  const scenarioScore = evaluateScenario(formContent.scenario)
  score += scenarioScore
  
  // 5. 验收标准评分（10分）
  const acceptanceScore = evaluateAcceptance(formContent.acceptance)
  score += acceptanceScore
  
  return Math.min(Math.round(score), 100)
}

// 关键词检测
function detectKeywords(content) {
  let score = 0
  const allText = Object.values(content).join(' ')
  
  // 场景词
  if (/客服|用户|客户|员工|管理员/.test(allText)) score += 5
  // 量化词
  if (/\d+[秒分钟小时天]|\d+%|P\d+/.test(allText)) score += 5
  // 问题词
  if (/卡顿|慢|报错|失败|异常|问题/.test(allText)) score += 5
  // 目标词
  if (/提升|降低|优化|改进|增加|减少/.test(allText)) score += 5
  
  return score
}
```

#### 6.2.4 模板智能推荐

```javascript
// 模板推荐算法
function recommendTemplate(title) {
  const bugKeywords = ['慢', '卡', '报错', '失败', '异常', '问题', 'Bug', 'bug']
  const optimizeKeywords = ['优化', '改进', '提升', '增强', '升级']
  const featureKeywords = ['新增', '开发', '功能', '需要', '希望']
  
  if (bugKeywords.some(kw => title.includes(kw))) {
    return {
      type: 'Bug反馈',
      confidence: 85,
      reason: '标题包含问题描述关键词'
    }
  }
  
  if (optimizeKeywords.some(kw => title.includes(kw))) {
    return {
      type: '功能优化',
      confidence: 80,
      reason: '标题包含优化类关键词'
    }
  }
  
  if (featureKeywords.some(kw => title.includes(kw))) {
    return {
      type: '新功能开发',
      confidence: 75,
      reason: '标题包含新功能类关键词'
    }
  }
  
  return {
    type: 'Bug反馈', // 默认
    confidence: 50,
    reason: '未识别明确场景，使用默认模板'
  }
}
```

### 6.3 数据持久化方案

```javascript
// LocalStorage数据结构
const storageKeys = {
  DRAFTS: 'itsm_assistant_drafts',
  HISTORY: 'itsm_assistant_history',
  SETTINGS: 'itsm_assistant_settings'
}

// 保存草稿
function saveDraft(formContent) {
  const drafts = JSON.parse(localStorage.getItem(storageKeys.DRAFTS) || '[]')
  
  const draft = {
    draftId: generateUUID(),
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
    status: '草稿',
    content: formContent,
    autoSaved: true
  }
  
  drafts.push(draft)
  localStorage.setItem(storageKeys.DRAFTS, JSON.stringify(drafts))
}

// 自动保存（防抖）
const autoSave = debounce((formContent) => {
  saveDraft(formContent)
}, 3000) // 3秒无操作后自动保存
```

---

## 第7章：完成检查清单

### 7.1 设计元素完整性检查

- [x] **页面结构分析**
  - [x] 列出6个核心页面（主界面/分类导航/示例库/诊断详情/历史记录/草稿）
  - [x] 定义页面层级关系
  - [x] 明确页面尺寸与布局规范

- [x] **UI组件清单**
  - [x] 主界面组件（30+组件）
  - [x] 分类导航页组件
  - [x] 示例库页组件
  - [x] 诊断详情页组件
  - [x] 历史/草稿页组件

- [x] **数据字段定义**
  - [x] 系统选择字段（5个）
  - [x] 模板推荐字段（4个）
  - [x] 需求内容字段（7个）
  - [x] 质量检测字段（5个）
  - [x] 历史/草稿字段（6个）
  - [x] 系统分类数据结构
  - [x] 示例库数据结构
  - [x] 质量评分算法规则

### 7.2 设计质量检查

- [x] **可追溯性**
  - [x] 所有设计元素都能追溯到用户故事（US-001至US-010）
  - [x] 所有组件都能追溯到用户旅程关键时刻（MOT1-MOT4）

- [x] **完整性**
  - [x] 覆盖用户旅程的所有关键阶段（进入系统→选择系统→填写内容→提交前检查）
  - [x] 包含所有P0功能的设计元素（F1-F9）

- [x] **可实施性**
  - [x] 所有字段定义包含数据类型和验证规则
  - [x] 所有组件定义包含交互行为
  - [x] 提供技术实现要点和代码示例

### 7.3 与用户故事的映射关系

| 用户故事 | 相关页面 | 相关组件 | 相关字段 |
|---------|---------|---------|---------|
| US-001 系统智能搜索 | 主界面/分类导航页 | 搜索框、匹配列表、分类卡片 | systemId, systemName, searchKeyword |
| US-002 信心度反馈 | 主界面 | 信心度按钮组 | confidenceLevel |
| US-003 智能模板推荐 | 主界面 | 模板推荐卡、场景标签 | templateType, autoRecommended |
| US-004 结构化引导 | 主界面 | 四个引导字段、提示标签 | background, goal, scenario, acceptance |
| US-005 实时检测 | 主界面 | 警告提示条、缺失项列表 | missingFields, qualityScore |
| US-006 需求示例库 | 示例库页 | 示例卡片、详情面板 | exampleId, exampleTitle, content |
| US-007 质量评分 | 主界面/诊断详情页 | 评分卡、进度条、雷达图 | qualityScore, starRating, qualityLevel |
| US-008 提交前警告 | 主界面 | 警告弹窗 | qualityScore, missingFields |
| US-009 一键填充 | 主界面 | "填充到ITSM"按钮 | 所有表单字段 |
| US-010 系统分类导航 | 分类导航页 | 分类卡片、系统列表 | categoryId, categoryName, systems |

---

## 第8章：下一步行动建议

基于本设计元素分析，建议按以下顺序进行后续设计工作：

### Day 2 上午：交互设计

- [ ] 使用B6-任务2提示词，生成完整的交互流程图（PlantUML格式）
- [ ] 定义所有交互场景的反馈设计（提示文案、样式、持续时间）
- [ ] 绘制状态转换图（页面切换逻辑）

### Day 2 下午：原型设计

- [ ] 使用B6-任务3提示词，生成侧边栏主界面HTML原型
- [ ] 生成系统分类导航页HTML原型
- [ ] 生成需求示例库页HTML原型

### Day 3：原型测试与迭代

- [ ] 与用户进行原型测试（李经理、小王等典型用户）
- [ ] 收集反馈并优化设计
- [ ] 生成最终版原型交付开发团队

---

## 📊 附录：设计元素统计

| 类别 | 数量 | 说明 |
|------|------|------|
| **页面** | 6个 | 主界面、分类导航、示例库、诊断详情、历史记录、草稿 |
| **UI组件** | 50+ | 涵盖输入、按钮、卡片、列表、图表等 |
| **数据字段** | 30+ | 包含系统选择、模板、表单内容、质量检测等 |
| **交互流程** | 3个核心流程 | 系统选择、需求填写、提交前检测 |
| **质量评分规则** | 5维度评分 | 字数、结构、关键词、场景、验收 |
| **示例案例** | 2+个 | 每个模板至少2个高质量案例 |
| **系统分类** | 6大类 | 客户、计费、网络、数据、运维、HR |

---

**✅ 设计元素分析完成！本报告已提取所有核心设计元素，可直接用于交互设计和原型开发。**
