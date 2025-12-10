# ITSM智能辅助浏览器插件 - 任务详细验收标准

> **📌 文档说明**: 本文档为迭代计划中每个任务提供详细的验收标准，作为开发者完成任务的质量把关清单
>
> **使用方式**: 每完成一个任务，逐项检查验收标准，全部通过后才能继续下一个任务  
> **更新日期**: 2025年12月10日

---

## 📋 目录

- [任务组1: 环境搭建与基础设施](#任务组1-环境搭建与基础设施)
- [任务组2: Sidebar UI表示层](#任务组2-sidebar-ui表示层)
- [任务组3: Content Script DOM操作层](#任务组3-content-script-dom操作层)
- [任务组4: Background业务逻辑层](#任务组4-background业务逻辑层)
- [任务组5: 集成测试与调试](#任务组5-集成测试与调试)
- [任务组6-8: US-002相关任务](#任务组6-8-us-002相关任务)

---

## 任务组1: 环境搭建与基础设施

### T1.1 - 项目初始化与构建配置

#### 功能验收标准

- [ ] ✅ `npm run dev` 启动成功，无报错信息
- [ ] ✅ Chrome浏览器加载扩展成功，扩展图标显示在工具栏
- [ ] ✅ Sidebar页面正常打开（空白页面即可，无需功能）
- [ ] ✅ 控制台无红色错误信息

#### 代码质量标准

- [ ] ✅ manifest.json包含必需字段：
  - `name`: "ITSM智能辅助插件"
  - `version`: "1.0.0"
  - `manifest_version`: 3
  - `description`: 简短描述
- [ ] ✅ vite.config.ts配置正确：
  - `build.rollupOptions.input` 包含sidebar.html
  - `build.outDir` 设置为"dist"
- [ ] ✅ package.json包含必需脚本：
  - `"dev": "vite"`
  - `"build": "tsc && vite build"`
  - `"preview": "vite preview"`

#### 文档要求

- [ ] ✅ README.md包含"Quick Start"章节，说明如何安装和运行

#### 验收方法

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. Chrome浏览器加载扩展
# chrome://extensions → 开发者模式 → 加载已解包的扩展程序 → 选择dist目录

# 4. 验证扩展图标显示
```

---

### T1.2 - TypeScript配置与类型定义

#### 功能验收标准

- [ ] ✅ `npm run build` 编译成功，无TS错误
- [ ] ✅ VSCode智能提示正常工作（Ctrl+Space显示提示）
- [ ] ✅ 导入类型无报错：`import { System } from './types/System'`

#### 代码质量标准

- [ ] ✅ **System.ts** 类型定义完整：
  ```typescript
  export interface System {
    id: string;
    name: string;
    keywords: string[];
    pinyin: string[];
    category: string;
    responsibility: string;
    contact: string;
    aliases?: string[];
  }
  ```

- [ ] ✅ **Template.ts** 类型定义完整：
  ```typescript
  export interface Template {
    id: string;
    name: string;
    fields: Field[];
    examples: Example[];
  }
  
  export interface Field {
    id: string;
    label: string;
    placeholder: string;
    required: boolean;
    guidanceQuestion: string;
  }
  ```

- [ ] ✅ **Recommendation.ts** 类型定义：
  ```typescript
  export interface Recommendation {
    system: string;
    confidence: number; // 0-1
    source: 'ai' | 'rule' | 'hybrid';
    reason?: string;
  }
  ```

- [ ] ✅ **tsconfig.json** 配置strict模式：
  ```json
  {
    "compilerOptions": {
      "strict": true,
      "target": "ES2020",
      "module": "ESNext",
      "moduleResolution": "bundler"
    }
  }
  ```

#### 测试验证

```typescript
// 测试类型导入
import { System, Recommendation } from '@/types';

const testSystem: System = {
  id: 'crm',
  name: 'CRM系统',
  keywords: ['客户', 'kehu'],
  pinyin: ['kehu'],
  category: '客户管理',
  responsibility: '销售部-张三',
  contact: 'zhangsan@company.com'
};

// 应该无类型错误
```

---

### T1.3 - systems.json配置数据准备

#### 功能验收标准

- [ ] ✅ 包含≥50个真实ITSM系统
- [ ] ✅ JSON格式验证通过（使用jsonlint或VSCode验证）
- [ ] ✅ 文件大小合理（<500KB）

#### 数据质量标准

- [ ] ✅ 每个系统包含完整字段：
  - `id`: 唯一标识符（如"crm_001"）
  - `name`: 系统名称（如"CRM系统"）
  - `keywords`: 关键词数组≥3个（中文+英文+缩写）
  - `pinyin`: 拼音数组（使用pinyin-pro自动生成）
  - `category`: 系统分类
  - `responsibility`: 负责人
  - `contact`: 联系方式

- [ ] ✅ keywords覆盖常见搜索词：
  - 中文全称："客户关系管理系统"
  - 中文简称："客户管理"、"客户"
  - 英文："CRM", "Customer"
  - 缩写："crm"

- [ ] ✅ pinyin字段使用pinyin-pro生成：
  ```javascript
  import { pinyin } from 'pinyin-pro';
  const pinyinArray = pinyin(systemName, { toneType: 'none', type: 'array' });
  ```

#### 示例验证

```json
{
  "systems": [
    {
      "id": "crm_001",
      "name": "CRM系统",
      "keywords": ["客户", "客户管理", "kehu", "crm", "客户关系"],
      "pinyin": ["kehu", "kehuxitong", "kh"],
      "category": "客户管理",
      "responsibility": "销售部-张三",
      "contact": "zhangsan@company.com",
      "aliases": ["企业资源系统", "CRM"]
    }
  ]
}
```

- [ ] ✅ 至少覆盖5个分类：财务类、客户类、人事类、IT类、运维类

---

### T1.4 - TailwindCSS样式配置

#### 功能验收标准

- [ ] ✅ Tailwind样式类生效（测试：`bg-blue-500 text-white`显示蓝色背景白色文字）
- [ ] ✅ Sidebar基础布局渲染正常（宽度400px，固定右侧）
- [ ] ✅ 响应式断点生效（sm/md/lg）

#### 代码质量标准

- [ ] ✅ **tailwind.config.js** 配置content路径：
  ```javascript
  export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#3B82F6',
          secondary: '#64748B',
          accent: '#F59E0B',
        }
      },
    },
  }
  ```

- [ ] ✅ 引入自定义颜色（primary/secondary/accent）
- [ ] ✅ PostCSS配置正确（autoprefixer插件）

#### 视觉验证

创建测试页面验证样式：

```html
<div class="bg-blue-500 text-white p-4 rounded-lg">
  测试TailwindCSS样式
</div>
```

- [ ] ✅ 显示蓝色背景
- [ ] ✅ 显示白色文字
- [ ] ✅ 圆角8px
- [ ] ✅ 内边距16px

---

### T1.5 - React学习与Hello World

#### 学习验收标准

- [ ] ✅ 理解useState核心概念（状态管理）
- [ ] ✅ 理解useEffect核心概念（副作用处理）
- [ ] ✅ 理解useCallback核心概念（性能优化）
- [ ] ✅ 阅读React官方文档Hooks章节（≥1小时）

#### 代码验收标准

完成TodoList示例，包含以下功能：

- [ ] ✅ 添加todo项功能正常
- [ ] ✅ 删除todo项功能正常
- [ ] ✅ 切换完成状态功能正常
- [ ] ✅ 使用useState管理列表状态
- [ ] ✅ 使用useCallback优化事件处理

#### 示例代码

```typescript
import { useState, useCallback } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = useCallback(() => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  }, [input, todos]);

  const toggleTodo = useCallback((id: number) => {
    setTodos(todos.map(t => t.id === id ? {...t, completed: !t.completed} : t));
  }, [todos]);

  const deleteTodo = useCallback((id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  }, [todos]);

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={() => toggleTodo(todo.id)} 
            />
            <span style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

#### 学习笔记要求

- [ ] ✅ 整理Hooks常见陷阱：
  - 依赖数组的作用
  - 闭包陷阱问题
  - useEffect清理函数
  - useCallback使用场景

---

## 任务组2: Sidebar UI表示层

### T2.1 - SystemSearchInput组件

#### 功能验收标准

- [ ] ✅ 支持中文输入显示正常（测试："客户管理"）
- [ ] ✅ 支持英文输入显示正常（测试："CRM"）
- [ ] ✅ 支持拼音输入显示正常（测试："kehu"）

#### 性能验收标准

- [ ] ✅ 防抖300ms生效（快速输入不触发搜索）
- [ ] ✅ 连续输入停止300ms后触发一次搜索
- [ ] ✅ 测试方法：
  ```typescript
  // 快速输入"客户管理"5个字
  // 应该只触发1次搜索（300ms后）
  ```

#### UI验收标准

- [ ] ✅ 显示搜索图标（🔍）
- [ ] ✅ placeholder提示："搜索系统（支持中文/拼音）"
- [ ] ✅ focus状态显示蓝色边框（border-blue-500）
- [ ] ✅ 输入框高度44px，圆角8px

#### 代码质量标准

- [ ] ✅ 使用lodash.debounce实现防抖：
  ```typescript
  import { debounce } from 'lodash-es';
  
  const debouncedSearch = useMemo(
    () => debounce((query: string) => {
      onSearch(query);
    }, 300),
    [onSearch]
  );
  ```

- [ ] ✅ onChange事件触发父组件回调

---

### T2.2 - SystemResultList组件

#### 功能验收标准

- [ ] ✅ 显示Top3推荐结果（按置信度降序）
- [ ] ✅ 每条结果显示：系统名称 + 置信度百分比（如"85%"）
- [ ] ✅ 显示推荐来源图标（🤖 AI / 📊 规则）

#### 交互验收标准

- [ ] ✅ 鼠标hover显示阴影效果（shadow-lg）
- [ ] ✅ 点击结果触发选择事件
- [ ] ✅ 选中项显示蓝色背景（bg-blue-50）

#### UI验收标准

- [ ] ✅ 无结果时显示："未找到匹配系统"
- [ ] ✅ loading状态显示骨架屏（3个灰色占位块）
- [ ] ✅ 置信度颜色：
  - ≥80%绿色（text-green-600）
  - 60-80%黄色（text-yellow-600）
  - <60%红色（text-red-600）

#### 数据验证

测试数据：

```typescript
const mockResults = [
  { system: "CRM系统", confidence: 0.92, source: "ai" },
  { system: "客户服务系统", confidence: 0.75, source: "rule" },
  { system: "客户数据平台", confidence: 0.58, source: "rule" }
];
```

- [ ] ✅ 第1项显示："CRM系统 92% 🤖"
- [ ] ✅ 第2项显示："客户服务系统 75% 📊"
- [ ] ✅ 第3项显示："客户数据平台 58% 📊"

---

### T2.3 - SystemSearchPanel容器

#### 功能验收标准

- [ ] ✅ 集成T2.1和T2.2组件，布局正确
- [ ] ✅ 状态管理：idle/loading/success/error
- [ ] ✅ loading状态显示加载动画（spinner）
- [ ] ✅ error状态显示错误提示 + 重试按钮

#### 交互验收标准

- [ ] ✅ 输入搜索词→loading→显示结果流程顺畅
- [ ] ✅ 点击结果→触发选择事件
- [ ] ✅ ESC键清空搜索框

#### UI验收标准

- [ ] ✅ 面板宽度400px，高度自适应
- [ ] ✅ 内边距16px，外边距8px
- [ ] ✅ 圆角8px，阴影效果（shadow-md）

#### 错误处理验收

- [ ] ✅ 网络错误提示："网络不稳定，已切换到基础搜索"
- [ ] ✅ API超时提示："AI推荐超时，使用规则引擎结果"
- [ ] ✅ 点击"重试"按钮重新发起请求

---

### T2.4 - Zustand状态管理集成

#### 功能验收标准

- [ ] ✅ 创建全局store：useRecommendationStore
- [ ] ✅ 状态字段：queryText/results/loading/error
- [ ] ✅ 动作方法：setQuery/setResults/setLoading/setError

#### 代码验收标准

文件：`src/store/recommendationStore.ts`

```typescript
import { create } from 'zustand';
import { Recommendation } from '@/types';

interface RecommendationState {
  queryText: string;
  results: Recommendation[];
  loading: boolean;
  error: string | null;
  
  setQuery: (query: string) => void;
  setResults: (results: Recommendation[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useRecommendationStore = create<RecommendationState>((set) => ({
  queryText: '',
  results: [],
  loading: false,
  error: null,
  
  setQuery: (query) => set({ queryText: query }),
  setResults: (results) => set({ results, loading: false }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error, loading: false }),
  reset: () => set({ queryText: '', results: [], loading: false, error: null }),
}));
```

#### 测试验证

- [ ] ✅ 在T2.3组件中使用：
  ```typescript
  const { results, setResults } = useRecommendationStore();
  ```

- [ ] ✅ 多组件状态同步（测试：创建2个读取store的组件）

#### 性能验证

- [ ] ✅ 使用shallow比较避免不必要重渲染：
  ```typescript
  import { shallow } from 'zustand/shallow';
  
  const { results, loading } = useRecommendationStore(
    state => ({ results: state.results, loading: state.loading }),
    shallow
  );
  ```

---

### T2.5 - Sidebar↔Background通信

#### 功能验收标准

- [ ] ✅ Sidebar发送搜索请求到Background
- [ ] ✅ Background返回Top3推荐结果
- [ ] ✅ 消息格式：`{type: "SEARCH_SYSTEM", payload: {query: "CRM"}}`

#### 代码验收标准

```typescript
// Sidebar发送消息
async function searchSystem(query: string): Promise<Recommendation[]> {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      { type: "SEARCH_SYSTEM", payload: { query } },
      (response) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve(response.results);
        }
      }
    );
    
    // 超时5秒
    setTimeout(() => reject(new Error("Request timeout")), 5000);
  });
}

// Background监听消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SEARCH_SYSTEM") {
    systemRecommender.recommend(message.payload.query)
      .then(results => sendResponse({ results }))
      .catch(error => sendResponse({ error: error.message }));
    return true; // 异步响应
  }
});
```

#### 测试验证

- [ ] ✅ 发送mock请求，控制台打印日志：
  ```typescript
  console.log("Sending search request:", query);
  ```

- [ ] ✅ Background返回mock数据：
  ```typescript
  const mockResults = [{ system: "CRM", confidence: 0.9, source: "rule" }];
  ```

- [ ] ✅ 超时5秒自动reject

#### 错误处理

- [ ] ✅ Background未响应提示："后台服务未启动"
- [ ] ✅ 网络错误提示："通信失败，请重试"

---

### T2.6 - TailwindCSS响应式样式

#### UI验收标准

- [ ] ✅ 整体风格清新简洁（白色背景+蓝色主色）
- [ ] ✅ 搜索框圆角8px，阴影效果
- [ ] ✅ 结果列表项hover效果（背景变化+阴影）

#### 响应式验收

- [ ] ✅ 1920px屏幕：Sidebar宽度400px
- [ ] ✅ 1366px屏幕：Sidebar宽度350px
- [ ] ✅ 移动端隐藏（屏幕<768px）

#### 颜色系统

- [ ] ✅ 主色：#3B82F6（blue-500）
- [ ] ✅ 文字：#1F2937（gray-800）
- [ ] ✅ 边框：#E5E7EB（gray-200）
- [ ] ✅ 成功：#10B981（green-500）
- [ ] ✅ 警告：#F59E0B（yellow-500）
- [ ] ✅ 错误：#EF4444（red-500）

#### 交互反馈

- [ ] ✅ 按钮hover透明度变化（opacity-90）
- [ ] ✅ 输入框focus蓝色边框（ring-2 ring-blue-500）
- [ ] ✅ 加载动画（animate-spin）

---

## 任务组3: Content Script DOM操作层

### T3.1 - DOM选择器封装

#### 功能验收标准

- [ ] ✅ 准确定位系统下拉框（CSS选择器：`#systemSelect` 或 `select[name="system"]`）
- [ ] ✅ 准确定位需求描述框（`#descriptionTextarea`）
- [ ] ✅ 定位提交按钮（`#submitBtn`）

#### 兼容性验收

- [ ] ✅ ITSM v1.0页面结构定位成功
- [ ] ✅ ITSM v2.0页面结构定位成功（如果有多版本）
- [ ] ✅ 选择器未匹配时返回null，不抛异常

#### 代码验收

文件：`src/content/dom-manipulator.ts`

```typescript
export class DOMManipulator {
  // 使用多选择器降级策略
  static getSystemSelect(): HTMLSelectElement | null {
    const selectors = [
      '#systemSelect',
      'select[name="system"]',
      'select[aria-label="系统选择"]'
    ];
    
    for (const selector of selectors) {
      const element = document.querySelector<HTMLSelectElement>(selector);
      if (element) return element;
    }
    
    console.warn('System select not found');
    return null;
  }
  
  static getDescriptionArea(): HTMLTextAreaElement | null {
    const selectors = [
      '#descriptionTextarea',
      'textarea[name="description"]'
    ];
    
    for (const selector of selectors) {
      const element = document.querySelector<HTMLTextAreaElement>(selector);
      if (element) return element;
    }
    
    return null;
  }
  
  static getSubmitButton(): HTMLButtonElement | null {
    const selectors = [
      '#submitBtn',
      'button[type="submit"]'
    ];
    
    for (const selector of selectors) {
      const element = document.querySelector<HTMLButtonElement>(selector);
      if (element) return element;
    }
    
    return null;
  }
}
```

#### 测试验证

在ITSM测试页控制台运行：

```javascript
// 应该返回非null值
const select = DOMManipulator.getSystemSelect();
console.log('System Select:', select);
```

---

### T3.2 - 系统下拉框自动填充

#### 功能验收标准

- [ ] ✅ 设置下拉框value为指定系统名
- [ ] ✅ 触发change事件（`new Event('change', {bubbles: true})`）
- [ ] ✅ 触发input事件（兼容React表单）

#### 测试验收

- [ ] ✅ 调用`fillSystemSelect("CRM系统")`后，下拉框显示"CRM系统"
- [ ] ✅ ITSM页面监听到change事件（控制台打印日志）
- [ ] ✅ 填充后下拉框背景变绿色（表示已选择）

#### 代码验收

```typescript
export function fillSystemSelect(systemName: string): boolean {
  const select = DOMManipulator.getSystemSelect();
  if (!select) {
    throw new Error('System select element not found');
  }
  
  // 查找匹配的option
  const option = Array.from(select.options).find(
    opt => opt.text === systemName || opt.value === systemName
  );
  
  if (!option) {
    console.error(`System "${systemName}" not found in options`);
    return false;
  }
  
  // 使用Object.getOwnPropertyDescriptor设置value（解决React表单问题）
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    HTMLSelectElement.prototype,
    'value'
  )?.set;
  
  if (nativeInputValueSetter) {
    nativeInputValueSetter.call(select, option.value);
  } else {
    select.value = option.value;
  }
  
  // 触发事件
  select.dispatchEvent(new Event('change', { bubbles: true }));
  select.dispatchEvent(new Event('input', { bubbles: true }));
  
  // 添加视觉反馈
  select.style.backgroundColor = '#D1FAE5'; // 淡绿色
  
  return true;
}
```

#### 错误处理

- [ ] ✅ 系统名不存在时返回false
- [ ] ✅ 下拉框未找到时抛异常

---

### T3.3 - Sidebar↔ITSM通信桥

#### 功能验收标准

- [ ] ✅ Content Script监听来自Sidebar的消息
- [ ] ✅ 消息类型：FILL_SYSTEM / GET_CURRENT_SYSTEM
- [ ] ✅ 返回填充结果：`{success: true, system: "CRM"}`

#### 测试验收

- [ ] ✅ Sidebar发送`{type: "FILL_SYSTEM", system: "CRM"}`
- [ ] ✅ Content Script接收并执行填充
- [ ] ✅ 返回`{success: true}`给Sidebar

#### 代码验收

文件：`src/content/event-bridge.ts`

```typescript
// 监听来自Sidebar的消息
window.addEventListener('message', (event) => {
  // 安全校验
  if (event.source !== window) return;
  if (!event.data.source || event.data.source !== 'itsm-assistant') return;
  
  const { type, payload } = event.data;
  
  if (type === 'FILL_SYSTEM') {
    const success = fillSystemSelect(payload.system);
    window.postMessage({
      source: 'itsm-assistant',
      type: 'FILL_SYSTEM_RESPONSE',
      payload: { success, system: payload.system }
    }, '*');
  }
  
  if (type === 'GET_CURRENT_SYSTEM') {
    const select = DOMManipulator.getSystemSelect();
    const currentSystem = select ? select.value : null;
    window.postMessage({
      source: 'itsm-assistant',
      type: 'GET_CURRENT_SYSTEM_RESPONSE',
      payload: { system: currentSystem }
    }, '*');
  }
});

// Sidebar发送消息
function sendToContentScript(type: string, payload: any): Promise<any> {
  return new Promise((resolve) => {
    const handler = (event: MessageEvent) => {
      if (event.data.source === 'itsm-assistant' && 
          event.data.type === `${type}_RESPONSE`) {
        window.removeEventListener('message', handler);
        resolve(event.data.payload);
      }
    };
    
    window.addEventListener('message', handler);
    window.postMessage({ source: 'itsm-assistant', type, payload }, '*');
    
    // 超时5秒
    setTimeout(() => {
      window.removeEventListener('message', handler);
      resolve({ success: false, error: 'Timeout' });
    }, 5000);
  });
}
```

#### 安全验证

- [ ] ✅ 消息包含source: "itsm-assistant"标识
- [ ] ✅ 校验：`if (event.source !== window) return`

#### 错误处理

- [ ] ✅ 填充失败返回`{success: false, error: "下拉框未找到"}`

---

### T3.4 - Content Script注入配置

#### 功能验收标准

- [ ] ✅ manifest.json配置content_scripts字段
- [ ] ✅ 匹配ITSM域名：`["*://itsm.company.com/*", "*://itsm-test.company.com/*"]`
- [ ] ✅ 注入content-script.js和event-bridge.js

#### 代码验收

文件：`manifest.json`

```json
{
  "manifest_version": 3,
  "name": "ITSM智能辅助插件",
  "version": "1.0.0",
  "permissions": ["activeTab", "scripting"],
  "host_permissions": ["*://itsm.company.com/*"],
  "content_scripts": [
    {
      "matches": [
        "*://itsm.company.com/*",
        "*://itsm-test.company.com/*"
      ],
      "js": ["content-script.js", "event-bridge.js"],
      "run_at": "document_end",
      "all_frames": false
    }
  ]
}
```

- [ ] ✅ `run_at: "document_end"`（确保DOM加载完成）
- [ ] ✅ `all_frames: false`（只注入主框架）

#### 测试验证

- [ ] ✅ 打开ITSM页面，控制台打印："Content Script Loaded"
- [ ] ✅ chrome://extensions中查看注入状态

#### 权限配置

- [ ] ✅ `permissions: ["activeTab", "scripting"]`
- [ ] ✅ `host_permissions: ["*://itsm.company.com/*"]`

---

## 任务组4: Background业务逻辑层

### T4.1 - ConfigLoader配置加载器

#### 功能验收标准

- [ ] ✅ 从systems.json加载≥50个系统数据
- [ ] ✅ 缓存数据到内存，第二次调用直接返回（<1ms）
- [ ] ✅ 数据格式验证通过（每个系统包含id/name/keywords/pinyin）

#### 代码验收标准

文件：`src/background/config-loader.ts`

```typescript
import systemsData from '@/data/systems.json';
import { System } from '@/types';

export class ConfigLoader {
  private static instance: ConfigLoader;
  private systemsCache: System[] | null = null;

  private constructor() {}

  static getInstance(): ConfigLoader {
    if (!ConfigLoader.instance) {
      ConfigLoader.instance = new ConfigLoader();
    }
    return ConfigLoader.instance;
  }

  async loadSystems(): Promise<System[]> {
    if (this.systemsCache) {
      return this.systemsCache;
    }

    // 数据验证
    if (!systemsData?.systems || !Array.isArray(systemsData.systems)) {
      throw new Error('Invalid systems data format');
    }

    // 验证每个系统字段完整性
    const validSystems = systemsData.systems.filter(system => {
      return system.id && 
             system.name && 
             Array.isArray(system.keywords) && 
             system.keywords.length > 0;
    });

    this.systemsCache = validSystems;
    return validSystems;
  }

  clearCache(): void {
    this.systemsCache = null;
  }
}
```

#### 测试验证

```typescript
// 测试用例
import { ConfigLoader } from './config-loader';

async function testConfigLoader() {
  const loader = ConfigLoader.getInstance();
  
  // 测试1: 加载数据
  const systems = await loader.loadSystems();
  console.assert(systems.length >= 50, '应至少加载50个系统');
  
  // 测试2: 缓存生效
  const start = performance.now();
  const cachedSystems = await loader.loadSystems();
  const duration = performance.now() - start;
  console.assert(duration < 1, '缓存读取应<1ms');
  console.assert(systems === cachedSystems, '应返回相同引用');
  
  // 测试3: 数据完整性
  const firstSystem = systems[0];
  console.assert(firstSystem.id, '系统必须有id');
  console.assert(firstSystem.name, '系统必须有name');
  console.assert(Array.isArray(firstSystem.keywords), 'keywords必须是数组');
}
```

#### 错误处理验证

- [ ] ✅ systems.json格式错误时抛异常："Invalid systems data format"
- [ ] ✅ 空数组时正常处理，返回[]
- [ ] ✅ 单例模式：多次调用getInstance()返回同一实例

#### 性能验收

- [ ] ✅ 首次加载<100ms
- [ ] ✅ 缓存读取<1ms
- [ ] ✅ 内存占用<2MB（50个系统约100KB）

---

### T4.2 - Fuse.js规则引擎集成

#### 功能验收标准

- [ ] ✅ 中文模糊搜索：输入"客户"匹配"客户管理系统"
- [ ] ✅ 拼音搜索：输入"kehu"匹配"客户管理系统"
- [ ] ✅ 英文缩写搜索：输入"CRM"匹配"客户关系管理系统"
- [ ] ✅ 返回Top3结果，按相关度降序排列

#### 代码验收标准

文件：`src/background/fuse-search-engine.ts`

```typescript
import Fuse from 'fuse.js';
import { System, Recommendation } from '@/types';

export class FuseSearchEngine {
  private fuse: Fuse<System>;

  constructor(systems: System[]) {
    this.fuse = new Fuse(systems, {
      keys: [
        { name: 'name', weight: 0.4 },
        { name: 'keywords', weight: 0.3 },
        { name: 'pinyin', weight: 0.2 },
        { name: 'aliases', weight: 0.1 }
      ],
      threshold: 0.3,
      ignoreLocation: true,
      minMatchCharLength: 1,
      includeScore: true
    });
  }

  search(query: string): Recommendation[] {
    const results = this.fuse.search(query, { limit: 3 });
    
    return results.map(result => ({
      system: result.item.name,
      confidence: 1 - (result.score || 0), // 转换为置信度
      source: 'rule' as const,
      reason: `关键词匹配: ${this.extractMatchedKeywords(result.item, query)}`
    }));
  }

  private extractMatchedKeywords(system: System, query: string): string {
    const matched = system.keywords.filter(keyword => 
      keyword.toLowerCase().includes(query.toLowerCase()) ||
      query.toLowerCase().includes(keyword.toLowerCase())
    );
    return matched.slice(0, 3).join(', ');
  }
}
```

#### 测试验证

```typescript
// 测试用例
async function testFuseSearch() {
  const systems = await ConfigLoader.getInstance().loadSystems();
  const engine = new FuseSearchEngine(systems);
  
  // 测试1: 中文搜索
  const result1 = engine.search('客户');
  console.assert(result1.length > 0, '应找到结果');
  console.assert(result1[0].system.includes('客户'), '应包含客户关键词');
  
  // 测试2: 拼音搜索
  const result2 = engine.search('kehu');
  console.assert(result2.length > 0, '拼音搜索应生效');
  
  // 测试3: 英文搜索
  const result3 = engine.search('CRM');
  console.assert(result3.some(r => r.system.includes('CRM')), '应匹配CRM系统');
  
  // 测试4: 置信度范围
  result1.forEach(r => {
    console.assert(r.confidence >= 0 && r.confidence <= 1, '置信度应在0-1之间');
  });
}
```

#### 性能验收

- [ ] ✅ 单次搜索<50ms（50个系统）
- [ ] ✅ 单次搜索<100ms（200个系统）
- [ ] ✅ 连续搜索10次平均<30ms

#### 边界情况验证

- [ ] ✅ 空字符串返回空数组
- [ ] ✅ 特殊字符搜索不报错（如"@#$%"）
- [ ] ✅ 超长字符串（>100字符）正常处理

---

### T4.3 - DeepSeekClient AI推荐实现

#### 功能验收标准

- [ ] ✅ 发送请求到DeepSeek API成功
- [ ] ✅ 返回JSON格式：`{recommendations: [{system, confidence, reason}]}`
- [ ] ✅ 超时5秒自动降级到规则引擎
- [ ] ✅ API错误时降级到规则引擎

#### 代码验收标准

文件：`src/background/deepseek-client.ts`

```typescript
import OpenAI from 'openai';
import { Recommendation } from '@/types';

export class DeepSeekClient {
  private client: OpenAI;
  private readonly timeout = 5000; // 5秒超时

  constructor(apiKey: string) {
    this.client = new OpenAI({
      baseURL: 'https://api.deepseek.com/v1',
      apiKey: apiKey
    });
  }

  async recommend(query: string, systemNames: string[]): Promise<Recommendation[]> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const prompt = this.buildPrompt(query, systemNames);
      
      const response = await this.client.chat.completions.create({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: 'You are an ITSM system recommendation assistant.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 500
      }, { signal: controller.signal });

      clearTimeout(timeoutId);
      
      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('Empty AI response');
      }

      return this.parseResponse(content);
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw new Error('AI_TIMEOUT');
      }
      throw new Error(`AI_ERROR: ${error.message}`);
    }
  }

  private buildPrompt(query: string, systemNames: string[]): string {
    return `
用户描述: "${query}"

可选系统列表:
${systemNames.map((name, index) => `${index + 1}. ${name}`).join('\n')}

请分析用户需求,推荐最合适的3个系统,返回JSON格式:
{
  "recommendations": [
    {"system": "系统名称", "confidence": 0.95, "reason": "推荐理由"}
  ]
}

要求:
1. confidence范围0-1
2. 按置信度降序排列
3. 只返回JSON,不要其他文字
`.trim();
  }

  private parseResponse(content: string): Recommendation[] {
    try {
      // 提取JSON（可能包含markdown代码块）
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || 
                       content.match(/\{[\s\S]*\}/);
      
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }

      const jsonStr = jsonMatch[1] || jsonMatch[0];
      const parsed = JSON.parse(jsonStr);

      if (!parsed.recommendations || !Array.isArray(parsed.recommendations)) {
        throw new Error('Invalid response format');
      }

      return parsed.recommendations.map(rec => ({
        system: rec.system,
        confidence: rec.confidence,
        source: 'ai' as const,
        reason: rec.reason
      }));
    } catch (error) {
      throw new Error(`Parse error: ${error.message}`);
    }
  }
}
```

#### 测试验证

```typescript
// Mock测试
async function testDeepSeekClient() {
  const client = new DeepSeekClient('test-api-key');
  
  // 测试1: 正常请求
  const result = await client.recommend(
    '我需要查询客户信息',
    ['CRM系统', '财务系统', '库存系统']
  );
  console.assert(result.length > 0, '应返回推荐结果');
  console.assert(result[0].source === 'ai', 'source应为ai');
  
  // 测试2: 超时处理
  // （需要模拟慢速API）
  
  // 测试3: JSON解析
  const mockResponse = `
  \`\`\`json
  {
    "recommendations": [
      {"system": "CRM系统", "confidence": 0.95, "reason": "匹配客户管理需求"}
    ]
  }
  \`\`\`
  `;
  // 验证parseResponse方法
}
```

#### 错误处理验证

- [ ] ✅ 网络错误抛异常："AI_ERROR: Network error"
- [ ] ✅ 超时5秒抛异常："AI_TIMEOUT"
- [ ] ✅ JSON格式错误抛异常："Parse error: ..."
- [ ] ✅ API返回空内容抛异常："Empty AI response"

#### 性能验收

- [ ] ✅ 正常响应<3秒（P95）
- [ ] ✅ 超时精确控制在5秒±100ms
- [ ] ✅ 错误处理开销<10ms

---

### T4.4 - PromptBuilder提示词工程

#### 功能验收标准

- [ ] ✅ 生成Few-Shot示例（至少3个）
- [ ] ✅ 包含用户查询+系统列表
- [ ] ✅ Prompt长度<1000字符（控制Token成本）
- [ ] ✅ 输出格式：JSON Schema约束

#### 代码验收标准

文件：`src/background/prompt-builder.ts`

```typescript
export class PromptBuilder {
  static buildRecommendationPrompt(query: string, systemNames: string[]): string {
    const systemList = systemNames
      .map((name, index) => `${index + 1}. ${name}`)
      .join('\n');

    return `
# ITSM系统智能推荐任务

## 用户需求
"${query}"

## 可选系统列表（共${systemNames.length}个）
${systemList}

## Few-Shot示例

### 示例1
用户: "我需要报销差旅费"
推荐:
{
  "recommendations": [
    {"system": "财务报销系统", "confidence": 0.98, "reason": "直接匹配报销场景"},
    {"system": "OA办公系统", "confidence": 0.65, "reason": "可能需要审批流程"},
    {"system": "差旅管理系统", "confidence": 0.60, "reason": "差旅相关辅助"}
  ]
}

### 示例2
用户: "客户投诉处理"
推荐:
{
  "recommendations": [
    {"system": "客户服务系统", "confidence": 0.95, "reason": "投诉处理核心系统"},
    {"system": "CRM系统", "confidence": 0.75, "reason": "查询客户历史记录"},
    {"system": "工单管理系统", "confidence": 0.70, "reason": "创建处理工单"}
  ]
}

### 示例3
用户: "入职新员工"
推荐:
{
  "recommendations": [
    {"system": "人事管理系统", "confidence": 0.97, "reason": "员工入职核心系统"},
    {"system": "IT资产管理", "confidence": 0.72, "reason": "分配办公设备"},
    {"system": "培训系统", "confidence": 0.65, "reason": "新员工培训"}
  ]
}

## 要求
1. 从上述系统列表中选择最相关的3个系统
2. confidence必须在0-1之间,保留2位小数
3. 按confidence降序排列
4. reason简短明确（<20字符）
5. 只返回JSON,格式严格遵循示例

## 输出格式
\`\`\`json
{
  "recommendations": [
    {"system": "系统名称", "confidence": 0.XX, "reason": "理由"}
  ]
}
\`\`\`
`.trim();
  }

