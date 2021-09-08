import { ExtensionContext } from 'vscode';
import { ModelExpTree } from './model-exp/model-exp';
import { SystemTask } from './system-task/system-task';


/**
 * 安装 资源管理器
 *
 * @author chitanda
 * @date 2021-11-30 10:11:47
 * @export
 * @param {ExtensionContext} context
 */
export function installExplorer(context: ExtensionContext): void {
  new ModelExpTree(context);
  new SystemTask(context);
}
