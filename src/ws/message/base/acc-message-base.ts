import { Subject, Subscription } from 'rxjs';
import { MessageConsole } from '../../message-type/message-console';
import { MessageCommand } from '../../message-type/message-command';
import { WSMessage } from '../../../interface';
import { createUUID } from '../../../util';

/**
 * 应用中心消息
 *
 * @export
 * @class AccMessageBase
 */
export class AccMessageBase {
  /**
   * 数据流发射器
   *
   * @protected
   * @type {Subject<any>}
   * @memberof MessageConsole
   */
  protected subject: Subject<any> = new Subject();
  /**
   * 本地数据流发射器
   *
   * @protected
   * @type {Subject<any>}
   * @memberof AccMessageBase
   */
  protected subjectLocal: Subject<any> = new Subject();
  /**
   * 订阅缓存
   *
   * @protected
   * @type {Map<string, Subscription>}
   * @memberof MessageConsole
   */
  protected map: Map<string, Subscription> = new Map();
  /**
   * 本地订阅缓存
   *
   * @protected
   * @type {Map<string, Subscription>}
   * @memberof AccMessageBase
   */
  protected mapLocal: Map<string, Subscription> = new Map();
  /**
   * console消息实例
   *
   * @protected
   * @type {MessageConsole}
   * @memberof AccMessageBase
   */
  protected $messageConsole: MessageConsole = new MessageConsole();
  /**
   * console消息实例
   *
   * @readonly
   * @type {MessageConsole}
   * @memberof AccMessageBase
   */
  public get console(): MessageConsole {
    return this.$messageConsole;
  }
  /**
   * command消息实例
   *
   * @protected
   * @type {MessageCommand}
   * @memberof AccMessageBase
   */
  protected $messageCommand: MessageCommand = new MessageCommand();
  /**
   * MessageCommand
   *
   * @readonly
   * @type {MessageCommand}
   * @memberof AccMessageBase
   */
  public get command(): MessageCommand {
    return this.$messageCommand;
  }

  /**
   * 发送消息数据
   *
   * @param {WSMessage} message
   * @memberof AccMessageBase
   */
  public next(message: WSMessage): void {
    if (message) {
      if (Object.is(message.type, 'CONSOLE')) {
        this.$messageConsole.next(message);
      }
      if (Object.is(message.type, 'COMMAND')) {
        this.$messageCommand.next(message);
      }
      this.subject.next(message);
    }
  }

  /**
   * 发送本地消息数据
   *
   * @param {WSMessage} message
   * @memberof AccMessageBase
   */
  public nextLocal(message: WSMessage): void {
    if (message) {
      if (Object.is(message.type, 'CONSOLE')) {
        this.$messageConsole.nextLocal(message);
      }
      if (Object.is(message.type, 'COMMAND')) {
        this.$messageCommand.nextLocal(message);
      }
      this.subjectLocal.next(message);
    }
  }

  /**
   * 订阅消息
   *
   * @param {(content: any) => void} [observer]
   * @param {string} [type]
   * @returns {string}
   * @memberof MessageTypeBase
   */
  public subscribe(observer?: (content: any) => void): string {
    const key: string = createUUID();
    this.map.set(key, this.subject.asObservable().subscribe(observer));
    return key;
  }

  /**
   * 订阅本地消息
   *
   * @param {(content: any) => void} [observer]
   * @returns {string}
   * @memberof AccMessageBase
   */
  public subscribeLocal(observer?: (content: any) => void): string {
    const key: string = createUUID();
    this.mapLocal.set(key, this.subjectLocal.asObservable().subscribe(observer));
    return key;
  }

  /**
   * 取消订阅
   *
   * @param {string} key
   * @returns {void}
   * @memberof MessageConsole
   */
  public unsubscribe(key: string): void {
    this.$messageConsole.unsubscribe(key);
    this.$messageCommand.unsubscribe(key);
    if (this.map.has(key)) {
      const sub: any = this.map.get(key);
      sub.unsubscribe();
    }
  }

  /**
   * 取消订阅本地
   *
   * @param {string} key
   * @memberof AccMessageBase
   */
  public unsubscribeLocal(key: string): void {
    this.$messageConsole.unsubscribeLocal(key);
    this.$messageCommand.unsubscribeLocal(key);
    if (this.mapLocal.has(key)) {
      const sub: any = this.mapLocal.get(key);
      sub.unsubscribe();
    }
  }
}
