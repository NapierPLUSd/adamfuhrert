import { ExtensionContext, window } from 'vscode';
import { ExplorerConst } from '../../constants/explorer/explorer';
import { ctx } from '../../context';
import { ModelExpTreeProvider } from './provider/model-exp-tree';

/**
 * 模型导航资源管理器
 *
 * @author chitanda
 * @date 2021-11-30 09:11:18
 * @export
 * @class ModelExpTree
 */
export class ModelExpTree {
  constructor(context: ExtensionContext) {
    const treeDataProvider = new ModelExpTreeProvider(context, ctx.mosFS);
    context.subscriptions.push(window.createTreeView(ExplorerConst.MODEL_EXP_TREE, { treeDataProvider, showCollapseAll: true }));
  }
}
