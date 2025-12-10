/**
 * 存储相关类型定义
 */

/** LocalStorage键名常量 */
export enum StorageKey {
  SYSTEMS = 'systems',
  CONFIDENCE_RECORDS = 'confidence_records',
  SEARCH_LOGS = 'search_logs',
  CACHE = 'cache',
  USER_SETTINGS = 'user_settings',
}

/** 缓存项类型 */
export interface CacheItem<T = unknown> {
  /** 缓存数据 */
  data: T;
  
  /** 过期时间戳 */
  expiresAt: number;
  
  /** 创建时间戳 */
  createdAt: number;
}

/** 缓存存储类型 */
export type CacheStorage = Record<string, CacheItem>;

/** 搜索日志项 */
export interface SearchLog {
  /** 搜索查询词 */
  query: string;
  
  /** 搜索结果数 */
  resultCount: number;
  
  /** 选择的系统 */
  selectedSystem?: string;
  
  /** 搜索耗时 */
  duration: number;
  
  /** 时间戳 */
  timestamp: number;
}

/** 用户设置 */
export interface UserSettings {
  /** 是否启用AI推荐 */
  enableAI: boolean;
  
  /** AI超时时间（毫秒） */
  aiTimeout: number;
  
  /** 缓存过期时间（毫秒） */
  cacheTTL: number;
  
  /** 主题模式 */
  theme: 'light' | 'dark' | 'auto';
}
