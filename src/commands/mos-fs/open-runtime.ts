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
 * @class OpenRuntimeCommand
 */
export class OpenRuntimeCommand {
  protected get fs(): IBizMosFSCustom {
    return ctx.mosFS;
  }

  constructor() {
    commands.registerCommand(CommandConst.MOS_FS.OPEN_RUNTIME, this.execute, this);
  }

  protected async execute(param: Entry | PSMosFile | string): Promise<void> {
    if (isNilOrEmpty(param)) {
      throw new Error('未指定需要打开的模型');
    }
    let path = '';
    if (param instanceof Directory || param instanceof File) {
      path = param.path;
    } else {
      if (param instanceof PSMosFile) {
        path = param.fullPath;
      } else {
        path = param;
      }
    }
    if (!path.endsWith(FileExtensionConst.MODEL_RUNTIME)) {
      path += FileExtensionConst.MODEL_RUNTIME;
    }
    const file = await this.fs.stat(this.fs.getUri(path));
    if (!file) {
      window.showErrorMessage(`${path} 暂未支持运行时`);
      return;
    }
    const uri = file.getUri();
    commands.executeCommand(CommandConst.VSCODE.OPEN, uri);
  }
}
