import { MessageTypeBase } from './base/message-type-base';

/**
 * 控制台消息
 *
 * @export
 * @class MessageConsole
 */
export class MessageConsole extends MessageTypeBase {

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
                sub.next(message);
            } else { }
        } else {
            this.subject.next(message);
        }
    }

    /**
     * 发送本地消息
     *
     * @param {*} message
     * @param {string} [type]
     * @memberof MessageConsole
     */
    public nextLocal(message: any, type?: string): void {
        if (type) {
            if (this.subjectLocalMap.has(type)) {
                const sub: any = this.subjectLocalMap.get(type);
                sub.next(message);
            } else { }
        } else {
            this.subjectLocal.next(message);
        }
    }

}