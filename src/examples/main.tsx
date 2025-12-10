import React from 'react';
import ReactDOM from 'react-dom/client';
import TodoList from './TodoList';
import '../sidebar/index.css'; // 使用相同的TailwindCSS样式

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TodoList />
  </React.StrictMode>
);
