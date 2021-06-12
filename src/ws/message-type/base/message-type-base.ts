import { Subject, Subscription } from 'rxjs';
import { createUUID } from '../../../util';

/**
 *
 *
 * @export
 * @class MessageTypeBase
 */
export class MessageTypeBase {
  /**
   * 数据流发射器
   *
   * @protected
   * @type {Subject<any>}
   * @memberof MessageConsole
   */
  protected subject: Subject<any> = new Subject();
  /**
   * 本地数据发射流
   *
   * @protected
   * @type {Subject<any>}
   * @memberof MessageTypeBase
   */
  protected subjectLocal: Subject<any> = new Subject();
  /**
   * 事件订阅缓存(避免重复订阅)
   *
   * @protected
   * @type {Map<string, Subject<any>>}
   * @memberof MessageTypeBase
   */
  protected subjectMap: Map<string, Subject<any>> = new Map();
  /**
   * 本地消息事件订阅缓存(避免重复订阅)
   *
   * @protected
   * @type {Map<string, Subject<any>>}
   * @memberof MessageTypeBase
   */
  protected subjectLocalMap: Map<string, Subject<any>> = new Map();
  /**
   * 缓存
   *
   * @protected
   * @type {Map<string, Subscription>}
   * @memberof MessageConsole
   */
  protected map: Map<string, Subscription> = new Map();
  /**
   * 本地缓存
   *
   * @protected
   * @type {Map<string, Subscription>}
   * @memberof MessageTypeBase
   */
  protected mapLocal: Map<string, Subscription> = new Map();

  /**
   * 发送消息
   *
   * @param {*} message
   * @param {string} [type]
   * @memberof MessageTypeBase
   */
  public next(message: any, type?: string): void {
    if (type) {
      if (this.subjectMap.has(type)) {
        const sub: any = this.subjectMap.get(type);
        sub.next(message.content);
      }
    } else {
      this.subject.next(message.content);
    }
  }

  /**
   * 发送本地消息
   *
   * @param {*} message
   * @param {string} [type]
   * @memberof MessageTypeBase
   */
  public nextLocal(message: any, type?: string): void {
    if (type) {
      if (this.subjectLocalMap.has(type)) {
        const sub: any = this.subjectLocalMap.get(type);
        sub.next(message.content);
      }
    } else {
      this.subjectLocal.next(message.content);
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
  public subscribe(observer?: (content: any) => void, type?: string): string {
    const key: string = createUUID();
    if (type) {
      let sub: any;
      if (this.subjectMap.has(type)) {
        sub = this.subjectMap.get(type);
      } else {
        sub = new Subject();
        this.subjectMap.set(type, sub);
      }
      this.map.set(key, sub.asObservable().subscribe(observer));
    } else {
      this.map.set(key, this.subject.asObservable().subscribe(observer));
    }
    return key;
  }

  /**
   * 订阅本地消息
   *
   * @param {(content: any) => void} [observer]
   * @param {string} [type]
   * @returns {string}
   * @memberof MessageTypeBase
   */
  public subscribeLocal(observer?: (content: any) => void, type?: string): string {
    const key: string = createUUID();
    if (type) {
      let sub: any;
      if (this.subjectLocalMap.has(type)) {
        sub = this.subjectLocalMap.get(type);
      } else {
        sub = new Subject();
        this.subjectLocalMap.set(type, sub);
      }
      this.mapLocal.set(key, sub.asObservable().subscribe(observer));
    } else {
      this.mapLocal.set(key, this.subjectLocal.asObservable().subscribe(observer));
    }
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
    if (this.map.has(key)) {
      const sub: any = this.map.get(key);
      sub.unsubscribe();
    }
  }

  /**
   * 取消订阅本地消息
   *
   * @param {string} key
   * @memberof MessageTypeBase
   */
  public unsubscribeLocal(key: string): void {
    if (this.mapLocal.has(key)) {
      const sub: any = this.mapLocal.get(key);
      sub.unsubscribe();
    }
  }
}
