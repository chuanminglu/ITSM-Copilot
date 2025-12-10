/**
 * 全局类型导出
 * 统一入口文件，方便导入
 */

export * from './System';
export * from './Template';
export * from './Recommendation';
export * from './Confidence';
export * from './Message';
export * from './Storage';

/**
 * 全局常量类型
 */

/** 默认搜索结果数量 */
export const DEFAULT_RESULT_LIMIT = 3;

/** 默认AI超时时间（毫秒） */
export const DEFAULT_AI_TIMEOUT = 5000;

/** 默认缓存过期时间（毫秒） - 1小时 */
export const DEFAULT_CACHE_TTL = 60 * 60 * 1000;

/** 日志保留时间（毫秒） - 30天 */
export const LOG_RETENTION_TIME = 30 * 24 * 60 * 60 * 1000;
