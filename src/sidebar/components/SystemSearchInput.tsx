import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * SystemSearchInput Props接口
 */
interface SystemSearchInputProps {
  /** 搜索值 */
  value?: string;
  /** 搜索值变化回调 (防抖后触发) */
  onSearch: (query: string) => void;
  /** placeholder提示文本 */
  placeholder?: string;
  /** 防抖延迟时间 (ms) */
  debounceDelay?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否显示加载状态 */
  loading?: boolean;
}

/**
 * 系统搜索输入框组件
 * 
 * 功能特性:
 * - 支持中文、拼音、英文输入
 * - 300ms防抖优化性能
 * - 显示搜索图标
 * - focus状态蓝色边框
 * - 实时字符计数
 * 
 * @example
 * ```tsx
 * <SystemSearchInput
 *   value={query}
 *   onSearch={handleSearch}
 *   placeholder="搜索系统（支持中文/拼音）"
 *   debounceDelay={300}
 * />
 * ```
 */
export function SystemSearchInput({
  value: externalValue = '',
  onSearch,
  placeholder = '搜索系统（支持中文/拼音）',
  debounceDelay = 300,
  disabled = false,
  loading = false,
}: SystemSearchInputProps) {
  // 内部状态管理输入值
  const [inputValue, setInputValue] = useState(externalValue);
  
  // 防抖定时器引用
  const debounceTimerRef = useRef<number | null>(null);

  // 同步外部value变化
  useEffect(() => {
    setInputValue(externalValue);
  }, [externalValue]);

  /**
   * 处理输入变化 - 带防抖
   */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);

      // 清除之前的定时器
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // 设置新的防抖定时器
      debounceTimerRef.current = window.setTimeout(() => {
        onSearch(newValue);
      }, debounceDelay);
    },
    [onSearch, debounceDelay]
  );

  /**
   * 清空输入框
   */
  const handleClear = useCallback(() => {
    setInputValue('');
    onSearch('');
    
    // 清除防抖定时器
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
  }, [onSearch]);

  /**
   * 组件卸载时清理定时器
   */
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      {/* 搜索图标 */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          className={`w-5 h-5 ${loading ? 'text-blue-500 animate-spin' : 'text-gray-400'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {loading ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          )}
        </svg>
      </div>

      {/* 输入框 */}
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full pl-10 pr-10 py-3 
          border border-gray-300 rounded-lg 
          focus:ring-2 focus:ring-blue-500 focus:border-transparent 
          outline-none transition-all
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
          ${loading ? 'opacity-75' : ''}
        `}
        aria-label="搜索ITSM系统"
      />

      {/* 清空按钮 */}
      {inputValue && !disabled && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="清空搜索"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}

      {/* 提示文本 */}
      <p className="text-xs text-gray-500 mt-2">
        支持中文、拼音、英文搜索，如"客户"、"kehu"、"CRM"
      </p>
    </div>
  );
}
