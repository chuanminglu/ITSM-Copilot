import { System } from './System';

/**
 * 系统推荐结果类型定义
 */
export interface Recommendation {
  /** 推荐的系统 */
  system: System;
  
  /** 置信度（0-1之间） */
  confidence: number;
  
  /** 推荐来源 */
  source: 'ai' | 'rule';
  
  /** 推荐理由（可选） */
  reason?: string;
}

/**
 * 推荐结果列表类型（通常返回Top3）
 */
export type RecommendationList = Recommendation[];

/**
 * 搜索请求类型
 */
export interface SearchRequest {
  /** 搜索查询词 */
  query: string;
  
  /** 最大返回结果数 */
  limit?: number;
}

/**
 * 搜索响应类型
 */
export interface SearchResponse {
  /** 推荐结果列表 */
  results: RecommendationList;
  
  /** 搜索耗时（毫秒） */
  duration: number;
  
  /** 使用的推荐策略 */
  strategy: 'ai' | 'rule' | 'hybrid';
}
