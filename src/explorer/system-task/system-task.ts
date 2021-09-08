import { ExtensionContext, window } from 'vscode';
import { ExplorerConst } from '../../constants/explorer/explorer';
import { SystemTaskProvider } from './provider/system-task';

/**
 * 系统运行任务
 *
 * @author chitanda
 * @date 2021-12-13 18:12:27
 * @export
 * @class SystemTask
 */
export class SystemTask {
  constructor(context: ExtensionContext) {
    const treeDataProvider = new SystemTaskProvider(context);
    const treeView = window.createTreeView(ExplorerConst.SYSTEM_TASK, { treeDataProvider, showCollapseAll: true });
    context.subscriptions.push(treeView);
  }
}
