// 类型导入测试文件
// 验证所有类型定义可以正确导入和使用

import type {
  System,
  Recommendation,
  ConfidenceFeedback,
  CacheItem,
} from '@/types';

import { MessageType } from '@/types';

// 测试System类型
const testSystem: System = {
  id: 'sys-001',
  name: 'CRM系统',
  keywords: ['客户', 'kehu', 'crm', '客户关系'],
  pinyin: 'keheguanlixitong',
  category: '客户管理',
  responsibility: '管理客户信息和关系',
  contact: 'crm@company.com',
};

// 测试Recommendation类型
const testRecommendation: Recommendation = {
  system: 'CRM系统',
  confidence: 0.92,
  source: 'ai',
  reason: '关键词匹配度高',
};

// 测试ConfidenceFeedback类型
const testFeedback: ConfidenceFeedback = {
  system: 'CRM系统',
  level: 'certain',
  timestamp: Date.now(),
};

// 测试MessageType枚举
const messageType: MessageType = MessageType.SEARCH_SYSTEM;

// 测试CacheItem类型
const testCache: CacheItem<System> = {
  data: testSystem,
  expiresAt: Date.now() + 3600000,
  createdAt: Date.now(),
};

console.log('类型定义测试通过 ✓');
console.log({ testSystem, testRecommendation, testFeedback, messageType, testCache });

export {};
