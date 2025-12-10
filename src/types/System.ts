/**
 * 系统实体类型定义
 * 表示ITSM中的一个系统
 */
export interface System {
  /** 系统唯一标识符 */
  id: string;
  
  /** 系统显示名称 */
  name: string;
  
  /** 搜索关键词（中文+英文+缩写） */
  keywords: string[];
  
  /** 拼音字符串（用于拼音搜索） */
  pinyin: string;
  
  /** 系统分类（如：财务/客户/人事/IT/运维） */
  category: string;
  
  /** 系统职责描述 */
  responsibility: string;
  
  /** 联系方式（可选） */
  contact?: string;
}

/**
 * 系统配置列表类型
 */
export type SystemList = System[];
