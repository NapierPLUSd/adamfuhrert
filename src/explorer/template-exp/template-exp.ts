import { ExtensionContext, window } from 'vscode';
import { ExplorerConst } from '../../constants';
import { IPSData, ModelingExplorer } from '../../interface';
import { TemplateExpProvider } from './provider/template-exp';

/**
 * 系统运行任务
 *
 * @author chitanda
 * @date 2021-12-22 15:12:53
 * @export
 * @class TemplateExp
 * @implements {ModelingExplorer<IPSData>}
 */
export class TemplateExp implements ModelingExplorer<IPSData> {
  readonly treeDataProvider = new TemplateExpProvider(this.context);

  readonly treeView = window.createTreeView(ExplorerConst.TEMPLATE_EXP_TREE, { treeDataProvider: this.treeDataProvider, showCollapseAll: true });

  constructor(protected readonly context: ExtensionContext) {
    context.subscriptions.push(this.treeView);
  }
}