  static buildContextAwarePrompt(
    query: string,
    systemNames: string[],
    currentPage: string
  ): string {
    const basePrompt = this.buildRecommendationPrompt(query, systemNames);
    
    return `
${basePrompt}

## 上下文信息
当前页面: ${currentPage}
（此信息可辅助判断用户意图）
`.trim();
  }

  static validatePromptLength(prompt: string, maxLength = 1000): boolean {
    return prompt.length <= maxLength;
  }
}
```

#### 测试验证

```typescript
// 测试用例
function testPromptBuilder() {
  const systems = ['CRM系统', '财务系统', 'OA系统'];
  
  // 测试1: 基础Prompt生成
  const prompt = PromptBuilder.buildRecommendationPrompt('客户投诉', systems);
  console.assert(prompt.includes('客户投诉'), '应包含查询词');
  console.assert(prompt.includes('CRM系统'), '应包含系统列表');
  console.assert(prompt.includes('Few-Shot'), '应包含示例');
  
  // 测试2: 长度验证
  const isValid = PromptBuilder.validatePromptLength(prompt, 2000);
  console.assert(isValid, 'Prompt长度应<2000字符');
  
  // 测试3: 上下文增强
  const contextPrompt = PromptBuilder.buildContextAwarePrompt(
    '客户投诉',
    systems,
    'https://itsm.company.com/create-ticket'
  );
  console.assert(contextPrompt.includes('当前页面'), '应包含上下文');
}
```

#### 质量验收

- [ ] ✅ Few-Shot示例覆盖3个不同领域（财务/客户/人事）
- [ ] ✅ JSON格式严格约束（包含字段说明）
- [ ] ✅ Prompt结构清晰（分段明确）
- [ ] ✅ Token成本<500（使用tiktoken估算）

---

### T4.5 - ResponseParser响应解析器

#### 功能验收标准

- [ ] ✅ 解析标准JSON格式：`{"recommendations": [...]}`
- [ ] ✅ 解析Markdown代码块：`` ```json\n{...}\n``` ``
- [ ] ✅ 解析纯文本JSON：`{...}`
- [ ] ✅ 验证数据完整性（system/confidence/reason字段）

#### 代码验收标准

文件：`src/background/response-parser.ts`

```typescript
import { Recommendation } from '@/types';

