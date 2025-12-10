/**
 * TodoList React学习示例
 * 
 * 学习目标：
 * 1. useState: 管理组件状态
 * 2. useCallback: 优化事件处理函数
 * 3. 列表渲染: map方法渲染列表
 * 4. 表单处理: 受控组件
 * 5. 条件渲染: 根据状态显示不同UI
 */

import { useState, useCallback } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function TodoList() {
  // 状态1: 待办事项列表
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: '学习React Hooks', completed: true },
    { id: 2, text: '完成TodoList示例', completed: false },
    { id: 3, text: '掌握useState和useCallback', completed: false },
  ]);

  // 状态2: 输入框内容
  const [inputValue, setInputValue] = useState('');

  // 状态3: 编辑模式
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');

  /**
   * 添加新的待办事项
   * 使用useCallback优化，避免每次渲染都创建新函数
   */
  const handleAdd = useCallback(() => {
    if (inputValue.trim() === '') {
      alert('请输入待办事项内容');
      return;
    }

    const newTodo: Todo = {
      id: Date.now(), // 使用时间戳作为简单的ID
      text: inputValue.trim(),
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setInputValue(''); // 清空输入框
  }, [inputValue]);

  /**
   * 删除待办事项
   */
  const handleDelete = useCallback((id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);

  /**
   * 切换完成状态
   */
  const handleToggle = useCallback((id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  /**
   * 进入编辑模式
   */
  const handleEdit = useCallback((id: number, text: string) => {
    setEditingId(id);
    setEditingText(text);
  }, []);

  /**
   * 保存编辑
   */
  const handleSaveEdit = useCallback(() => {
    if (editingText.trim() === '') {
      alert('待办事项内容不能为空');
      return;
    }

    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === editingId ? { ...todo, text: editingText.trim() } : todo
      )
    );

    setEditingId(null);
    setEditingText('');
  }, [editingId, editingText]);

  /**
   * 取消编辑
   */
  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
    setEditingText('');
  }, []);

  /**
   * 处理回车键添加
   */
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleAdd();
      }
    },
    [handleAdd]
  );

  /**
   * 处理编辑时回车键保存
   */
  const handleEditKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSaveEdit();
      } else if (e.key === 'Escape') {
        handleCancelEdit();
      }
    },
    [handleSaveEdit, handleCancelEdit]
  );

  // 统计数据
  const totalCount = todos.length;
  const completedCount = todos.filter(todo => todo.completed).length;
  const pendingCount = totalCount - completedCount;

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* 标题 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          📝 TodoList - React学习示例
        </h1>
        <p className="text-gray-600">
          演示useState、useCallback、列表渲染、表单处理等核心概念
        </p>
      </div>

      {/* 统计面板 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{totalCount}</div>
          <div className="text-sm text-gray-600">总计</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{completedCount}</div>
          <div className="text-sm text-gray-600">已完成</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
          <div className="text-sm text-gray-600">待处理</div>
        </div>
      </div>

      {/* 添加待办事项 */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="输入新的待办事项..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAdd}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            添加
          </button>
        </div>
      </div>

      {/* 待办事项列表 */}
      <div className="space-y-2">
        {todos.length === 0 ? (
          // 空状态
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">暂无待办事项，添加一个开始吧！</p>
          </div>
        ) : (
          // 列表渲染
          todos.map(todo => (
            <div
              key={todo.id}
              className={`bg-white rounded-lg shadow-sm p-4 transition-all ${
                todo.completed ? 'opacity-60' : ''
              }`}
            >
              {editingId === todo.id ? (
                // 编辑模式
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingText}
                    onChange={e => setEditingText(e.target.value)}
                    onKeyDown={handleEditKeyPress}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    保存
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    取消
                  </button>
                </div>
              ) : (
                // 普通显示模式
                <div className="flex items-center gap-3">
                  {/* 复选框 */}
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggle(todo.id)}
                    className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />

                  {/* 待办事项文本 */}
                  <span
                    className={`flex-1 ${
                      todo.completed
                        ? 'line-through text-gray-500'
                        : 'text-gray-800'
                    }`}
                  >
                    {todo.text}
                  </span>

                  {/* 操作按钮 */}
                  <button
                    onClick={() => handleEdit(todo.id, todo.text)}
                    className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    删除
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* 学习要点总结 */}
      <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <h3 className="font-semibold text-blue-800 mb-2">💡 React学习要点</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>✅ <strong>useState</strong>: 管理todos、inputValue、editingId等状态</li>
          <li>✅ <strong>useCallback</strong>: 优化handleAdd、handleDelete等事件处理函数</li>
          <li>✅ <strong>列表渲染</strong>: 使用map方法渲染todos数组</li>
          <li>✅ <strong>条件渲染</strong>: 根据editingId判断显示编辑模式还是普通模式</li>
          <li>✅ <strong>受控组件</strong>: input的value和onChange绑定state</li>
          <li>✅ <strong>事件处理</strong>: onClick、onChange、onKeyPress等事件</li>
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
