// Background Service Worker
console.log('ITSM Assistant Background Service Worker loaded');

// 监听扩展安装事件
chrome.runtime.onInstalled.addListener(() => {
  console.log('ITSM Assistant Extension installed');
});

// 监听来自Sidebar的消息
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  console.log('Background received message:', request);
  
  if (request.type === 'SEARCH_SYSTEM') {
    // TODO: 实现系统搜索逻辑
    sendResponse({ success: true, results: [] });
  }
  
  return true; // 保持消息通道开放
});
