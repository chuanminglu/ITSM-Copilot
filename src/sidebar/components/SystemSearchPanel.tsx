import React, { useCallback, useEffect } from 'react';
import { SystemSearchInput } from './SystemSearchInput';
import { SystemResultList } from './SystemResultList';
import { useRecommendationStore } from '@/store';
import { searchSystem } from '@/utils';
import type { Recommendation } from '@/types/Recommendation';

/**
 * SystemSearchPanel组件属性
 */
interface SystemSearchPanelProps {
  /** 初始搜索关键字 */
  initialQuery?: string;
  /** 选择系统回调 */
  onSelectSystem?: (recommendation: Recommendation) => void;
  /** 是否禁用组件 */
  disabled?: boolean;
  /** 自定义className */
  className?: string;
}

/**
 * SystemSearchPanel - 系统搜索面板容器
 * 
 * 集成SystemSearchInput和SystemResultList组件，
 * 使用Zustand管理全局状态
 * 
 * @example
 * ```tsx
 * <SystemSearchPanel
 *   initialQuery=""
 *   onSelectSystem={(rec) => console.log(rec)}
 * />
 * ```
 */
export const SystemSearchPanel: React.FC<SystemSearchPanelProps> = ({
  initialQuery = '',
  onSelectSystem,
  disabled = false,
  className = '',
}) => {
  // ============ Zustand State ============
  const {
    queryText,
    results,
    loading,
    error,
    selectedId,
    setQuery,
    setResults,
    setLoading,
    setError,
    setSelectedId,
  } = useRecommendationStore();

  // 初始化查询关键字
  useEffect(() => {
    if (initialQuery && !queryText) {
      setQuery(initialQuery);
    }
  }, [initialQuery, queryText, setQuery]);

  // ============ 搜索处理 ============
  /**
   * 处理搜索请求
   * 使用chrome.runtime与Background通信
   * 通信失败时降级到Mock数据
   */
  const handleSearch = useCallback(async (searchQuery: string) => {
    // 更新查询文本
    setQuery(searchQuery);

    if (!searchQuery.trim()) {
      setResults([]);
      setLoading(false);
      setError(null);
      return;
    }

    // 开始加载
    setLoading(true);
    setError(null);

    try {
      // 调用chrome.runtime.sendMessage与Background通信
      const results = await searchSystem(searchQuery, 5000);
      setResults(results);
    } catch (error) {
      console.error('[Sidebar] 搜索失败，使用Mock数据降级:', error);
      
      // 降级到Mock数据
      const mockResults: Recommendation[] = [
        {
          id: 'rec-1',
          system: {
            id: 'sys-001',
            name: 'CRM系统',
            category: '客户管理',
            responsibility: 'IT部',
            keywords: ['CRM', '客户关系管理', 'kehu'],
            pinyin: 'keheguanxiguanlixitong',
          },
          confidence: 0.92,
          reason: 'AI推荐：高度匹配',
          source: 'ai',
          timestamp: Date.now(),
        },
        {
          id: 'rec-2',
          system: {
            id: 'sys-002',
            name: '客户服务系统',
            category: '客户服务',
            responsibility: '客服部',
            keywords: ['客服', '服务', 'kefu'],
            pinyin: 'kehufuwuxitong',
          },
          confidence: 0.75,
          reason: '规则匹配：包含关键字',
          source: 'rule',
          timestamp: Date.now(),
        },
        {
          id: 'rec-3',
          system: {
            id: 'sys-003',
            name: '客户数据平台',
            category: '数据分析',
            responsibility: '数据部',
            keywords: ['数据', '分析', 'shuju'],
            pinyin: 'kehushujupingtai',
          },
          confidence: 0.58,
          reason: '规则匹配：模糊匹配',
          source: 'rule',
          timestamp: Date.now(),
        },
      ];

      // 设置降级数据，并显示警告
      setResults(mockResults);
      setError('后台服务未响应，使用本地数据');
    }
  }, [setQuery, setResults, setLoading, setError]);

  // ============ 选择处理 ============
  /**
   * 处理系统选择
   */
  const handleSelect = useCallback((recommendation: Recommendation) => {
    setSelectedId(recommendation.id);
    onSelectSystem?.(recommendation);
  }, [onSelectSystem, setSelectedId]);

  // ============ 重试处理 ============
  /**
   * 重试搜索
   */
  const handleRetry = useCallback(() => {
    handleSearch(queryText);
  }, [queryText, handleSearch]);

  // ============ 键盘事件 ============
  /**
   * 处理ESC键清空搜索
   */
  const reset = useRecommendationStore(state => state.reset);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        reset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [reset]);

  // ============ 渲染 ============
  // 计算显示状态
  const isLoading = loading;
  const hasError = error !== null;
  const isEmpty = !isLoading && !hasError && results.length === 0 && queryText.trim() === '';
  
  return (
    <div
      className={`
        w-full max-w-[400px] xl:max-w-[400px] lg:max-w-[350px]
        p-4 mx-auto
        bg-white rounded-lg shadow-md
        flex flex-col gap-4
        ${className}
      `}
    >
      {/* 搜索输入框 */}
      <SystemSearchInput
        value={queryText}
        onSearch={handleSearch}
        placeholder="搜索ITSM系统..."
        disabled={disabled}
        loading={isLoading}
      />

      {/* 错误提示 */}
      {hasError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-red-600">⚠️</span>
            <span className="text-sm text-red-800">{error}</span>
          </div>
          <button
            onClick={handleRetry}
            className="px-3 py-1 text-sm text-red-600 hover:bg-red-100 rounded transition-colors"
            disabled={disabled}
          >
            重试
          </button>
        </div>
      )}

      {/* 加载状态 */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-sm text-gray-600">搜索中...</span>
        </div>
      )}

      {/* 结果列表 */}
      {!isLoading && !hasError && (
        <SystemResultList
          results={results}
          onSelect={handleSelect}
          loading={false}
          selectedId={selectedId}
        />
      )}

      {/* 空状态提示 */}
      {isEmpty && (
        <div className="text-center py-8 text-gray-400">
          <div className="text-4xl mb-2">🔍</div>
          <div className="text-sm">输入关键字开始搜索</div>
        </div>
      )}
    </div>
  );
};
