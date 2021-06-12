import { MessageTypeBase } from './base/message-type-base';
import { CommandUpdate } from './command/command-update';
import { CommandCreate } from './command/command-create';
import { CommandRemove } from './command/command-remove';
import { WSMessage } from '../../interface';

/**
 * 命令消息
 *
 * @export
 * @class MessageCommand
 */
export class MessageCommand extends MessageTypeBase {
  /**
   * 更新消息
   *
   * @protected
   * @type {CommandUpdate}
   * @memberof MessageCommand
   */
  protected $update: CommandUpdate = new CommandUpdate();
  /**
   * 更新消息
   *
   * @readonly
   * @type {CommandUpdate}
   * @memberof MessageCommand
   */
  public get update(): CommandUpdate {
    return this.$update;
  }
  /**
   * 新建消息
   *
   * @protected
   * @type {CommandCreate}
   * @memberof MessageCommand
   */
  protected $create: CommandCreate = new CommandCreate();
  /**
   * 新建消息
   *
   * @readonly
   * @type {CommandCreate}
   * @memberof MessageCommand
   */
  public get create(): CommandCreate {
    return this.$create;
  }
  /**
   * 删除消息
   *
   * @protected
   * @type {CommandRemove}
   * @memberof MessageCommand
   */
  protected $remove: CommandRemove = new CommandRemove();
  /**
   * CommandRemove
   *
   * @readonly
   * @type {CommandRemove}
   * @memberof MessageCommand
   */
  public get remove(): CommandRemove {
    return this.$remove;
  }

  /**
   * 发送消息
   *
   * @param {WSMessage} message
   * @memberof MessageCommand
   */
  public next(message: WSMessage): void {
    if (message) {
      const content: any = message.content;
      const deName: string = content.srfdename;
      if (content && deName && !Object.is(deName, '')) {
        this.subNext(message, deName);
      }
      this.subNext(message);
      super.next(message, deName);
    }
  }

  /**
   * 发送本地消息
   *
   * @param {WSMessage} message
   * @memberof MessageCommand
   */
  public nextLocal(message: WSMessage): void {
    if (message) {
      const content: any = message.content;
      const deName: string = content.srfdename;
      if (content && deName && !Object.is(deName, '')) {
        this.subNextLocal(message, deName);
      }
      this.subNextLocal(message);
      super.nextLocal(message, deName);
    }
  }

  /**
   * 根据子类别发送消息
   *
   * @param {WSMessage} message
   * @param {string} [type]
   * @memberof MessageCommand
   */
  public subNext(message: WSMessage, type?: string): void {
    if (Object.is(message.subtype, 'OBJECTUPDATED')) {
      this.$update.next(message, type);
    }
    if (Object.is(message.subtype, 'OBJECTREMOVED')) {
      this.$remove.next(message, type);
    }
    if (Object.is(message.subtype, 'OBJECTCREATED')) {
      this.$create.next(message, type);
    }
  }

  /**
   * 根据子类别发送本地消息
   *
   * @param {WSMessage} message
   * @param {string} [type]
   * @memberof MessageCommand
   */
  public subNextLocal(message: WSMessage, type?: string): void {
    if (Object.is(message.subtype, 'OBJECTUPDATED')) {
      this.$update.nextLocal(message, type);
    }
    if (Object.is(message.subtype, 'OBJECTREMOVED')) {
      this.$remove.nextLocal(message, type);
    }
    if (Object.is(message.subtype, 'OBJECTCREATED')) {
      this.$create.nextLocal(message, type);
    }
  }

  /**
   * 取消订阅
   *
   * @param {string} key
   * @memberof MessageCommand
   */
  public unsubscribe(key: string): void {
    super.unsubscribe(key);
    this.$create.unsubscribe(key);
    this.$remove.unsubscribe(key);
    this.$update.unsubscribe(key);
  }

  /**
   * 取消本地订阅
   *
   * @param {string} key
   * @memberof MessageCommand
   */
  public unsubscribeLocal(key: string): void {
    super.unsubscribeLocal(key);
    this.$create.unsubscribeLocal(key);
    this.$remove.unsubscribeLocal(key);
    this.$update.unsubscribeLocal(key);
  }
}
