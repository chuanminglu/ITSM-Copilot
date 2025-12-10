// Background Service Worker
console.log('ITSM Assistant Background Service Worker loaded');

// 监听扩展安装事件
chrome.runtime.onInstalled.addListener(() => {
  console.log('ITSM Assistant Extension installed');
});

// 监听扩展图标点击事件，打开侧边栏
chrome.action.onClicked.addListener((tab) => {
  if (tab.id) {
    chrome.sidePanel.open({ tabId: tab.id }).catch((error) => {
      console.error('Failed to open side panel:', error);
    });
  }
});

// 监听来自Sidebar的消息
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  console.log('[Background] Received message:', request);
  
  // PING检查
  if (request.type === 'PING') {
    sendResponse({ success: true, data: 'pong' });
    return true;
  }
  
  // 搜索系统
  if (request.type === 'SEARCH_SYSTEM') {
    const query = request.payload?.query || '';
    console.log('[Background] Search query:', query);
    
    // TODO: 实际搜索逻辑（规则引擎 + AI增强）
    // 现在返回Mock数据
    setTimeout(() => {
      const mockResults = [
        {
          id: `rec-bg-1-${Date.now()}`,
          system: {
            id: 'sys-bg-001',
            name: `${query}系统（Background）`,
            category: '搜索结果',
            responsibility: 'IT部',
            keywords: [query],
            pinyin: 'background',
          },
          confidence: 0.95,
          reason: 'Background规则引擎匹配',
          source: 'rule',
          timestamp: Date.now(),
        },
      ];
      
      sendResponse({
        success: true,
        data: { results: mockResults },
      });
    }, 300);
    
    return true; // 异步响应
  }
  
  // 未知消息类型
  sendResponse({ success: false, error: '未知消息类型' });
  return true;
});
