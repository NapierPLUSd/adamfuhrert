import { ExtensionContext, workspace } from 'vscode';
import { installCommands } from './commands';
import { loadConfig } from './config';
import { ctx, initCtx } from './context';
import { installCustomEditor } from './custom-editor';
import { installExplorer } from './explorer';
import { installLanguages } from './languages';
import { login, serviceApi } from './service';
import { wsOutput } from './terminal';
import { Interceptor, isNilOrEmpty, notNilEmpty } from './util';
import { Websocket } from './ws';

export function activate(context: ExtensionContext): void {
  // 初始化插件上下文
  initCtx(context);
  // 注册系统虚拟文件适配器
  workspace.registerFileSystemProvider('ibizmos', ctx.mosFS, { isCaseSensitive: true });
  // 注册拦截器
  new Interceptor();
  // 安装命令
  installCommands(context);
  // 安装自定义资源管理器
  installExplorer(context);
  // 安装语言服务适配器
  installLanguages(context);
  // 注册自定义编辑器
  installCustomEditor(context);
  // 一些异步激活的东西
  asyncActivate(context);
}

/**
 * 需要异步激活的参数
 *
 * @author chitanda
 * @date 2021-11-29 10:11:36
 * @export
 * @return {*}  {Promise<void>}
 */
export async function asyncActivate(context: ExtensionContext): Promise<void> {
  // 读取配置文件
  await loadConfig();
  {
    // 从 vscode 缓存中初始化登录信息
    const token = await context.secrets.get(ctx.tokenKey);
    if (notNilEmpty(token)) {
      ctx.setToken(token!);
    }
  }
  {
    // 未登录提示登录，已登录时自动更新工作区
    const token = ctx.token;
    if (isNilOrEmpty(token)) {
      login.notLogged();
      return;
    }
  }
  {
    // 在读取配置文件后，获取应用基本信息
    const appData = (await serviceApi.getAppData()) as Record<string, string>;
    if (notNilEmpty(appData)) {
      // 初始化 mqtt 服务
      ctx.setWS(new Websocket({ psdsconsoleurl: appData.psdsconsoleurl, psdevslnsysid: appData.psdevslnsysid }));
      // 初始化系统 output terminal
      wsOutput.init(ctx.ws, ctx.get('psdevslnsysname') || '未知');
    }
  }
  ctx.completedEnd();
}

export function deactivate() {}
