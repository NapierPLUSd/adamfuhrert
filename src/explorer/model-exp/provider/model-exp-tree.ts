import { Event, EventEmitter, ExtensionContext, TreeDataProvider } from 'vscode';
import { Entry, IBizMosFSCustom } from '../../../file-system';
import { ModelTreeItem } from '../model-tree-item/model-tree-item';

/**
 * 模型导航树
 *
 * @author chitanda
 * @date 2021-11-30 10:11:47
 * @export
 * @class ModelExpTreeProvider
 * @implements {TreeDataProvider<Entry>}
 */
export class ModelExpTreeProvider implements TreeDataProvider<Entry> {
  private _onDidChangeTreeData: EventEmitter<any> = new EventEmitter<any>();
  onDidChangeTreeData?: Event<void | Entry | null | undefined> | undefined = this._onDidChangeTreeData.event;

  constructor(protected context: ExtensionContext, protected iBizMosFS: IBizMosFSCustom) {}

  async getTreeItem(file: Entry): Promise<ModelTreeItem> {
    const treeItem = new ModelTreeItem(file);
    return treeItem;
  }

  async getChildren(file?: Entry): Promise<Entry[]> {
    const entries: Entry[] = await this.iBizMosFS.loadDir(file?.path || '');
    return entries;
  }
}
