import { commands, ProgressLocation, window } from 'vscode';
import { CommandConst } from '../../constants';
import { CoreAPI } from '../../service';

/**
 * 发布模板
 *
 * @author chitanda
 * @date 2021-11-25 19:11:10
 * @export
 * @class TemplatePublishCommand
 */
export class TemplatePublishCommand {
  constructor() {
    commands.registerCommand(CommandConst.TEMPLATE.PUBLISH, this.execute, this);
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
      await window.withProgress({ location: ProgressLocation.Notification, title: '发布模板' }, async progress => {
        progress.report({ message: '正在发布模板...' });
        const res = await CoreAPI.cli('ExecuteTemplCLICmd', { pstscmdname: 'devtempl_publish', psdevslntemplid: temp.psdevslntemplid });
        if (res) {
          window.showInformationMessage(`模板发布成功`);
        }
      });
    }
  }
}
