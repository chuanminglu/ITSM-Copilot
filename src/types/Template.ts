/**
 * 需求模板类型定义
 * 表示不同类型的需求模板（Bug/优化/新功能等）
 */
export interface Template {
  /** 模板唯一标识符 */
  id: string;
  
  /** 模板名称 */
  name: string;
  
  /** 模板描述 */
  description: string;
  
  /** 模板类型 */
  type: 'bug' | 'optimization' | 'new-feature' | 'other';
  
  /** 必填字段列表 */
  fields: TemplateField[];
  
  /** 示例案例 */
  examples: TemplateExample[];
}

/**
 * 模板字段定义
 */
export interface TemplateField {
  /** 字段ID */
  id: string;
  
  /** 字段标签 */
  label: string;
  
  /** 字段占位符提示 */
  placeholder: string;
  
  /** 是否必填 */
  required: boolean;
  
  /** 字段类型 */
  type: 'text' | 'textarea' | 'select' | 'date';
  
  /** 选项（仅用于select类型） */
  options?: string[];
}

/**
 * 模板示例
 */
export interface TemplateExample {
  /** 示例标题 */
  title: string;
  
  /** 示例内容 */
  content: Record<string, string>;
}

/**
 * 模板列表类型
 */
export type TemplateList = Template[];
