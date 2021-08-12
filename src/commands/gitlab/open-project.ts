import { commands, Uri, window } from 'vscode';
import { CommandConst } from '../../constants';
import { ctx } from '../../context';

/**
 * 打开项目 gitlab
 *
 * @author chitanda
 * @date 2021-12-13 11:12:57
 * @export
 * @class OpenProjectCommand
 */
export class OpenProjectCommand {
  constructor() {
    commands.registerCommand(CommandConst.GITLAB.OPEN_PROJECT, this.execute, this);
  }

  protected async execute(): Promise<void> {
    const gitLab = ctx.get('gitRemote');
    if (!gitLab) {
      window.showErrorMessage('GitLab 地址不存在，请先在 .ibizproject 中配置');
      return;
    }
    const uri = Uri.parse(gitLab);
    commands.executeCommand(CommandConst.VSCODE.OPEN, uri);
  }
}
