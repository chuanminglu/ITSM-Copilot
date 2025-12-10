/**
 * 置信度等级
 */
export type ConfidenceLevel = 'certain' | 'uncertain' | 'very-uncertain';

/**
 * 置信度反馈数据
 */
export interface ConfidenceFeedback {
  /** 系统名称 */
  system: string;
  
  /** 置信度等级 */
  level: ConfidenceLevel;
  
  /** 反馈时间戳 */
  timestamp: number;
  
  /** 用户ID（可选） */
  userId?: string;
}

/**
 * 置信度统计数据
 */
export interface ConfidenceStats {
  /** 总反馈数 */
  total: number;
  
  /** 确定数量 */
  certain: number;
  
  /** 不太确定数量 */
  uncertain: number;
  
  /** 不确定数量 */
  veryUncertain: number;
  
  /** 置信率（确定/总数） */
  confidenceRate: number;
}
