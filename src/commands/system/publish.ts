import { commands, ProgressLocation, window } from 'vscode';
import { CommandConst } from '../../constants';
import { ctx } from '../../context';
import { CoreAPI } from '../../service';

/**
 * 系统发布
 *
 * @author chitanda
 * @date 2021-11-25 18:11:34
 * @export
 * @class SystemPublishCommand
 */
export class SystemPublishCommand {
  constructor() {
    commands.registerCommand(CommandConst.SYSTEM.PUBLISH, this.execute.bind(this));
  }

  protected async execute(): Promise<void> {
    const psDevSlnSys = ctx.get('psdevslnsys');
    return window.withProgress({ location: ProgressLocation.Notification, title: '系统发布' }, progress => {
      return new Promise(resolve => {
        setTimeout(async () => {
          progress.report({ message: '正在建立发布任务...' });
          const res = await CoreAPI.cli('ExecuteSysCLICmd', { pstscmdname: 'devsys_pubcode', psdevslnsysid: psDevSlnSys });
          if (res) {
            window.showInformationMessage(`已建立 <${ctx.get('psdevslnsysname')}> 系统代码发布`);
          }
          resolve();
        }, 300);
      });
    });
  }
}
