// Content Script
console.log('ITSM Assistant Content Script loaded');

// 监听来自Sidebar的消息
window.addEventListener('message', (event) => {
  // 安全校验
  if (event.source !== window) return;
  
  const message = event.data;
  if (!message || message.source !== 'itsm-assistant') return;
  
  console.log('Content Script received message:', message);
  
  // TODO: 实现DOM操作逻辑
});