export class ResponseParser {
  static parse(content: string): Recommendation[] {
    const json = this.extractJSON(content);
    const data = JSON.parse(json);
    
    this.validate(data);
    
    return data.recommendations.map(rec => ({
      system: rec.system,
      confidence: this.normalizeConfidence(rec.confidence),
      source: 'ai' as const,
      reason: rec.reason || '暂无理由'
    }));
  }

  private static extractJSON(content: string): string {
    // 策略1: 提取Markdown代码块
    const markdownMatch = content.match(/```(?:json)?\n?([\s\S]*?)\n?```/);
    if (markdownMatch) {
      return markdownMatch[1].trim();
    }

    // 策略2: 提取第一个完整JSON对象
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return jsonMatch[0];
    }

    throw new Error('No valid JSON found in response');
  }

  private static validate(data: any): void {
    if (!data || typeof data !== 'object') {
      throw new Error('Response must be an object');
    }

    if (!data.recommendations || !Array.isArray(data.recommendations)) {
      throw new Error('Missing recommendations array');
    }

    if (data.recommendations.length === 0) {
      throw new Error('Recommendations array is empty');
    }

    data.recommendations.forEach((rec, index) => {
      if (!rec.system || typeof rec.system !== 'string') {
        throw new Error(`Recommendation[${index}]: missing system field`);
      }

      if (typeof rec.confidence !== 'number') {
        throw new Error(`Recommendation[${index}]: confidence must be number`);
      }

      if (rec.confidence < 0 || rec.confidence > 1) {
        throw new Error(`Recommendation[${index}]: confidence must be 0-1`);
      }
    });
  }

  private static normalizeConfidence(confidence: number): number {
    // 确保在0-1范围内
    return Math.max(0, Math.min(1, confidence));
  }

  static safeP Parse(content: string): Recommendation[] | null {
    try {
      return this.parse(content);
    } catch (error) {
      console.error('Parse failed:', error);
      return null;
    }
  }
}
```

#### 测试验证

```typescript
// 测试用例
function testResponseParser() {
  // 测试1: 标准JSON
  const json1 = `{"recommendations": [{"system": "CRM", "confidence": 0.95, "reason": "test"}]}`;
  const result1 = ResponseParser.parse(json1);
  console.assert(result1.length === 1, '应解析1条推荐');
  
  // 测试2: Markdown代码块
  const json2 = `
  一些文字
  \`\`\`json
  {"recommendations": [{"system": "CRM", "confidence": 0.95}]}
  \`\`\`
  更多文字
  `;
  const result2 = ResponseParser.parse(json2);
  console.assert(result2.length === 1, '应提取代码块中的JSON');
  
  // 测试3: 缺少字段
  const json3 = `{"recommendations": [{"system": "CRM"}]}`;
  try {
    ResponseParser.parse(json3);
    console.assert(false, '应抛出异常');
  } catch (e) {
    console.assert(e.message.includes('confidence'), '应提示缺少confidence');
  }
  
  // 测试4: 置信度范围验证
  const json4 = `{"recommendations": [{"system": "CRM", "confidence": 1.5}]}`;
  try {
    ResponseParser.parse(json4);
    console.assert(false, '应抛出异常');
  } catch (e) {
    console.assert(e.message.includes('0-1'), '应提示范围错误');
  }
}
```

#### 错误处理验证

- [ ] ✅ 无JSON抛异常："No valid JSON found"
- [ ] ✅ 缺少recommendations字段抛异常："Missing recommendations array"
- [ ] ✅ 空数组抛异常："Recommendations array is empty"
- [ ] ✅ confidence超范围抛异常："confidence must be 0-1"
- [ ] ✅ safeParse失败返回null，不抛异常

---

### T4.6 - SystemRecommender核心逻辑

#### 功能验收标准

- [ ] ✅ 双轨并行执行：规则引擎 + AI推荐同时运行
- [ ] ✅ AI成功时合并结果（AI权重70% + 规则权重30%）
- [ ] ✅ AI失败时自动降级到规则引擎
- [ ] ✅ 返回Top3推荐，按置信度降序

#### 代码验收标准

文件：`src/background/system-recommender.ts`

```typescript
import { ConfigLoader } from './config-loader';
import { FuseSearchEngine } from './fuse-search-engine';
import { DeepSeekClient } from './deepseek-client';
import { PromptBuilder } from './prompt-builder';
import { ResponseParser } from './response-parser';
import { Recommendation } from '@/types';

