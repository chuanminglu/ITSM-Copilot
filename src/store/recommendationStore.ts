import { create } from 'zustand';
import type { Recommendation } from '@/types/Recommendation';

/**
 * 推荐状态接口
 */
interface RecommendationState {
  /** 当前搜索关键字 */
  queryText: string;
  
  /** 推荐结果列表（Top3） */
  results: Recommendation[];
  
  /** 加载状态 */
  loading: boolean;
  
  /** 错误信息 */
  error: string | null;
  
  /** 当前选中的推荐ID */
  selectedId: string | null;

  // ============ Actions ============
  
  /**
   * 设置搜索关键字
   */
  setQuery: (query: string) => void;
  
  /**
   * 设置推荐结果
   */
  setResults: (results: Recommendation[]) => void;
  
  /**
   * 设置加载状态
   */
  setLoading: (loading: boolean) => void;
  
  /**
   * 设置错误信息
   */
  setError: (error: string | null) => void;
  
  /**
   * 设置选中的推荐
   */
  setSelectedId: (id: string | null) => void;
  
  /**
   * 重置所有状态
   */
  reset: () => void;
}

/**
 * 推荐状态Store
 * 
 * 使用Zustand管理Sidebar的推荐搜索状态
 * 
 * @example
 * ```tsx
 * const { queryText, results, setQuery } = useRecommendationStore();
 * 
 * // 使用浅比较优化性能
 * const { queryText, setQuery } = useRecommendationStore(
 *   state => ({ queryText: state.queryText, setQuery: state.setQuery })
 * );
 * ```
 */
export const useRecommendationStore = create<RecommendationState>((set) => ({
  // ============ Initial State ============
  queryText: '',
  results: [],
  loading: false,
  error: null,
  selectedId: null,

  // ============ Actions ============
  setQuery: (query: string) => set({ queryText: query }),
  
  setResults: (results: Recommendation[]) => 
    set({ results, loading: false, error: null }),
  
  setLoading: (loading: boolean) => set({ loading }),
  
  setError: (error: string | null) => 
    set({ error, loading: false }),
  
  setSelectedId: (id: string | null) => set({ selectedId: id }),
  
  reset: () => set({
    queryText: '',
    results: [],
    loading: false,
    error: null,
    selectedId: null,
  }),
}));

/**
 * 推荐状态选择器（优化性能）
 */
export const recommendationSelectors = {
  /** 获取搜索查询 */
  query: (state: RecommendationState) => state.queryText,
  
  /** 获取推荐结果 */
  results: (state: RecommendationState) => state.results,
  
  /** 获取加载状态 */
  loading: (state: RecommendationState) => state.loading,
  
  /** 获取错误信息 */
  error: (state: RecommendationState) => state.error,
  
  /** 获取选中ID */
  selectedId: (state: RecommendationState) => state.selectedId,
  
  /** 获取是否有结果 */
  hasResults: (state: RecommendationState) => state.results.length > 0,
  
  /** 获取结果数量 */
  resultCount: (state: RecommendationState) => state.results.length,
};
