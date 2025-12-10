# React学习笔记 - TodoList实战

> **学习时间**: 2025-12-10
> **学习目标**: 掌握React核心Hooks和组件开发基础
> **实战项目**: TodoList完整增删改查功能

---

## 📚 学习内容总结

### 1. useState - 状态管理

**基本用法**:
```typescript
const [state, setState] = useState(initialValue);
```

**TodoList中的应用**:
```typescript
// 管理待办事项列表
const [todos, setTodos] = useState<Todo[]>([]);

// 管理输入框内容
const [inputValue, setInputValue] = useState('');

// 管理编辑状态
const [editingId, setEditingId] = useState<number | null>(null);
```

**关键要点**:
- ✅ useState返回一个数组：[当前值, 更新函数]
- ✅ 更新函数可以接收新值，或接收函数（函数参数是上一个状态）
- ✅ 使用TypeScript泛型定义状态类型：`useState<Todo[]>`
- ✅ 状态更新是异步的，React会批量处理
- ✅ 更新对象/数组时，必须创建新的对象/数组（不可变性）

**最佳实践**:
```typescript
// ❌ 错误：直接修改状态
todos.push(newTodo);
setTodos(todos);

// ✅ 正确：创建新数组
setTodos([...todos, newTodo]);

// ✅ 更好：使用函数式更新，避免闭包陷阱
setTodos(prevTodos => [...prevTodos, newTodo]);
```

---

### 2. useCallback - 性能优化

**基本用法**:
```typescript
const memoizedCallback = useCallback(() => {
  // 回调函数逻辑
}, [依赖项数组]);
```

**TodoList中的应用**:
```typescript
// 添加待办事项（依赖inputValue）
const handleAdd = useCallback(() => {
  if (inputValue.trim() === '') return;
  const newTodo = { id: Date.now(), text: inputValue, completed: false };
  setTodos(prevTodos => [...prevTodos, newTodo]);
  setInputValue('');
}, [inputValue]);

// 删除待办事项（无依赖）
const handleDelete = useCallback((id: number) => {
  setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
}, []);
```

**关键要点**:
- ✅ useCallback返回一个记忆化的回调函数
- ✅ 只有依赖项变化时，才会创建新的函数
- ✅ 避免在每次渲染时创建新函数，提升性能
- ✅ 特别适用于传递给子组件的回调函数

**何时使用**:
- 传递给子组件的事件处理函数
- 作为useEffect等Hook的依赖项
- 性能敏感的场景

---

### 3. 列表渲染 - map方法

**基本模式**:
```typescript
{todos.map(todo => (
  <div key={todo.id}>
    {todo.text}
  </div>
))}
```

**TodoList完整示例**:
```typescript
{todos.map(todo => (
  <div
    key={todo.id}
    className={todo.completed ? 'opacity-60' : ''}
  >
    <input
      type="checkbox"
      checked={todo.completed}
      onChange={() => handleToggle(todo.id)}
    />
    <span className={todo.completed ? 'line-through' : ''}>
      {todo.text}
    </span>
    <button onClick={() => handleEdit(todo.id, todo.text)}>编辑</button>
    <button onClick={() => handleDelete(todo.id)}>删除</button>
  </div>
))}
```

**关键要点**:
- ✅ 必须提供唯一的key属性（React用于优化渲染）
- ✅ key最好使用稳定的ID，不要用索引（除非列表不会重新排序）
- ✅ 在map回调中直接返回JSX元素
- ✅ 可以结合条件渲染使用className

**空状态处理**:
```typescript
{todos.length === 0 ? (
  <div>暂无待办事项</div>
) : (
  todos.map(todo => ...)
)}
```

---

### 4. 条件渲染

**三种常用模式**:

1. **if/else - 组件级**:
```typescript
if (loading) {
  return <div>加载中...</div>;
}
return <div>内容</div>;
```

2. **三元运算符 - 表达式级**:
```typescript
{editingId === todo.id ? (
  <input />  // 编辑模式
) : (
  <span />   // 显示模式
)}
```

3. **逻辑与 && - 可选渲染**:
```typescript
{isError && <div>错误提示</div>}
{completed && <span>✓</span>}
```

**TodoList中的应用**:
```typescript
// 编辑模式切换
{editingId === todo.id ? (
  <div className="flex gap-2">
    <input value={editingText} />
    <button onClick={handleSaveEdit}>保存</button>
  </div>
) : (
  <div className="flex items-center">
    <span>{todo.text}</span>
    <button onClick={() => handleEdit(todo.id, todo.text)}>编辑</button>
  </div>
)}

// 动态className
<span className={todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}>
```

---

### 5. 表单处理 - 受控组件

**受控组件模式**:
```typescript
// 1. 创建状态
const [inputValue, setInputValue] = useState('');

// 2. 绑定value和onChange
<input
  value={inputValue}
  onChange={e => setInputValue(e.target.value)}
/>

// 3. 使用状态值
const handleSubmit = () => {
  console.log(inputValue);
};
```

**TodoList完整示例**:
```typescript
// 添加待办事项的输入框
<input
  type="text"
  value={inputValue}
  onChange={e => setInputValue(e.target.value)}
  onKeyPress={handleKeyPress}
  placeholder="输入新的待办事项..."
/>

// 编辑待办事项的输入框
<input
  type="text"
  value={editingText}
  onChange={e => setEditingText(e.target.value)}
  onKeyDown={handleEditKeyPress}
  autoFocus
/>
```