export class SystemRecommender {
  private fuseEngine: FuseSearchEngine;
  private aiClient: DeepSeekClient;
  private configLoader: ConfigLoader;

  constructor(apiKey: string) {
    this.configLoader = ConfigLoader.getInstance();
    this.aiClient = new DeepSeekClient(apiKey);
  }

  async initialize(): Promise<void> {
    const systems = await this.configLoader.loadSystems();
    this.fuseEngine = new FuseSearchEngine(systems);
  }

  async recommend(query: string): Promise<Recommendation[]> {
    if (!this.fuseEngine) {
      await this.initialize();
    }

    // 双轨并行执行
    const [ruleResults, aiResults] = await Promise.allSettled([
      this.getRuleRecommendations(query),
      this.getAIRecommendations(query)
    ]);

    // AI成功：合并结果
    if (aiResults.status === 'fulfilled' && aiResults.value.length > 0) {
      return this.mergeRecommendations(
        ruleResults.status === 'fulfilled' ? ruleResults.value : [],
        aiResults.value
      );
    }

    // AI失败：降级到规则引擎
    console.warn('AI recommendation failed, fallback to rule engine');
    return ruleResults.status === 'fulfilled' ? ruleResults.value : [];
  }

  private async getRuleRecommendations(query: string): Promise<Recommendation[]> {
    return this.fuseEngine.search(query);
  }

