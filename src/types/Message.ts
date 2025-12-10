/**
 * Chrome消息类型定义
 */

/** 消息类型枚举 */
export enum MessageType {
  SEARCH_SYSTEM = 'SEARCH_SYSTEM',
  FILL_SYSTEM = 'FILL_SYSTEM',
  GET_CURRENT_SYSTEM = 'GET_CURRENT_SYSTEM',
  RECORD_CONFIDENCE = 'RECORD_CONFIDENCE',
}

/** 基础消息接口 */
export interface BaseMessage<T = unknown> {
  type: MessageType;
  payload: T;
}

/** 搜索系统消息 */
export interface SearchSystemMessage extends BaseMessage<{ query: string }> {
  type: MessageType.SEARCH_SYSTEM;
}

/** 填充系统消息 */
export interface FillSystemMessage extends BaseMessage<{ system: string }> {
  type: MessageType.FILL_SYSTEM;
}

/** 获取当前系统消息 */
export interface GetCurrentSystemMessage extends BaseMessage<void> {
  type: MessageType.GET_CURRENT_SYSTEM;
}

/** 记录置信度消息 */
export interface RecordConfidenceMessage extends BaseMessage<{
  system: string;
  level: string;
}> {
  type: MessageType.RECORD_CONFIDENCE;
}

/** 所有消息类型的联合类型 */
export type ChromeMessage =
  | SearchSystemMessage
  | FillSystemMessage
  | GetCurrentSystemMessage
  | RecordConfidenceMessage;

/** 消息响应类型 */
export interface MessageResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
