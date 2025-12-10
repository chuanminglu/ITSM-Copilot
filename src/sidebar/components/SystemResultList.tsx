import { Recommendation } from '@/types';

/**
 * SystemResultList Props接口
 */
interface SystemResultListProps {
  /** 推荐结果数组 */
  results: Recommendation[];
  /** 点击结果项回调 */
  onSelect: (recommendation: Recommendation) => void;
  /** 是否加载中 */
  loading?: boolean;
  /** 当前选中的系统ID */
  selectedId?: string | null;
}

/**
 * 系统推荐结果列表组件
 * 
 * 功能特性:
 * - 显示Top3推荐结果(按置信度降序)
 * - 显示系统名称+置信度+来源图标
 * - hover显示阴影效果
 * - 点击触发选择事件
 * - 置信度颜色分级(≥80%绿色，60-80%黄色，<60%红色)
 * - 无结果/loading状态
 * 
 * @example
 * ```tsx
 * <SystemResultList
 *   results={recommendations}
 *   onSelect={handleSelect}
 *   loading={false}
 * />
 * ```
 */
export function SystemResultList({
  results,
  onSelect,
  loading = false,
  selectedId = null,
}: SystemResultListProps) {
  /**
   * 获取置信度颜色样式
   */
  const getConfidenceColor = (confidence: number): string => {
    if (confidence >= 0.8) {
      return 'bg-green-100 text-green-800'; // 高置信度 - 绿色
    } else if (confidence >= 0.6) {
      return 'bg-yellow-50 text-yellow-600'; // 中置信度 - 黄色
    } else {
      return 'bg-red-50 text-red-600'; // 低置信度 - 红色
    }
  };

  /**
   * 获取推荐来源图标
   */
  const getSourceIcon = (source: 'ai' | 'rule'): React.ReactNode => {
    if (source === 'ai') {
      return (
        <span title="AI推荐" className="text-lg" aria-label="AI推荐">
          🤖
        </span>
      );
    } else {
      return (
        <span title="规则推荐" className="text-lg" aria-label="规则推荐">
          📊
        </span>
      );
    }
  };

  /**
   * Loading状态 - 骨架屏
   */
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  /**
   * 空状态 - 无结果
   */
  if (!results || results.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <p className="mt-4 text-sm text-gray-500">未找到匹配系统</p>
        <p className="mt-2 text-xs text-gray-400">
          请尝试其他关键词，如"客户"、"财务"、"人事"
        </p>
      </div>
    );
  }

  /**
   * 结果列表
   */
  return (
    <div className="space-y-3">
      {results.map((item, index) => {
        const isSelected = selectedId === item.system.id;
        const confidencePercent = Math.round(item.confidence * 100);

        return (
          <div
            key={item.system.id}
            onClick={() => onSelect(item)}
            className={`
              bg-white border rounded-lg p-4 cursor-pointer transition-all
              ${
                isSelected
                  ? 'border-blue-500 shadow-md ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-blue-500 hover:shadow-md'
              }
            `}
            role="button"
            tabIndex={0}
            aria-label={`选择${item.system.name}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect(item);
              }
            }}
          >
            <div className="flex items-start justify-between">
              {/* 左侧: 系统信息 */}
              <div className="flex-1 min-w-0">
                {/* 排名徽章 */}
                <span className="inline-block w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold flex items-center justify-center mb-2">
                  {index + 1}
                </span>
                
                {/* 系统名称 */}
                <h3 className="font-medium text-gray-900 truncate">
                  {item.system.name}
                </h3>
                
                {/* 系统分类和责任部门 */}
                <p className="text-sm text-gray-500 mt-1 truncate">
                  {item.system.category} · {item.system.responsibility}
                </p>
                
                {/* 推荐理由 (如果有) */}
                {item.reason && (
                  <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                    {item.reason}
                  </p>
                )}
              </div>

              {/* 右侧: 置信度和来源 */}
              <div className="flex flex-col items-end gap-2 ml-4">
                {/* 推荐来源图标 */}
                {getSourceIcon(item.source)}
                
                {/* 置信度百分比 */}
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getConfidenceColor(
                    item.confidence
                  )}`}
                >
                  {confidencePercent}%
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