  private async getAIRecommendations(query: string): Promise<Recommendation[]> {
    const systems = await this.configLoader.loadSystems();
    const systemNames = systems.map(s => s.name);
    
    const prompt = PromptBuilder.buildRecommendationPrompt(query, systemNames);
    const response = await this.aiClient.recommend(query, systemNames);
    
    return response;
  }

  private mergeRecommendations(
    ruleResults: Recommendation[],
    aiResults: Recommendation[]
  ): Recommendation[] {
    const merged = new Map<string, Recommendation>();

    // AI结果（权重0.7）
    aiResults.forEach(rec => {
      merged.set(rec.system, {
        ...rec,
        confidence: rec.confidence * 0.7,
        source: 'hybrid' as const
      });
    });

    // 规则结果（权重0.3）
    ruleResults.forEach(rec => {
      const existing = merged.get(rec.system);
      if (existing) {
        // 合并置信度
        existing.confidence += rec.confidence * 0.3;
      } else {
        merged.set(rec.system, {
          ...rec,
          confidence: rec.confidence * 0.3,
          source: 'hybrid' as const
        });
      }
    });

    // 排序并返回Top3
    return Array.from(merged.values())
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 3);
  }
}
```

#### 测试验证

```typescript
// 测试用例
async function testSystemRecommender() {
  const recommender = new SystemRecommender('test-api-key');
  await recommender.initialize();
  
  // 测试1: AI成功场景
  const result1 = await recommender.recommend('客户投诉');
  console.assert(result1.length <= 3, '应返回Top3');
  console.assert(result1[0].confidence >= result1[1].confidence, '应降序排列');
  
  // 测试2: AI失败降级
  // （模拟AI超时）
  const result2 = await recommender.recommend('客户投诉');
  console.assert(result2.length > 0, '应返回规则引擎结果');
  console.assert(result2[0].source === 'rule', '应标记为规则引擎');
  
  // 测试3: 合并逻辑
  // AI推荐: CRM 0.9, 财务 0.7
  // 规则推荐: CRM 0.8, 库存 0.6
  // 合并后: CRM 0.9*0.7+0.8*0.3=0.87, 财务 0.49, 库存 0.18
}
```

#### 性能验收

- [ ] ✅ 双轨并行总耗时≈max(规则耗时, AI耗时)
- [ ] ✅ 规则引擎<100ms，AI<3秒 → 总耗时<3.1秒
- [ ] ✅ AI超时降级耗时<5.1秒

#### 错误处理验证

- [ ] ✅ 规则引擎失败+AI失败 → 返回空数组
- [ ] ✅ 规则引擎成功+AI失败 → 返回规则结果
- [ ] ✅ 规则引擎失败+AI成功 → 返回AI结果

---

### T4.7 - CacheManager缓存管理

#### 功能验收标准

- [ ] ✅ 缓存推荐结果，相同查询1小时内直接返回
- [ ] ✅ TTL过期自动失效
- [ ] ✅ 最大缓存100条，LRU淘汰
- [ ] ✅ 支持手动清除缓存

#### 代码验收标准

文件：`src/background/cache-manager.ts`

```typescript
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // 毫秒
}

export class CacheManager<T> {
  private cache = new Map<string, CacheEntry<T>>();
  private maxSize: number;
  private defaultTTL: number;

  constructor(maxSize = 100, defaultTTL = 3600000) { // 1小时
    this.maxSize = maxSize;
    this.defaultTTL = defaultTTL;
  }

