import { join } from 'path';
import { Uri, window, workspace } from 'vscode';
import { load } from 'js-yaml';
import { ctx } from '../../context';

// .ibizproject 配置文件
export const globalConfig: Record<string, any> = {};

/**
 * 读取项目 .ibizproject 配置信息
 *
 * @author chitanda
 * @date 2021-11-10 12:11:53
 * @export
 * @return {*}  {Promise<void>}
 */
export async function loadConfig(): Promise<void> {
  if (workspace.workspaceFolders) {
    for (let i = 0; i < workspace.workspaceFolders.length; i++) {
      const folder = workspace.workspaceFolders[i];
      // 不为实际文件系统时忽略
      if (folder.uri.scheme !== 'file') {
        continue;
      }
      // 工作区目录
      const path = folder.uri.path;
      // 配置文件地址
      const uri = Uri.file(join(path, '.ibizproject'));
      // 查看配置文件是否存在
      const file = await workspace.fs.stat(uri);
      if (file) {
        // 读取配置文件
        const val = await workspace.fs.readFile(uri);
        // 加载 yaml 格式的文件内容
        const config = load(val.toString()) as Record<string, any>;
        // 将全局配置放入上下文中
        ctx.set('type', config.type);
        ctx.set('psdevsln', config.psdevsln);
        ctx.set('psdevslnsys', config.psdevslnsys);
        ctx.set('psdevslnsysname', config.psdevslnsysname);
        Object.assign(globalConfig, config);
      } else {
        window.showErrorMessage('埃必致 系统插件启动失败，未识别到项目根目录中的 .ibizproject 配置文件');
      }
    }
  }
}
