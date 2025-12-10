import React, { useState, useCallback, useEffect } from 'react';
import { SystemSearchInput } from './SystemSearchInput';
import { SystemResultList } from './SystemResultList';
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
 * 面板状态类型
 */
type PanelState = 'idle' | 'loading' | 'success' | 'error';

/**
 * SystemSearchPanel - 系统搜索面板容器
 * 
 * 集成SystemSearchInput和SystemResultList组件，
 * 管理搜索状态（idle/loading/success/error）
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
  // ============ 状态管理 ============
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Recommendation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [panelState, setPanelState] = useState<PanelState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // ============ 搜索处理 ============
  /**
   * 处理搜索请求
   * TODO: 后续集成chrome.runtime通信
   */
  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setPanelState('idle');
      return;
    }

    // 开始加载
    setPanelState('loading');
    setErrorMessage('');

    try {
      // TODO: 调用chrome.runtime.sendMessage与Background通信
      // 现在使用Mock数据模拟
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock数据
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

      setResults(mockResults);
      setPanelState('success');
    } catch (error) {
      console.error('搜索失败:', error);
      setErrorMessage('网络不稳定，已切换到基础搜索');
      setPanelState('error');
      setResults([]);
    }
  }, []);

  // ============ 选择处理 ============
  /**
   * 处理系统选择
   */
  const handleSelect = useCallback((recommendation: Recommendation) => {
    setSelectedId(recommendation.id);
    onSelectSystem?.(recommendation);
  }, [onSelectSystem]);

  // ============ 重试处理 ============
  /**
   * 重试搜索
   */
  const handleRetry = useCallback(() => {
    handleSearch(query);
  }, [query, handleSearch]);

  // ============ 键盘事件 ============
  /**
   * 处理ESC键清空搜索
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setQuery('');
        setResults([]);
        setPanelState('idle');
        setSelectedId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ============ 渲染 ============
  return (
    <div
      className={`
        w-[400px] p-4 m-2
        bg-white rounded-lg shadow-md
        flex flex-col gap-4
        ${className}
      `}
    >
      {/* 搜索输入框 */}
      <SystemSearchInput
        value={query}
        onSearch={handleSearch}
        placeholder="搜索ITSM系统..."
        disabled={disabled}
        loading={panelState === 'loading'}
      />

      {/* 错误提示 */}
      {panelState === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-red-600">⚠️</span>
            <span className="text-sm text-red-800">{errorMessage}</span>
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
      {panelState === 'loading' && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-sm text-gray-600">搜索中...</span>
        </div>
      )}

      {/* 结果列表 */}
      {(panelState === 'success' || panelState === 'idle') && (
        <SystemResultList
          results={results}
          onSelect={handleSelect}
          loading={false}
          selectedId={selectedId}
        />
      )}

      {/* 空状态提示 */}
      {panelState === 'idle' && results.length === 0 && query.trim() === '' && (
        <div className="text-center py-8 text-gray-400">
          <div className="text-4xl mb-2">🔍</div>
          <div className="text-sm">输入关键字开始搜索</div>
        </div>
      )}
    </div>
  );
};