  set(key: string, data: T, ttl?: number): void {
    // LRU淘汰
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL
    });
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    // 检查TTL
    const age = Date.now() - entry.timestamp;
    if (age > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    // LRU: 重新插入到末尾
    this.cache.delete(key);
    this.cache.set(key, entry);

    return entry.data;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }

  // 清理过期条目
  cleanup(): number {
    const now = Date.now();
    let removed = 0;

    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
        removed++;
      }
    }

    return removed;
  }
}
```

#### 测试验证

```typescript
// 测试用例
async function testCacheManager() {
  const cache = new CacheManager<string>(3, 1000); // 最大3条，TTL=1秒
  
  // 测试1: 基本读写
  cache.set('key1', 'value1');
  console.assert(cache.get('key1') === 'value1', '应读取到缓存值');
  
  // 测试2: TTL过期
  cache.set('key2', 'value2', 500);
  await new Promise(resolve => setTimeout(resolve, 600));
  console.assert(cache.get('key2') === null, 'TTL过期应返回null');
  
  // 测试3: LRU淘汰
  cache.set('key1', 'value1');
  cache.set('key2', 'value2');
  cache.set('key3', 'value3');
  cache.set('key4', 'value4'); // 应淘汰key1
  console.assert(cache.get('key1') === null, 'LRU应淘汰最旧条目');
  console.assert(cache.get('key4') === 'value4', '新条目应存在');
  
  // 测试4: 清理
  const removed = cache.cleanup();
  console.assert(removed >= 0, '应返回清理数量');
}
```

#### 性能验收

- [ ] ✅ get操作<1ms
- [ ] ✅ set操作<1ms
- [ ] ✅ cleanup操作<10ms（100条缓存）

#### 内存验收

- [ ] ✅ 100条缓存占用<1MB
- [ ] ✅ 无内存泄漏（长时间运行）

---

### T4.8 - StorageManager持久化封装

#### 功能验收标准

- [ ] ✅ 保存推荐日志到chrome.storage.local
- [ ] ✅ 读取历史推荐记录
- [ ] ✅ 存储空间限制检查（5MB quota）
- [ ] ✅ 自动清理30天前数据

#### 代码验收标准

文件：`src/background/storage-manager.ts`

```typescript
export interface RecommendationLog {
  id: string;
  query: string;
  results: Recommendation[];
  timestamp: number;
  selectedSystem?: string;
}

export class StorageManager {
  private static readonly STORAGE_KEY = 'recommendation_logs';
  private static readonly MAX_LOGS = 1000;
  private static readonly RETENTION_DAYS = 30;

  static async savelog(log: RecommendationLog): Promise<void> {
    const logs = await this.getLogs();
    
    logs.unshift(log);
    
    // 限制数量
    if (logs.length > this.MAX_LOGS) {
      logs.length = this.MAX_LOGS;
    }

    await chrome.storage.local.set({ [this.STORAGE_KEY]: logs });
  }

  static async getLogs(): Promise<RecommendationLog[]> {
    const result = await chrome.storage.local.get(this.STORAGE_KEY);
    return result[this.STORAGE_KEY] || [];
  }

  static async clearOldLogs(): Promise<number> {
    const logs = await this.getLogs();
    const cutoff = Date.now() - this.RETENTION_DAYS * 24 * 60 * 60 * 1000;
    
    const filtered = logs.filter(log => log.timestamp > cutoff);
    const removed = logs.length - filtered.length;

    if (removed > 0) {
      await chrome.storage.local.set({ [this.STORAGE_KEY]: filtered });
    }

    return removed;
  }

  static async getStorageUsage(): Promise<number> {
    const bytes = await chrome.storage.local.getBytesInUse();
    return bytes;
  }

  static async clearAll(): Promise<void> {
    await chrome.storage.local.remove(this.STORAGE_KEY);
  }
}
```

#### 测试验证

```typescript
// 测试用例
async function testStorageManager() {
  // 测试1: 保存日志
  const log: RecommendationLog = {
    id: '123',
    query: '客户投诉',
    results: [{ system: 'CRM', confidence: 0.9, source: 'ai' }],
    timestamp: Date.now()
  };
  await StorageManager.saveLog(log);
  
  // 测试2: 读取日志
  const logs = await StorageManager.getLogs();
  console.assert(logs.length > 0, '应保存日志');
  console.assert(logs[0].id === '123', '应读取到最新日志');
  
  // 测试3: 清理旧日志
  const oldLog: RecommendationLog = {
    id: '456',
    query: 'old',
    results: [],
    timestamp: Date.now() - 31 * 24 * 60 * 60 * 1000 // 31天前
  };
  await StorageManager.saveLog(oldLog);
  const removed = await StorageManager.clearOldLogs();
  console.assert(removed > 0, '应清理旧日志');
}
```

#### 存储配额验收

- [ ] ✅ 检查存储用量：`getStorageUsage() < 5MB`
- [ ] ✅ 超出配额时提示："Storage quota exceeded"

---

### T4.9 - DataRepository日志记录

#### 功能验收标准

- [ ] ✅ 记录每次推荐请求（查询词+结果+时间戳）
- [ ] ✅ 记录用户选择（哪个推荐被采纳）
- [ ] ✅ 导出日志为JSON格式
- [ ] ✅ 支持按日期范围查询

#### 代码验收标准

文件：`src/background/data-repository.ts`

```typescript
import { StorageManager, RecommendationLog } from './storage-manager';
import { Recommendation } from '@/types';

export class DataRepository {
  static async logRecommendation(
    query: string,
    results: Recommendation[]
  ): Promise<string> {
    const log: RecommendationLog = {
      id: crypto.randomUUID(),
      query,
      results,
      timestamp: Date.now()
    };

    await StorageManager.saveLog(log);
    return log.id;
  }

  static async logSelection(logId: string, selectedSystem: string): Promise<void> {
    const logs = await StorageManager.getLogs();
    const log = logs.find(l => l.id === logId);

    if (log) {
      log.selectedSystem = selectedSystem;
      await chrome.storage.local.set({ recommendation_logs: logs });
    }
  }

  static async getLogsByDateRange(
    startDate: number,
    endDate: number
  ): Promise<RecommendationLog[]> {
    const logs = await StorageManager.getLogs();
    return logs.filter(log => 
      log.timestamp >= startDate && log.timestamp <= endDate
    );
  }

  static async exportLogs(): Promise<string> {
    const logs = await StorageManager.getLogs();
    return JSON.stringify(logs, null, 2);
  }

