import { commands, ExtensionContext, workspace, WorkspaceConfiguration } from 'vscode';
import { ConfigConst, RTContextConst } from '../constants';
import { IBizMosFSCustom } from '../file-system';
import { GlobalContextData } from '../interface';
import { Websocket } from '../ws';

/**
 * 全局上下文
 *
 * @author chitanda
 * @date 2021-11-10 11:11:52
 * @export
 * @class GlobalContext
 */
export class GlobalContext {
  protected static readonly instance: GlobalContext = new GlobalContext();
  /**
   * 上下文数据
   *
   * @author chitanda
   * @date 2021-11-10 14:11:09
   * @private
   * @type {GlobalContextData}
   */
  private readonly data: GlobalContextData = {};

  /**
   * 系统 ws 消息
   *
   * @author chitanda
   * @date 2021-11-24 20:11:03
   * @private
   * @type {Websocket}
   */
  private _ws!: Websocket;
  get ws(): Websocket {
    return this._ws;
  }

  /**
   * vscode 插件运行上下文
   *
   * @author chitanda
   * @date 2021-11-14 11:11:13
   * @private
   * @type {ExtensionContext}
   */
  private _extensionContext!: ExtensionContext;
  get extensionContext(): ExtensionContext {
    return this._extensionContext;
  }

  /**
   * mos 系统虚拟文件服务
   *
   * @author chitanda
   * @date 2021-11-15 17:11:52
   * @private
   * @type {IBizMosFSCustom}
   */
  private _mosFS!: IBizMosFSCustom;
  get mosFS(): IBizMosFSCustom {
    return this._mosFS;
  }

  /**
   * 认证信息缓存标识
   *
   * @author chitanda
   * @date 2021-11-29 13:11:29
   * @readonly
   * @type {string}
   */
  get tokenKey(): string {
    return 'token_' + this.get('psdevslnsys');
  }

  /**
   * 认证信息
   *
   * @author chitanda
   * @date 2021-11-29 13:11:35
   * @private
   * @type {string}
   */
  private _token?: string;
  get token(): string | undefined {
    return this._token;
  }

  get config(): WorkspaceConfiguration {
    return workspace.getConfiguration('ibiz-modeling-studio');
  }

  /**
   * 初始化完成
   *
   * @author chitanda
   * @date 2021-11-10 17:11:07
   * @protected
   * @type {boolean}
   */
  protected _completed: boolean = false;
  get completed(): boolean {
    return this._completed;
  }

  /**
   * 工具域地址
   *
   * @author chitanda
   * @date 2021-11-27 09:11:35
   * @readonly
   * @type {string}
   */
  get studioAddress(): string {
    return ctx.config.get(ConfigConst.IBIZ_MODELING_STUDIO_DOMAIN)!;
  }

  /**
   * studio 系统服务地址
   *
   * @author chitanda
   * @date 2021-11-27 02:11:35
   * @readonly
   * @type {string}
   */
  get serviceApiAddress(): string {
    return this.studioAddress + '/MosDynamicBackend';
  }

  /**
   * 设计工具地址
   *
   * @author chitanda
   * @date 2021-11-27 02:11:38
   * @readonly
   * @type {string}
   */
  get toolAddress(): string {
    return this.studioAddress + '/mosdynamictool';
  }

  /**
   * 核心服务地址
   *
   * @author chitanda
   * @date 2021-11-27 02:11:25
   * @readonly
   * @type {string}
   */
  get coreApiAddress(): string {
    return this.studioAddress + '/MosDynamic';
  }

  /**
   * Creates an instance of GlobalContext.
   *
   * @author chitanda
   * @date 2021-11-26 20:11:20
   */
  constructor() {
    if (GlobalContext.instance) {
      throw new Error('GlobalContext is a singleton class');
    }
  }

