import { ExtensionContext, window } from 'vscode';
import { ExplorerConst } from '../../constants';
import { ctx } from '../../context';
import { Entry } from '../../file-system';
import { ModelingExplorer } from '../../interface';
import { ModelExpTreeProvider } from './provider/model-exp-tree';

/**
 * 模型导航资源管理器
 *
 * @author chitanda
 * @date 2021-12-22 15:12:00
 * @export
 * @class ModelExpTree
 * @implements {ModelingExplorer<Entry>}
 */
export class ModelExpTree implements ModelingExplorer<Entry> {
  readonly treeDataProvider = new ModelExpTreeProvider(this.context, ctx.mosFS);

  readonly treeView = window.createTreeView(ExplorerConst.MODEL_EXP_TREE, { treeDataProvider: this.treeDataProvider, showCollapseAll: true });

  constructor(protected readonly context: ExtensionContext) {
    context.subscriptions.push(this.treeView);
  }
}
