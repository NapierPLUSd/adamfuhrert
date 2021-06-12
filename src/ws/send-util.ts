import * as dayjs from 'dayjs';
import { ctx } from '../context';

/**
 *
 *
 * @author chitanda
 * @date 2021-11-25 19:11:23
 * @export
 * @class SendUtil
 */
export class SendUtil {
  /**
   * 向console区发送消息
   *
   * @param {string} message 消息内容
   * @param {('success' | 'error' | 'warning' | 'info')} [type='info'] 消息类型
   * @param {string} [subtype] 消息子类型用于分类
   * @returns {void}
   * @memberof AccSendUtil
   */
  console(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', subtype?: string): void {
    if (message) {
      switch (type) {
        case 'success':
          return this.consoleSuccess(message, subtype);
        case 'error':
          return this.consoleError(message, subtype);
        case 'warning':
          return this.consoleWarning(message, subtype);
        case 'info':
          return this.consoleInfo(message, subtype);
      }
    }
  }

  /**
   * 发送成功消息
   *
   * @protected
   * @param {string} message
   * @memberof AccSendUtil
   */
  protected consoleSuccess(message: string, subtype?: string): void {
    ctx.ws.sendConsoleMessage({
      type: 'CONSOLE',
      subtype,
      content: `${this.getLocalDate()} \x1b[32m${message} \x1b[0m`,
    });
  }

  /**
   * 发送错误消息
   *
   * @protected
   * @param {string} message
   * @memberof AccSendUtil
   */
  protected consoleError(message: string, subtype?: string): void {
    ctx.ws.sendConsoleMessage({
      type: 'CONSOLE',
      subtype,
      content: `${this.getLocalDate()} \x1b[31m${message} \x1b[0m`,
    });
  }

  /**
   * 发送警告消息
   *
   * @protected
   * @param {string} message
   * @memberof AccSendUtil
   */
  protected consoleWarning(message: string, subtype?: string): void {
    ctx.ws.sendConsoleMessage({
      type: 'CONSOLE',
      subtype,
      content: `${this.getLocalDate()} \x1b[33m${message} \x1b[0m`,
    });
  }

  /**
   * 发送消息
   *
   * @protected
   * @param {string} message
   * @memberof AccSendUtil
   */
  protected consoleInfo(message: string, subtype?: string): void {
    ctx.ws.sendConsoleMessage({
      type: 'CONSOLE',
      subtype,
      content: message,
    });
  }

  /**
   * 获取当前时间
   *
   * @protected
   * @returns {string}
   * @memberof AccSendUtil
   */
  protected getLocalDate(): string {
    return dayjs().format('MM-DD HH:mm:ss');
  }
}