  /**
   * 设置 vscode 运行上下文
   *
   * @author chitanda
   * @date 2021-11-14 11:11:05
   * @param {ExtensionContext} context
   */
  setExtensionContext(context: ExtensionContext): void {
    this._extensionContext = context;
  }

  /**
   * 设置 mosFS 虚拟文件系统
   *
   * @author chitanda
   * @date 2021-11-14 15:11:41
   * @param {IBizMosFSCustom} mosFS
   */
  setMosFS(mosFS: IBizMosFSCustom): void {
    this._mosFS = mosFS;
  }

  /**
   * 设置 studio 系统 ws 连接
   *
   * @author chitanda
   * @date 2021-11-24 20:11:03
   * @param {Websocket} ws
   */
  setWS(ws: Websocket): void {
    this._ws = ws;
  }

  /**
   * 设置认证缓存
   *
   * @author chitanda
   * @date 2021-11-29 13:11:55
   * @param {string} token
   */
  setToken(token: string): void {
    this._token = token;
    this.cacheToken(token);
  }

  /**
   * 缓存认证信息
   *
   * @author chitanda
   * @date 2021-11-29 13:11:01
   * @param {string} token
   * @return {*}  {Promise<void>}
   */
  async cacheToken(token: string): Promise<void> {
    this.extensionContext.secrets.store(this.tokenKey, token);
  }

  /**
   * 设置上下文
   *
   * @author chitanda
   * @date 2021-11-10 14:11:37
   * @template K
   * @param {K} key
   * @param {GlobalContextData[K]} val
   */
  set<K extends keyof GlobalContextData>(key: K, val: GlobalContextData[K]): void {
    this.data[key] = val;
  }

  /**
   * 读取上下文
   *
   * @author chitanda
   * @date 2021-11-10 14:11:09
   * @template K
   * @param {K} key
   * @return {*}  {GlobalContextData[K]}
   */
  get<K extends keyof GlobalContextData>(key: K): GlobalContextData[K] {
    return this.data[key];
  }

  /**
   * 清空值
   *
   * @author chitanda
   * @date 2021-11-21 21:11:18
   * @template K
   * @param {K} key
   */
  clear<K extends keyof GlobalContextData>(key: K): void {
    delete this.data[key];
  }

  /**
   * 设置 vscode 运行上下文，可以在 package.json 中用 wen 的地方使用
   *
   * @author chitanda
   * @date 2021-12-02 20:12:23
   * @param {string} key
   * @param {unknown} val
   */
  setContext(key: string, val: unknown): void {
    commands.executeCommand('setContext', key, val);
  }

  /**
   * 设置为初始化完毕
   *
   * @author chitanda
   * @date 2021-11-10 17:11:45
   */
  completedEnd(): void {
    this._completed = true;
    ctx.setContext(RTContextConst.ENABLE_PLUGIN, true);
  }

  /**
   * 等待插件环境初始化完毕
   *
   * @author chitanda
   * @date 2021-11-10 17:11:50
   * @param {number} [num=0]
   * @return {*}  {Promise<void>}
   */
  async waitCompleted(num: number = 0): Promise<void> {
    if (this.completed) {
      return;
    }
    if (num > 300) {
      return;
    }
    await new Promise(resolve => {
      setTimeout(resolve, 100);
    });
    num++;
    return this.waitCompleted(num);
  }

  static getInstance(): GlobalContext {
    return this.instance;
  }
}
// 全局上下文
export const ctx: GlobalContext = GlobalContext.getInstance();
/**
 * 初始化上下文
 *
 * @author chitanda
 * @date 2021-11-16 14:11:57
 * @export
 * @param {ExtensionContext} context
 */
export function initCtx(context: ExtensionContext): void {
  // 将插件上下文设置到上下文中
  ctx.setExtensionContext(context);
  // 初始化 MosFS 虚拟文件系统并设置到上下文中
  const iBizMosFSCustom = new IBizMosFSCustom();
  ctx.setMosFS(iBizMosFSCustom);
}
