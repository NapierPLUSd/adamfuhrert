import { commands, Uri, window } from 'vscode';
import { CommandConst } from '../../constants';
import { ctx } from '../../context';
import { PSMosFile } from '../../entities';
import { Directory, Entry, File } from '../../file-system';
import { isNilOrEmpty } from '../../util';

/**
 * 打开项目 wiki 界面
 *
 * @author chitanda
 * @date 2021-12-12 14:12:57
 * @export
 * @class OpenWikiCommand
 */
export class OpenWikiCommand {
  constructor() {
    commands.registerCommand(CommandConst.MOS_FS.OPEN_WIKI, this.execute.bind(this));
  }

  protected async execute(param: Entry | PSMosFile | string): Promise<void> {
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
    if (isNilOrEmpty(path)) {
      return;
    }
    const gitRemote = ctx.get('gitRemote');
    const wikiUrl = `${gitRemote}/wikis${path}`;
    if (!wikiUrl) {
      window.showErrorMessage('GitLab 地址不存在，请先在 .ibizproject 中配置');
      return;
    }
    const uri = Uri.parse(wikiUrl);
    commands.executeCommand(CommandConst.VSCODE.OPEN, uri);
  }
}
