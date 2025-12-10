import { SystemSearchPanel } from './components';
import type { Recommendation } from '@/types/Recommendation';

function App() {
  /**
   * 处理系统选择
   */
  const handleSelectSystem = (recommendation: Recommendation) => {
    console.log('[Sidebar] Selected system:', recommendation);
    // TODO: 调用Content Script填充ITSM表单
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 shadow-sm">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
          ITSM智能辅助
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          智能系统推荐 · 快速填充
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-3 sm:p-6">
        <SystemSearchPanel
          onSelectSystem={handleSelectSystem}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-4 sm:px-6 py-2 sm:py-3">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>已加载 55 个系统</span>
          <span>v1.0.0</span>
        </div>
      </footer>
    </div>
  );
}

export default App;

