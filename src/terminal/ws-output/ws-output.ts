import { EventEmitter, Pseudoterminal, Terminal, window } from 'vscode';
import { ConfigConst } from '../../constants';
import { ctx } from '../../context';
import { Websocket } from '../../ws';

/**
 * output 系统输出
 *
 * @author chitanda
 * @date 2021-11-24 20:11:48
 * @export
 * @class WSOutput
 */
export class WSOutput {
  /**
   * 输出面板
   *
   * @author chitanda
   * @date 2021-11-24 20:11:21
   * @protected
   * @type {Terminal}
   */
  protected terminal?: Terminal;

  /**
   * 输出事件
   *
   * @author chitanda
   * @date 2021-11-25 10:11:36
   * @type {EventEmitter<string>}
   */
  static readonly write: EventEmitter<string> = new EventEmitter<string>();

  /**
   * 订阅
   *
   * @author chitanda
   * @date 2021-11-25 19:11:50
   * @protected
   * @type {string[]}
   */
  protected subs: string[] = [];
  /**
   * 本地订阅
   *
   * @author chitanda
   * @date 2021-11-25 19:11:35
   * @protected
   * @type {string[]}
   */
  protected localSubs: string[] = [];
  protected isInit: boolean = false;
  protected ws!: Websocket;
  protected name!: string;

  /**
   * Creates an instance of WSOutput.
   *
   * @author chitanda
   * @date 2021-11-24 20:11:15
   * @param {Websocket} ws
   * @param {string} name
   */
  init(ws: Websocket, name: string): void {
    this.ws = ws;
    this.name = name;
    this.subscribe();
    this.isInit = true;
  }

  /**
   * 订阅 ws 消息
   *
   * @author chitanda
   * @date 2021-11-25 11:11:28
   * @protected
   */
  protected subscribe(): void {
    this.subs.push(
      this.ws.console(msg => {
        if (!this.initTerminal(msg.content)) {
          WSOutput.write.fire(msg.content);
          WSOutput.write.fire('\r\n');
        }
      }),
    );
    this.localSubs.push(
      this.ws.consoleLocal(msg => {
        if (!this.initTerminal(msg.content)) {
          WSOutput.write.fire(msg.content);
          WSOutput.write.fire('\r\n');
        }
      }),
    );
  }

  /**
   * 初始化命令换行窗口
   *
   * @author chitanda
   * @date 2021-11-25 20:11:54
   * @protected
   * @param {string} [msg] 消息
   * @return {*}  {boolean} 是否进行了初始化
   */
  protected initTerminal(msg?: string): boolean {
    if (this.terminal) {
      return false;
    }
    const forceDisplay = ctx.config.get<boolean>(ConfigConst.CONSOLE.AUTO_DISPLAY);
    const pty: Pseudoterminal = {
      onDidWrite: WSOutput.write.event,
      open: () => {
        WSOutput.write.fire(`${this.name} 日志\r\n\r\n`);
        if (msg) {
          WSOutput.write.fire(msg);
          WSOutput.write.fire('\r\n');
        }
      },
      close: () => {
        this.terminal = undefined;
      },
    };
    this.terminal = window.createTerminal({ name: `iBizSys: ${this.name}`, pty });
    if (forceDisplay) {
      this.terminal.show();
    }
    return true;
  }

  /**
   * 显示终端
   *
   * @author chitanda
   * @date 2021-11-25 14:11:38
   */
  openTerminal(): void {
    if (this.isInit === false) {
      window.showErrorMessage('系统 Terminal 信息未初始化无法使用');
      return;
    }
    this.initTerminal();
    this.terminal?.show();
  }

  /**
   * 销毁窗口
   *
   * @author chitanda
   * @date 2021-11-24 20:11:22
   */
  dispose(): void {
    this.subs.forEach(sub => {
      this.ws.unsubscribe(sub);
    });
    this.localSubs.forEach(sub => {
      this.ws.unsubscribeLocal(sub);
    });
    this.terminal?.dispose();
  }
}

export const wsOutput = new WSOutput();
