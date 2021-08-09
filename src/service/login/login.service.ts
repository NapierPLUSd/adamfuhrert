import { commands, env, ProviderResult, StatusBarAlignment, Uri, UriHandler, window } from 'vscode';
import { CommandConst, GlobalConst } from '../../constants';
import { ctx } from '../../context';
import { getQueryVariable, notNilEmpty } from '../../util';

/**
 * 登录uri处理器
 *
 * @author chitanda
 * @date 2021-11-26 19:11:11
 * @export
 * @class LoginUriHandler
 * @implements {UriHandler}
 */
export class LoginUriHandler implements UriHandler {
  handleUri(uri: Uri): ProviderResult<void> {
    if (uri.scheme === 'vscode' && uri.authority === GlobalConst.AUTHORITY && uri.path === '/login') {
      const token = getQueryVariable(uri.query, 'token');
      if (notNilEmpty(token)) {
        login.resolveLogin(token!);
      } else {
        window.showErrorMessage('登录失败，无法获取到认证信息');
        login.resolveLogin();
      }
    }
  }
}

/**
 * 登录
 *
 * @author chitanda
 * @date 2021-11-21 18:11:26
 * @export
 * @class LoginService
 */
export class LoginService {
  /**
   * 正在登陆中
   *
   * @author chitanda
   * @date 2021-11-21 23:11:48
   * @protected
   * @type {boolean}
   */
  protected isLogging: boolean = false;
  /**
   * 是否登录中
   *
   * @author chitanda
   * @date 2021-11-26 20:11:54
   * @readonly
   * @type {boolean}
   */
  get logging(): boolean {
    return this.isLogging;
  }

  /**
   * 是否已经初始化登录相关参数
   *
   * @author chitanda
   * @date 2021-12-06 16:12:58
   * @protected
   * @type {boolean}
   */
  protected isInit: boolean = false;

  /**
   * 登录回调
   *
   * @author chitanda
   * @date 2021-11-26 19:11:07
   * @protected
   */
  protected loginResolve: ((value: boolean) => void) | null = null;

  /**
   * 登录回调地址处理
   *
   * @author chitanda
   * @date 2021-12-06 16:12:04
   * @protected
   * @type {LoginUriHandler}
   */
  protected uriHandle: LoginUriHandler = new LoginUriHandler();

  /**
   * 初始化
   *
   * @author chitanda
   * @date 2021-12-06 16:12:12
   * @protected
   * @return {*}  {void}
   */
  protected init(): void {
    if (this.isInit) {
      return;
    }
    ctx.extensionContext.subscriptions.push(window.registerUriHandler(this.uriHandle));
    ctx.extensionContext.subscriptions.push(commands.registerCommand(CommandConst.USER.LOGIN_REPLY_PATH_HANDLE, this.loginReplyPathHandle.bind(this)));
    this.isInit = true;
  }

  /**
   * 手动处理登录回调地址
   *
   * @author chitanda
   * @date 2021-12-06 16:12:31
   * @protected
   * @return {*}  {Promise<void>}
   */
  protected async loginReplyPathHandle(): Promise<void> {
    const url = await window.showInputBox({ placeHolder: '请输入登录回调地址' });
    if (url && url.startsWith('vscode://')) {
      this.uriHandle.handleUri(Uri.parse(url));
    } else if (notNilEmpty(url)) {
      const result = await window.showErrorMessage('无法识别的登录回调地址，请检查粘贴的内容', '取消登录');
      if (result === '取消登录') {
        login.resolveLogin();
      }
    } else {
      login.resolveLogin();
    }
  }

  /**
   * 用户登录
   *
   * @author chitanda
   * @date 2021-11-21 21:11:47
   * @return {*}  {Promise<boolean>}
   */
  async login(): Promise<boolean> {
    if (this.isLogging) {
      return false;
    }
    this.init();
    this.isLogging = true;
    const result = await window.showInformationMessage(GlobalConst.PLUGIN_LOGIC_NAME + ' 将打开外部链接登录', { modal: true }, '登录');
    if (result === '登录') {
      let timer: NodeJS.Timeout | undefined;
      const bar = window.createStatusBarItem(StatusBarAlignment.Left, 30);
      bar.text = '$(loading~spin) 登录 iBizModeling';
      bar.tooltip = '正在登录 iBizModeling，如若回调没有反应，可拷贝页面提示地址后单机此处登录';
      bar.command = CommandConst.USER.LOGIN_REPLY_PATH_HANDLE;
      bar.show();
      await new Promise(async resolve => {
        const vscodeUri = await env.asExternalUri(Uri.parse(`${env.uriScheme}://${GlobalConst.AUTHORITY}/login`));
        const uri = Uri.parse(`${ctx.toolAddress}/mos-dynamic/vscode-auth/redirect/index.html?service=${encodeURIComponent(`${vscodeUri}`)}`);
        commands.executeCommand(CommandConst.VSCODE.OPEN, uri);
        this.loginResolve = resolve;
        timer = setTimeout(() => resolve(false), 1000 * 120);
      });
      if (timer) {
        clearTimeout(timer);
      }
      bar.hide();
      bar.dispose();
    } else {
      this.isLogging = false;
    }
    return false;
  }

  /**
   * 登出当前用户
   *
   * @author chitanda
   * @date 2021-12-08 15:12:35
   * @return {*}  {Promise<boolean>}
   */
  async logout(): Promise<boolean> {
    ctx.setToken('');
    window.showInformationMessage('已登出当前用户');
    return true;
  }

  /**
   * 未登录时调用，根据状态进行登录操作
   *
   * @author chitanda
   * @date 2021-11-29 14:11:05
   * @param {401} [state]
   * @return {*}  {Promise<void>}
   */
  async notLogged(state?: 401): Promise<void> {
    if (ctx.completed === false) {
      await ctx.waitCompleted();
    }
    if (login.logging) {
      return;
    }
    if (state !== 401) {
      const token = ctx.token;
      if (notNilEmpty(token)) {
        return;
      }
    }
    const action = await window.showWarningMessage('未登录或登录已过期，请登录!', '登录');
    if (action === '登录') {
      login.login();
    }
  }

  /**
   * 处理登录状态
   *
   * @author chitanda
   * @date 2021-11-26 19:11:42
   * @param {string} token
   */
  resolveLogin(token?: string) {
    this.isLogging = false;
    if (this.loginResolve) {
      if (notNilEmpty(token)) {
        ctx.setToken(token!);
        this.loginResolve(true);
        const action = '重新加载窗口';
        window.showInformationMessage('登录成功，需要重新加载窗口!', action).then(result => {
          if (result === action) {
            commands.executeCommand(CommandConst.WORKBENCH.RELOAD_WINDOW);
          }
        });
      } else {
        this.loginResolve(false);
      }
      this.loginResolve = null;
    }
  }
}
// 唯一登录服务实例
export const login = new LoginService();