**关键要点**:
- ✅ 受控组件：React状态作为"单一数据源"
- ✅ value由state控制，onChange更新state
- ✅ 输入框的值始终与state同步
- ✅ 便于验证、格式化、重置

**非受控组件对比**:
```typescript
// 非受控（不推荐用于表单）
<input ref={inputRef} />
const value = inputRef.current.value;
```

---

### 6. 事件处理

**常用事件**:

1. **点击事件**:
```typescript
<button onClick={handleAdd}>添加</button>
<button onClick={() => handleDelete(todo.id)}>删除</button>
```

2. **输入事件**:
```typescript
<input onChange={e => setInputValue(e.target.value)} />
```

3. **键盘事件**:
```typescript
// 回车添加
<input onKeyPress={(e) => {
  if (e.key === 'Enter') handleAdd();
}} />

// 回车保存，Esc取消
<input onKeyDown={(e) => {
  if (e.key === 'Enter') handleSaveEdit();
  if (e.key === 'Escape') handleCancelEdit();
}} />
```

4. **复选框事件**:
```typescript
<input
  type="checkbox"
  checked={todo.completed}
  onChange={() => handleToggle(todo.id)}
/>
```

**关键要点**:
- ✅ React事件是合成事件（SyntheticEvent），跨浏览器兼容
- ✅ 事件名使用驼峰命名：onClick, onChange, onKeyPress
- ✅ 传递函数引用，不是函数调用：onClick={handleAdd}
- ✅ 需要传参时使用箭头函数：onClick={() => handleDelete(id)}

---

### 7. 数组操作方法

**TodoList中的核心操作**:

1. **添加 - 扩展运算符**:
```typescript
setTodos(prevTodos => [...prevTodos, newTodo]);
```

2. **删除 - filter**:
```typescript
setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
```

3. **修改 - map**:
```typescript
// 切换完成状态
setTodos(prevTodos =>
  prevTodos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  )
);

// 修改文本
setTodos(prevTodos =>
  prevTodos.map(todo =>
    todo.id === editingId ? { ...todo, text: editingText } : todo
  )
);
```

4. **统计 - filter + length**:
```typescript
const totalCount = todos.length;
const completedCount = todos.filter(todo => todo.completed).length;
const pendingCount = totalCount - completedCount;
```

**关键要点**:
- ✅ 所有操作都创建新数组（不可变性原则）
- ✅ filter: 过滤数组，返回满足条件的元素
- ✅ map: 转换数组，返回新数组
- ✅ 使用扩展运算符{...obj}复制对象

---

## 🎯 TodoList功能清单

### 已实现功能 ✅

- [x] **查看列表**: 展示所有待办事项
- [x] **添加**: 输入框添加新的待办事项
- [x] **删除**: 点击删除按钮移除待办事项
- [x] **修改**: 点击编辑按钮进入编辑模式，修改文本
- [x] **切换状态**: 点击复选框切换完成/未完成状态
- [x] **统计**: 显示总数、已完成数、待处理数
- [x] **空状态**: 无待办事项时显示提示
- [x] **键盘快捷键**:
  - Enter: 添加待办事项 / 保存编辑
  - Escape: 取消编辑
- [x] **样式优化**: 完成的待办事项显示删除线和降低透明度

### 技术要点覆盖 ✅

- [x] useState管理多个状态
- [x] useCallback优化事件处理函数
- [x] 列表渲染（map）
- [x] 条件渲染（三元、逻辑与）
- [x] 受控组件（表单输入）
- [x] 事件处理（点击、输入、键盘）
- [x] 数组操作（filter, map, 扩展运算符）
- [x] TypeScript类型定义

---

## 💡 学习心得

### 核心概念理解

1. **组件状态（State）**:
   - 状态是组件的"记忆"，状态改变会触发重新渲染
   - 使用useState管理状态，永远不要直接修改状态
   - 状态更新是异步的，使用函数式更新避免闭包陷阱

2. **不可变性原则**:
   - 更新对象/数组时，必须创建新的对象/数组
   - 使用扩展运算符`[...array]`、`{...object}`
   - filter、map等方法天然返回新数组

3. **性能优化**:
   - useCallback避免不必要的函数重新创建
   - key属性帮助React优化列表渲染
   - 条件渲染避免渲染不需要的组件

4. **代码组织**:
   - 单一职责：每个函数只做一件事
   - 命名规范：handle开头表示事件处理函数
   - TypeScript类型：提前发现错误，提升代码质量

### 下一步学习计划

- [ ] useEffect - 副作用处理（API请求、订阅）
- [ ] useMemo - 计算结果缓存
- [ ] useRef - DOM引用和可变引用
- [ ] 自定义Hooks - 逻辑复用
- [ ] Context API - 跨组件状态共享
- [ ] 组件拆分 - TodoItem子组件

---

## 🔗 参考资源

- [React官方文档 - Hooks](https://react.dev/reference/react)
- [TypeScript官方文档](https://www.typescriptlang.org/)
- [TailwindCSS官方文档](https://tailwindcss.com/)

---

**学习完成时间**: 2025-12-10
**下一步**: 将学到的知识应用到ITSM智能辅助插件的Sidebar组件开发中
