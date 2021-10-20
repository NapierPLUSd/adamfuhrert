import { ExtensionContext, window } from 'vscode';
import { ExplorerConst } from '../../constants';
import { IPSData, ModelingExplorer } from '../../interface';
import { SystemTaskProvider } from './provider/system-task';

/**
 * 系统运行任务
 *
 * @author chitanda
 * @date 2021-12-22 15:12:53
 * @export
 * @class SystemTask
 * @implements {ModelingExplorer<IPSData>}
 */
export class SystemTask implements ModelingExplorer<IPSData> {
  readonly treeDataProvider = new SystemTaskProvider(this.context);

  readonly treeView = window.createTreeView(ExplorerConst.SYSTEM_TASK, { treeDataProvider: this.treeDataProvider, showCollapseAll: true });

  constructor(protected readonly context: ExtensionContext) {
    context.subscriptions.push(this.treeView);
  }
}
