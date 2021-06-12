import { commands, ProgressLocation, window } from 'vscode';
import { CommandConst } from '../../constants';
import { TemplatePickItem } from '../../entities';
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
    commands.registerCommand(CommandConst.TEMPLATE.PUBLISH, this.execute.bind(this));
  }

  protected async execute(): Promise<void> {
    // 加载可刷新的模板
    const promise = new Promise<readonly TemplatePickItem[]>(async resolve => {
      const arr: TemplatePickItem[] = [];
      const templates = await CoreAPI.curUserTemplates();
      templates.forEach(item => {
        arr.push(new TemplatePickItem(item));
      });
      resolve(arr);
    });
    // 选择模板
    const temp = await window.showQuickPick(promise, {
      title: '发布模板',
      placeHolder: '请选择需要发布的模板',
    });
    if (temp) {
      await window.withProgress({ location: ProgressLocation.Notification, title: '发布模板' }, async progress => {
        progress.report({ message: '正在发布模板...' });
        const res = await CoreAPI.cli('ExecuteTemplCLICmd', { pstscmdname: 'devtempl_publish', psdevslntemplid: temp.data.psdevslntemplid });
        if (res) {
          window.showInformationMessage(`发布成功: ${temp.label}`);
        }
      });
    }
  }
}