  static async getStats(): Promise<{
    totalQueries: number;
    avgConfidence: number;
    topSystems: Array<{system: string; count: number}>;
  }> {
    const logs = await StorageManager.getLogs();

    const systemCounts = new Map<string, number>();
    let totalConfidence = 0;
    let count = 0;

    logs.forEach(log => {
      log.results.forEach(rec => {
        systemCounts.set(rec.system, (systemCounts.get(rec.system) || 0) + 1);
        totalConfidence += rec.confidence;
        count++;
      });
    });

    const topSystems = Array.from(systemCounts.entries())
      .map(([system, count]) => ({ system, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      totalQueries: logs.length,
      avgConfidence: count > 0 ? totalConfidence / count : 0,
      topSystems
    };
  }
}
```

#### 测试验证

```typescript
// 测试用例
async function testDataRepository() {
  // 测试1: 记录推荐
  const logId = await DataRepository.logRecommendation('客户投诉', [
    { system: 'CRM', confidence: 0.9, source: 'ai' }
  ]);
  console.assert(logId, '应返回logId');
  
  // 测试2: 记录选择
  await DataRepository.logSelection(logId, 'CRM');
  const logs = await StorageManager.getLogs();
  console.assert(logs[0].selectedSystem === 'CRM', '应记录选择');
  
  // 测试3: 统计数据
  const stats = await DataRepository.getStats();
  console.assert(stats.totalQueries > 0, '应有查询记录');
  console.assert(stats.avgConfidence >= 0, '应计算平均置信度');
}
```

---

### T4.10 - 性能优化与降级集成

#### 功能验收标准

- [ ] ✅ AI超时5秒自动降级
- [ ] ✅ 缓存命中率>50%（测试100次请求）
- [ ] ✅ 平均响应时间<500ms（缓存命中时）
- [ ] ✅ 资源占用<50MB内存

#### 代码验收标准

集成测试：`src/background/performance-test.ts`

```typescript
import { SystemRecommender } from './system-recommender';
import { CacheManager } from './cache-manager';

export async function performanceTest() {
  const recommender = new SystemRecommender('api-key');
  const cache = new CacheManager();
  
  const testQueries = [
    '客户投诉', 'CRM', '报销', '入职', '离职',
    '合同管理', '项目管理', '库存查询', '财务报表', '考勤'
  ];

  // 性能测试
  const results = {
    totalRequests: 0,
    cacheHits: 0,
    avgResponseTime: 0,
    maxResponseTime: 0
  };

  for (let i = 0; i < 100; i++) {
    const query = testQueries[i % testQueries.length];
    const cacheKey = `rec:${query}`;

    const start = performance.now();
    
    let result = cache.get(cacheKey);
    if (result) {
      results.cacheHits++;
    } else {
      result = await recommender.recommend(query);
      cache.set(cacheKey, result);
    }

    const duration = performance.now() - start;
    results.avgResponseTime += duration;
    results.maxResponseTime = Math.max(results.maxResponseTime, duration);
    results.totalRequests++;
  }

  results.avgResponseTime /= results.totalRequests;

  console.log('Performance Test Results:', {
    cacheHitRate: `${(results.cacheHits / results.totalRequests * 100).toFixed(1)}%`,
    avgResponseTime: `${results.avgResponseTime.toFixed(0)}ms`,
    maxResponseTime: `${results.maxResponseTime.toFixed(0)}ms`
  });

  return results;
}
```

#### 性能验收

- [ ] ✅ 缓存命中率≥50%
- [ ] ✅ 缓存命中平均响应<100ms
- [ ] ✅ 缓存未命中平均响应<3秒
- [ ] ✅ 内存占用<50MB

#### 降级策略验收

```typescript
// 降级测试
async function testDegradation() {
  const recommender = new SystemRecommender('invalid-api-key');
  
  // AI失败应自动降级
  const result = await recommender.recommend('客户投诉');
  console.assert(result.length > 0, '降级应返回规则引擎结果');
  console.assert(result[0].source === 'rule', '应标记为规则引擎');
}
```

---

## 任务组5: 集成测试与调试

### T5.1 - Sidebar→Background→ITSM端到端测试

#### 功能验收标准

- [ ] ✅ 完整流程通过：输入搜索→显示推荐→点击选择→ITSM表单填充
- [ ] ✅ 测试3个场景：
  - 场景1：中文搜索"客户投诉"
  - 场景2：拼音搜索"kehu"
  - 场景3：英文搜索"CRM"
- [ ] ✅ 每个场景验证推荐结果正确性

#### 测试脚本

文件：`tests/e2e/full-workflow.test.ts`

```typescript
describe('End-to-End Workflow', () => {
  beforeEach(async () => {
    // 加载扩展到Chrome
    await loadExtension('./dist');
    await navigateTo('https://itsm.company.com/create-ticket');
  });

  test('中文搜索并填充', async () => {
    // 1. 打开Sidebar
    await clickExtensionIcon();
    await waitForSidebar();

    // 2. 输入搜索词
    const searchInput = await findElement('#system-search-input');
    await typeText(searchInput, '客户投诉');

    // 3. 等待推荐结果
    await waitForElement('.recommendation-item', 3000);
    const results = await findElements('.recommendation-item');
    expect(results.length).toBeGreaterThan(0);

    // 4. 验证推荐相关性
    const firstResult = await getText(results[0]);
    expect(firstResult).toMatch(/客户|CRM|服务/);

    // 5. 点击第一个推荐
    await click(results[0]);

    // 6. 验证ITSM表单填充
    const systemSelect = await findElement('#systemSelect');
    const selectedValue = await getValue(systemSelect);
    expect(selectedValue).toBeTruthy();
    expect(selectedValue).toMatch(/客户|CRM/);
  });

  test('拼音搜索并填充', async () => {
    await clickExtensionIcon();
    const searchInput = await findElement('#system-search-input');
    await typeText(searchInput, 'kehu');

    await waitForElement('.recommendation-item');
    const results = await findElements('.recommendation-item');
    expect(results.length).toBeGreaterThan(0);

    // 验证拼音匹配生效
    const firstResult = await getText(results[0]);
    expect(firstResult).toMatch(/客户/);
  });

  test('AI超时降级', async () => {
    // 模拟AI超时
    await mockAPIDelay(6000);

    await clickExtensionIcon();
    const searchInput = await findElement('#system-search-input');
    await typeText(searchInput, '客户');

    // 应在5秒内返回规则引擎结果
    await waitForElement('.recommendation-item', 6000);
    const results = await findElements('.recommendation-item');
    expect(results.length).toBeGreaterThan(0);

    // 验证source标识为rule
    const sourceIcon = await findElement('.source-icon');
    expect(await getText(sourceIcon)).toBe('📊');
  });
});
```

#### 验收清单

- [ ] ✅ 所有3个测试场景通过
- [ ] ✅ 无控制台错误信息
- [ ] ✅ 推荐结果准确率≥80%（人工评估）
- [ ] ✅ 表单填充成功率100%

---

### T5.2 - 异常场景容错测试

#### 功能验收标准

- [ ] ✅ 测试10个异常场景，全部优雅处理
- [ ] ✅ 无崩溃、无白屏、无用户数据丢失

#### 测试场景清单

```typescript
describe('Exception Handling', () => {
  test('场景1: 网络断开', async () => {
    await setOffline(true);
    const result = await searchSystem('客户');
    expect(result.error).toMatch(/网络|离线/);
    expect(result.fallback).toBe('rule'); // 应降级到规则引擎
  });

  test('场景2: API Key无效', async () => {
    await setAPIKey('invalid-key');
    const result = await searchSystem('客户');
    expect(result.source).toBe('rule'); // 应降级
  });

  test('场景3: 空搜索词', async () => {
    const result = await searchSystem('');
    expect(result).toEqual([]); // 应返回空数组
  });

  test('场景4: 超长搜索词', async () => {
    const longQuery = 'a'.repeat(1000);
    const result = await searchSystem(longQuery);
    expect(result).toBeDefined(); // 不应崩溃
  });

  test('场景5: 特殊字符', async () => {
    const result = await searchSystem('@#$%^&*()');
    expect(result).toBeDefined(); // 不应崩溃
  });

  test('场景6: ITSM页面未加载', async () => {
    await navigateTo('https://other-site.com');
    await clickExtensionIcon();
    // 应显示提示："请在ITSM页面使用"
    const warning = await findElement('.warning-message');
    expect(await getText(warning)).toMatch(/ITSM页面/);
  });

  test('场景7: 下拉框选项不存在', async () => {
    const result = await fillSystem('不存在的系统');
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/未找到|不存在/);
  });

  test('场景8: Storage配额超限', async () => {
    await fillStorage(5 * 1024 * 1024); // 填满5MB
    const result = await saveLog({...mockLog});
    expect(result.error).toMatch(/存储空间/);
  });

  test('场景9: Background未启动', async () => {
    await terminateServiceWorker();
    const result = await searchSystem('客户');
    // 应提示重新加载扩展
    expect(result.error).toMatch(/后台服务|重新加载/);
  });

  test('场景10: AI返回格式错误', async () => {
    await mockAIResponse('Invalid JSON');
    const result = await searchSystem('客户');
    expect(result.source).toBe('rule'); // 应降级
  });
});
```

#### 验收清单

- [ ] ✅ 所有10个场景优雅处理
- [ ] ✅ 每个场景有明确的用户提示
- [ ] ✅ 无控制台uncaught exception
- [ ] ✅ 降级策略100%生效

---

### T5.3 - 性能压力测试

#### 功能验收标准

- [ ] ✅ 100次连续搜索无性能衰减
- [ ] ✅ 内存占用稳定（<100MB）
- [ ] ✅ 缓存命中率≥60%
- [ ] ✅ P95响应时间<500ms

#### 压力测试脚本

```typescript
describe('Performance Stress Test', () => {
  test('100次连续搜索', async () => {
    const queries = generateRandomQueries(100);
    const metrics = {
      responseTimes: [],
      cacheHits: 0,
      errors: 0
    };

    for (const query of queries) {
      const start = performance.now();
      
      try {
        const result = await searchSystem(query);
        const duration = performance.now() - start;
        
        metrics.responseTimes.push(duration);
        if (result.cached) metrics.cacheHits++;
      } catch (error) {
        metrics.errors++;
      }
    }

    // 验收标准
    const p95 = calculatePercentile(metrics.responseTimes, 0.95);
    const avg = average(metrics.responseTimes);
    const cacheHitRate = metrics.cacheHits / queries.length;

    expect(p95).toBeLessThan(500); // P95<500ms
    expect(avg).toBeLessThan(300); // 平均<300ms
    expect(cacheHitRate).toBeGreaterThan(0.6); // 命中率>60%
    expect(metrics.errors).toBe(0); // 无错误
  });

  test('内存泄漏检测', async () => {
    const initialMemory = await getMemoryUsage();

    // 执行1000次操作
    for (let i = 0; i < 1000; i++) {
      await searchSystem(`query-${i}`);
      if (i % 100 === 0) {
        await clearCache(); // 定期清理
      }
    }

    const finalMemory = await getMemoryUsage();
    const growth = finalMemory - initialMemory;

    // 内存增长应<20MB
    expect(growth).toBeLessThan(20 * 1024 * 1024);
  });

  test('并发请求处理', async () => {
    const concurrentQueries = Array.from({ length: 10 }, (_, i) => `query-${i}`);

    const start = performance.now();
    const results = await Promise.all(
      concurrentQueries.map(query => searchSystem(query))
    );
    const duration = performance.now() - start;

    // 并发10个请求应<3秒完成
    expect(duration).toBeLessThan(3000);
    expect(results.every(r => r !== null)).toBe(true);
  });
});
```

#### 性能基准

- [ ] ✅ P50响应时间<200ms
- [ ] ✅ P95响应时间<500ms
- [ ] ✅ P99响应时间<1000ms
- [ ] ✅ 内存峰值<100MB
- [ ] ✅ CPU占用<30%（持续1分钟）

---

## 任务组6-8: US-002相关任务

### T6.1 - ConfidenceRatingPanel组件

#### 功能验收标准

- [ ] ✅ 显示5星评分UI（⭐⭐⭐⭐⭐）
- [ ] ✅ 鼠标hover高亮预览
- [ ] ✅ 点击提交评分
- [ ] ✅ 提交后显示"感谢反馈"

#### 代码验收标准

文件：`src/components/ConfidenceRatingPanel.tsx`

```typescript
import React, { useState } from 'react';

interface Props {
  recommendationId: string;
  onSubmit: (rating: number, feedback: string) => void;
}

export const ConfidenceRatingPanel: React.FC<Props> = ({ recommendationId, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating, feedback);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-4 text-green-600">
        ✅ 感谢您的反馈！
      </div>
    );
  }

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h3 className="text-sm font-medium mb-2">推荐结果满意度</h3>
      
      {/* 星级评分 */}
      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(star)}
            className="text-2xl transition-all"
          >
            {star <= (hoverRating || rating) ? '⭐' : '☆'}
          </button>
        ))}
      </div>

      {/* 文字反馈（可选） */}
      <textarea
        value={feedback}
        onChange={e => setFeedback(e.target.value)}
        placeholder="补充说明（可选）"
        className="w-full p-2 border rounded text-sm"
        rows={2}
      />

      {/* 提交按钮 */}
      <button
        onClick={handleSubmit}
        disabled={rating === 0}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        提交反馈
      </button>
    </div>
  );
};
```

#### UI验收标准

- [ ] ✅ 未评分星星为灰色☆
- [ ] ✅ hover星星变黄色⭐
- [ ] ✅ 点击后固定黄色⭐
- [ ] ✅ 提交按钮未评分时禁用（灰色）
- [ ] ✅ 提交后显示绿色勾选图标

#### 交互验收

```typescript
// 测试用例
test('ConfidenceRatingPanel交互', async () => {
  const onSubmit = jest.fn();
  render(<ConfidenceRatingPanel recommendationId="123" onSubmit={onSubmit} />);

  // 测试1: 初始状态提交按钮禁用
  const submitBtn = screen.getByText('提交反馈');
  expect(submitBtn).toBeDisabled();

  // 测试2: 点击3星
  const star3 = screen.getAllByRole('button')[2];
  await userEvent.click(star3);
  expect(submitBtn).toBeEnabled();

  // 测试3: 提交
  await userEvent.click(submitBtn);
  expect(onSubmit).toHaveBeenCalledWith(3, '');

  // 测试4: 提交后显示感谢
  expect(screen.getByText(/感谢您的反馈/)).toBeInTheDocument();
});
```

---

### T6.2 - 反馈提示时机

#### 功能验收标准

- [ ] ✅ 用户选择推荐后立即显示评分面板
- [ ] ✅ 面板位置：推荐结果下方
- [ ] ✅ 3秒后自动淡出（如未操作）
- [ ] ✅ 操作时取消自动淡出

#### 代码验收标准

```typescript
// 在SystemSearchPanel中集成
export const SystemSearchPanel: React.FC = () => {
  const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null);
  const [showRating, setShowRating] = useState(false);

  const handleSelect = (system: string) => {
    setSelectedRecommendation(system);
    setShowRating(true);

    // 3秒后自动隐藏
    const timer = setTimeout(() => {
      setShowRating(false);
    }, 3000);

    return () => clearTimeout(timer);
  };

  const handleRatingSubmit = (rating: number, feedback: string) => {
    // 提交到Background保存
    chrome.runtime.sendMessage({
      type: 'SUBMIT_RATING',
      payload: { recommendationId: selectedRecommendation, rating, feedback }
    });
    setShowRating(false);
  };

  return (
    <div>
      <SystemResultList onSelect={handleSelect} />
      
      {/* 条件渲染评分面板 */}
      {showRating && selectedRecommendation && (
        <div className="mt-4 animate-fade-in">
          <ConfidenceRatingPanel
            recommendationId={selectedRecommendation}
            onSubmit={handleRatingSubmit}
          />
        </div>
      )}
    </div>
  );
};
```

#### 动画验收

- [ ] ✅ 面板淡入动画（300ms）
- [ ] ✅ 面板淡出动画（300ms）
- [ ] ✅ 动画流畅无卡顿

---

### T6.3 - UI集成测试

#### 功能验收标准

- [ ] ✅ Sidebar正常显示所有组件（搜索框+结果列表+评分面板）
- [ ] ✅ 布局合理，无样式冲突
- [ ] ✅ 响应式适配（宽度300-400px）

#### 视觉验收

截图对比测试：

- [ ] ✅ 空状态：显示placeholder
- [ ] ✅ 加载状态：显示骨架屏
- [ ] ✅ 结果状态：显示Top3推荐
- [ ] ✅ 评分状态：显示评分面板
- [ ] ✅ 成功状态：显示感谢信息

---

### T7.1 - FeedbackRepository数据存储

#### 功能验收标准

- [ ] ✅ 保存用户评分到chrome.storage.local
- [ ] ✅ 关联推荐日志ID
- [ ] ✅ 存储字段：rating/feedback/timestamp

#### 代码验收标准

```typescript
export interface FeedbackRecord {
  id: string;
  recommendationId: string;
  rating: number; // 1-5
  feedback?: string;
  timestamp: number;
}

