import type { MessageType } from '@/types/Message';
import type { Recommendation } from '@/types/Recommendation';
import { MessageType as MT } from '@/types/Message';

/**
 * 消息响应类型
 */
interface MessageResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * 搜索响应数据
 */
interface SearchResponseData {
  results: Recommendation[];
}

/**
 * chrome.runtime消息通信工具
 * 
 * 封装Sidebar与Background之间的消息通信
 */
export class RuntimeMessenger {
  /**
   * 默认超时时间（毫秒）
   */
  private static readonly DEFAULT_TIMEOUT = 5000;

  /**
   * 发送搜索系统请求
   * 
   * @param query 搜索关键字
   * @param timeout 超时时间（毫秒）
   * @returns 推荐结果列表
   * @throws 超时或通信失败时抛出错误
   */
  static async searchSystem(
    query: string,
    timeout: number = this.DEFAULT_TIMEOUT
  ): Promise<Recommendation[]> {
    return new Promise((resolve, reject) => {
      // 超时控制
      const timeoutId = setTimeout(() => {
        reject(new Error('请求超时，已切换到基础搜索'));
      }, timeout);

      try {
        // 发送消息到Background
        chrome.runtime.sendMessage(
          {
            type: MT.SEARCH_SYSTEM,
            payload: { query },
          },
          (response: MessageResponse<SearchResponseData>) => {
            clearTimeout(timeoutId);

            // 检查chrome.runtime错误
            if (chrome.runtime.lastError) {
              reject(new Error(`后台服务未响应: ${chrome.runtime.lastError.message}`));
              return;
            }

            // 检查响应格式
            if (!response) {
              reject(new Error('未收到响应数据'));
              return;
            }

            // 检查业务错误
            if (!response.success || response.error) {
              reject(new Error(response.error || '搜索失败'));
              return;
            }

            // 返回结果
            if (response.data && Array.isArray(response.data.results)) {
              resolve(response.data.results);
            } else {
              reject(new Error('响应数据格式错误'));
            }
          }
        );
      } catch (error) {
        clearTimeout(timeoutId);
        reject(error);
      }
    });
  }

  /**
   * 发送通用消息
   * 
   * @param type 消息类型
   * @param payload 消息载荷
   * @param timeout 超时时间（毫秒）
   * @returns 响应数据
   */
  static async sendMessage<T = any, R = any>(
    type: MessageType,
    payload?: T,
    timeout: number = this.DEFAULT_TIMEOUT
  ): Promise<R> {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('通信超时'));
      }, timeout);

      try {
        chrome.runtime.sendMessage(
          { type, payload },
          (response: MessageResponse<R>) => {
            clearTimeout(timeoutId);

            if (chrome.runtime.lastError) {
              reject(new Error(chrome.runtime.lastError.message));
              return;
            }

            if (!response) {
              reject(new Error('未收到响应'));
              return;
            }

            if (!response.success || response.error) {
              reject(new Error(response.error || '请求失败'));
              return;
            }

            resolve(response.data as R);
          }
        );
      } catch (error) {
        clearTimeout(timeoutId);
        reject(error);
      }
    });
  }

  /**
   * 检查Background是否可用
   * 
   * @returns 是否可用
   */
  static async checkBackgroundAlive(): Promise<boolean> {
    try {
      await this.sendMessage(MT.PING, undefined, 1000);
      return true;
    } catch {
      return false;
    }
  }
}

/**
 * 便捷导出函数
 */
export const searchSystem = RuntimeMessenger.searchSystem.bind(RuntimeMessenger);
export const sendMessage = RuntimeMessenger.sendMessage.bind(RuntimeMessenger);
export const checkBackgroundAlive = RuntimeMessenger.checkBackgroundAlive.bind(RuntimeMessenger);
