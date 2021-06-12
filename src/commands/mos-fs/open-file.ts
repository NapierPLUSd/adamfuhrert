import { commands, Uri, window } from 'vscode';
import { CommandConst, FileExtensionConst } from '../../constants';
import { ctx } from '../../context';
import { PSMosFile } from '../../entities';
import { Directory, Entry, File, IBizMosFSCustom } from '../../file-system';
import { isNilOrEmpty } from '../../util';

/**
 * mos-fs 虚拟文件系统支持命令
 *
 * @author chitanda
 * @date 2021-11-30 14:11:13
 * @export
 * @class OpenFileCommand
 */
export class OpenFileCommand {
  protected get fs(): IBizMosFSCustom {
    return ctx.mosFS;
  }

  constructor() {
    commands.registerCommand(CommandConst.MOS_FS.OPEN_FILE, this.execute.bind(this));
  }

  protected async execute(param: Entry | PSMosFile | string): Promise<void> {
    if (isNilOrEmpty(param)) {
      throw new Error('未指定需要打开的模型');
    }
    let uri: Uri;
    let file: Entry;
    if (param instanceof Directory || param instanceof File) {
      uri = param.getUri();
      file = param;
    } else {
      if (param instanceof PSMosFile) {
        uri = this.fs.getUri(param.fullPath);
      } else {
        uri = this.fs.getUri(param);
      }
      file = await this.fs.stat(uri);
    }
    if (!file) {
      window.showErrorMessage(`打开文件失败，文件不存在：${uri.path}`);
      return;
    }
    switch (file.content.extension) {
      case FileExtensionConst.MODEL_UI:
      case FileExtensionConst.MODEL_RUNTIME:
        commands.executeCommand(CommandConst.VSCODE.OPEN, uri);
        return;
      default:
        const openUri = Uri.parse(
          `${ctx.toolAddress}/mos-dynamic-mgr/#/mosdynamicmgr/${ctx.get('psdevslnsys')}/vscode-redirect-view?path=${encodeURIComponent(file.content.path)}`,
        );
        commands.executeCommand(CommandConst.VSCODE.OPEN, openUri);
    }
  }
}