export class FeedbackRepository {
  private static readonly STORAGE_KEY = 'user_feedbacks';

  static async saveFeedback(record: FeedbackRecord): Promise<void> {
    const feedbacks = await this.getAllFeedbacks();
    feedbacks.push(record);
    await chrome.storage.local.set({ [this.STORAGE_KEY]: feedbacks });
  }

  static async getAllFeedbacks(): Promise<FeedbackRecord[]> {
    const result = await chrome.storage.local.get(this.STORAGE_KEY);
    return result[this.STORAGE_KEY] || [];
  }

  static async getFeedbacksByRating(rating: number): Promise<FeedbackRecord[]> {
    const feedbacks = await this.getAllFeedbacks();
    return feedbacks.filter(f => f.rating === rating);
  }

  static async getAverageRating(): Promise<number> {
    const feedbacks = await this.getAllFeedbacks();
    if (feedbacks.length === 0) return 0;
    
    const sum = feedbacks.reduce((acc, f) => acc + f.rating, 0);
    return sum / feedbacks.length;
  }
}
```

#### 测试验证

- [ ] ✅ 保存反馈成功
- [ ] ✅ 读取反馈成功
- [ ] ✅ 计算平均评分准确

---

### T7.2 - Background消息监听

#### 功能验收标准

- [ ] ✅ 监听SUBMIT_RATING消息
- [ ] ✅ 保存反馈数据
- [ ] ✅ 返回成功状态

#### 代码验收标准

```typescript
// 在background.ts中添加
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SUBMIT_RATING') {
    const { recommendationId, rating, feedback } = message.payload;
    
    const record: FeedbackRecord = {
      id: crypto.randomUUID(),
      recommendationId,
      rating,
      feedback,
      timestamp: Date.now()
    };

    FeedbackRepository.saveFeedback(record)
      .then(() => sendResponse({ success: true }))
      .catch(error => sendResponse({ success: false, error: error.message }));

    return true; // 异步响应
  }
});
```

---

### T7.3 - 统计报表生成

#### 功能验收标准

- [ ] ✅ 计算平均评分
- [ ] ✅ 统计各星级分布
- [ ] ✅ 导出JSON格式报表

#### 代码验收标准

```typescript
export class FeedbackAnalytics {
  static async generateReport(): Promise<{
    totalFeedbacks: number;
    averageRating: number;
    distribution: Record<number, number>;
    recentFeedbacks: FeedbackRecord[];
  }> {
    const feedbacks = await FeedbackRepository.getAllFeedbacks();

    const distribution = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
    feedbacks.forEach(f => {
      distribution[f.rating]++;
    });

    const avgRating = await FeedbackRepository.getAverageRating();

    return {
      totalFeedbacks: feedbacks.length,
      averageRating: avgRating,
      distribution,
      recentFeedbacks: feedbacks.slice(-10) // 最近10条
    };
  }
}
```

---

### T8.1 - US-002完整流程测试

#### 验收场景

- [ ] ✅ 搜索→推荐→选择→评分→提交→保存
- [ ] ✅ 验证评分数据正确保存
- [ ] ✅ 验证统计报表正确生成

---

### T8.2 - 回归测试

#### 验收标准

- [ ] ✅ US-001所有功能仍正常
- [ ] ✅ US-002功能全部通过
- [ ] ✅ 无新增bug
- [ ] ✅ 性能无衰减

---

## 📊 验收标准使用指南

### 每个任务完成后的检查流程

1. **功能测试** (30分钟)
   - 按照功能验收标准逐项测试
   - 记录测试结果和截图

2. **代码审查** (15分钟)
   - 检查代码质量标准
   - 运行ESLint检查
   - 确保TypeScript无类型错误

3. **文档更新** (10分钟)
   - 更新README.md（如有必要）
   - 添加代码注释
   - 记录已知问题

4. **提交代码** (5分钟)
   - Git commit with conventional message
   - 标记任务ID：`feat(T1.1): 项目初始化与构建配置`

### 任务未通过验收时的处理

如果某项验收标准未通过：

1. 🔴 **P0级别**（核心功能）：必须立即修复，不能继续下一任务
2. 🟡 **P1级别**（重要功能）：记录到issue列表，可先继续，但当天必须修复
3. 🟢 **P2级别**（优化项）：记录到backlog，可延后处理

---

**文档版本**: v1.0  
**生成日期**: 2025年12月10日  
**维护人**: 开发者A
