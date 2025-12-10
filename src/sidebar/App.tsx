function App() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <h1 className="text-xl font-semibold text-gray-800">
          ITSM智能辅助
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          智能系统推荐 · 快速填充
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        {/* Search Section */}
        <section className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            搜索ITSM系统
          </label>
          <input
            type="text"
            placeholder="输入系统名称、关键词或拼音..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
          <p className="text-xs text-gray-500 mt-2">
            支持中文、拼音、英文搜索，如"客户"、"kehu"、"CRM"
          </p>
        </section>

        {/* Results Section */}
        <section>
          <h2 className="text-sm font-medium text-gray-700 mb-3">
            推荐系统 (Top 3)
          </h2>
          
          {/* Example Result Items */}
          <div className="space-y-3">
            {/* Result Item 1 */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">客户关系管理系统</h3>
                  <p className="text-sm text-gray-500 mt-1">CRM · 销售部</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  AI 95%
                </span>
              </div>
            </div>

            {/* Result Item 2 */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">企业资源计划系统</h3>
                  <p className="text-sm text-gray-500 mt-1">ERP · 财务部</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  规则 78%
                </span>
              </div>
            </div>

            {/* Result Item 3 */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">人力资源管理系统</h3>
                  <p className="text-sm text-gray-500 mt-1">HR · 人力资源部</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  规则 65%
                </span>
              </div>
            </div>
          </div>

          {/* Empty State (hidden when results exist) */}
          <div className="hidden text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="mt-4 text-sm text-gray-500">
              暂无搜索结果
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>已加载 55 个系统</span>
          <span>v1.0.0</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
