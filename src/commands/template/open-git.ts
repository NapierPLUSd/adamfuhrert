import { commands, Uri, window } from 'vscode';
import { CommandConst } from '../../constants';
import { CoreAPI } from '../../service';

/**
 * 发布模板
 *
 * @author chitanda
 * @date 2021-11-25 19:11:10
 * @export
 * @class TemplateOpenGitCommand
 */
export class TemplateOpenGitCommand {
  constructor() {
    commands.registerCommand(CommandConst.TEMPLATE.OPEN_GIT, this.execute, this);
  }

  /**
   *
   *
   * @author chitanda
   * @date 2022-01-21 14:01:53
   * @protected
   * @param {Record<string, string>} template 模板数据
   * @return {*}  {Promise<void>}
   */
  protected async execute(template: Record<string, string>): Promise<void> {
    // 选择模板
    const temp = template;
    if (temp) {
      const url = await CoreAPI.getTemplateRepoUrl(temp.psdevslntemplid);
      if (url) {
        commands.executeCommand(CommandConst.VSCODE.OPEN, Uri.parse(url));
        return;
      }
      window.showErrorMessage(`未找到模板 git 路径无法打开`);
    }
  }
}
