import { XzSafeAny } from './any.model';

export interface XzHttpResponse<T = XzSafeAny> {
  /** 请求是否成功 */
  success: boolean;
  /** 状态码 */
  statusCode?: number;
  /** 消息 */
  message: string;
  /**核心业务数据 */
  data: T;
  /** http错误类型名称:Bad Request  */
  error?: string;
  /** 自定义错误码（可选，用于前端逻辑处理）如:INVALID_EMAIL */
  errorCode?: string;
  /** 详细错误列表（如验证错误） */
  errors?: XzErrorOption[];
  /** 请求时间戳 */
  timestamp?: Date;
}

export interface XzErrorOption {
  field: string;
  message: string;
}
