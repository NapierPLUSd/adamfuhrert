import { FileType, TreeItem, TreeItemCollapsibleState } from 'vscode';
import { CommandConst } from '../../../constants';
import { Entry } from '../../../file-system';

/**
 * 模型树节点
 *
 * @author chitanda
 * @date 2021-11-30 12:11:35
 * @export
 * @class ModelTreeItem
 * @extends {TreeItem}
 */
export class ModelTreeItem extends TreeItem {
  constructor(protected file: Entry) {
    super(file.getUri(), file.type === FileType.Directory ? TreeItemCollapsibleState.Collapsed : TreeItemCollapsibleState.None);
    this.label = file.logicName || file.name;
    if (file.type === FileType.File || file.type === (FileType.SymbolicLink | FileType.File)) {
      this.command = { command: CommandConst.MOS_FS.OPEN_FILE, title: '打开文件', arguments: [file.fullPath] };
    }
    this.contextValue = file.content.type;
  }
}
