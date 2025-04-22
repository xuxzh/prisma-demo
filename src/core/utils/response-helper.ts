import { XzErrorOption, XzHttpResponse, XzSafeAny } from 'src/model';
// import type { Request } from '@nestjs/common';

export class XzReponseHelper {
  static success<T>(data: T, message?: string): XzHttpResponse {
    return {
      success: true,
      statusCode: 200,
      message: message || 'misson complete',
      data: data,
      timestamp: new Date(),
    };
  }

  static fail(
    message: string,
    statusCode?: number,
    error?: string,
    errorCode?: string,
    errors?: XzErrorOption[],
  ): XzHttpResponse {
    return {
      success: false,
      statusCode: statusCode || 500,
      message: message,
      timestamp: new Date(),
      data: null,
      error: error,
      errorCode: errorCode,
      errors: errors,
    };
  }

  static getClienIp(req: Request): string {
    const xForwardedFor = req.headers['x-forwarded-for'] as string;
    const xRealIp = req.headers['x-real-ip'] as string | string[];
    let data: string | null = null;
    if (xForwardedFor) {
      const ips = Array.isArray(xForwardedFor)
        ? (xForwardedFor[0] as string)
        : xForwardedFor;
      data = ips.split(',')[0].trim();
    }

    if (xRealIp) {
      data = Array.isArray(xRealIp) ? xRealIp[0] : xRealIp;
    }

    // NestJS 内置的 ip 获取（推荐）
    data = (
      ((req as Record<string, XzSafeAny>)?.socket as Record<string, XzSafeAny>)
        ?.remoteAddress as string
    )
      ?.split(':')
      ?.pop() as string;

    if (data) {
      return data;
    } else {
      throw new Error('获取ip失败');
    }
  }
}
