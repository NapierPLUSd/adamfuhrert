import { commands, Uri, window } from 'vscode';
import { CommandConst, GlobalConst } from '../../constants';

/**
 * 查找模型
 *
 * @author chitanda
 * @date 2021-12-05 18:12:44
 * @export
 * @class OpenModelByPathCommand
 */
export class OpenModelByPathCommand {
  constructor() {
    commands.registerCommand(CommandConst.MOS_FS.OPEN_MODEL_BY_PATH, this.execute, this);
  }

  protected async execute(basePath?: string): Promise<void> {
    const defaultUri = Uri.parse(`${GlobalConst.MOS_FS_PROTOCOL}${basePath ? basePath : '/'}`);
    const uriArr = await window.showOpenDialog({
      title: '根据路路径查找模型',
      openLabel: '请输入想要查找或打开的模型路径',
      defaultUri,
      canSelectFiles: true,
      canSelectFolders: true,
      canSelectMany: false,
    });
    if (uriArr) {
      for (let i = 0; i < uriArr.length; i++) {
        const uri = uriArr[i];
        commands.executeCommand(CommandConst.MOS_FS.OPEN_FILE, uri.path);
      }
    }
  }
}
