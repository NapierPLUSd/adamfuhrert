import { commands, env } from 'vscode';
import { CommandConst } from '../../constants';
import { PSMosFile } from '../../entities';
import { Directory, Entry, File } from '../../file-system';

/**
 * 拷贝路径至粘贴板
 *
 * @author chitanda
 * @date 2021-12-07 16:12:46
 * @export
 * @class CopyPathCommand
 */
export class CopyPathCommand {
  constructor() {
    commands.registerCommand(CommandConst.MOS_FS.COPY_PATH, this.execute, this);
  }

  protected async execute(param: Entry | PSMosFile | string): Promise<void> {
    let path = '';
    if (param instanceof Directory || param instanceof File) {
      path = param.fullPath;
    } else {
      if (param instanceof PSMosFile) {
        path = param.fullPath;
      } else {
        path = path;
      }
    }
    env.clipboard.writeText(path);
  }
}
