/**
 * 全局消息
 *
 * @export
 * @interface WSMessage
 */
export interface WSMessage {
  /**
   * 消息类型
   *
   * @type {('CONSOLE' | 'COMMAND')}
   * @memberof AppMessage
   */
  type: 'CONSOLE' | 'COMMAND';
  /**
   * 消息子类型
   *
   * @type {('OBJECTUPDATED' | 'OBJECTREMOVED' | 'OBJECTCREATED' | string)}
   * @memberof AppMessage
   */
  subtype?: 'OBJECTUPDATED' | 'OBJECTREMOVED' | 'OBJECTCREATED' | string;
  /**
   * 消息内容
   *
   * @type {*}
   * @memberof AppMessage
   */
  content: any;
}
