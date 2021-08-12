import { commands, ProgressLocation, window } from 'vscode';
import { CommandConst } from '../../constants';
import { ctx } from '../../context';
import { SystemRunPickItem } from '../../entities';
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
    commands.registerCommand(CommandConst.SYSTEM.PUBLISH, this.execute, this);
  }

  protected async execute(): Promise<void> {
    const psDevSlnSys = ctx.get('psdevslnsys');
    // 加载可刷新的模板
    const promise = new Promise<readonly SystemRunPickItem[]>(async resolve => {
      const arr: SystemRunPickItem[] = [];
      const sysRuns = await CoreAPI.curSystemRuns();
      sysRuns.forEach(item => {
        arr.push(new SystemRunPickItem(item));
      });
      resolve(arr);
    });
    // 选择模板
    const sysRun = await window.showQuickPick(promise, {
      title: '代码发布',
      placeHolder: '请选择需要运行的发布模式',
    });
    if (!sysRun) {
      return;
    }
    return window.withProgress({ location: ProgressLocation.Notification, title: '系统发布' }, progress => {
      return new Promise(resolve => {
        setTimeout(async () => {
          progress.report({ message: '正在建立发布任务...' });
          const res = await CoreAPI.cli('ExecuteSysCLICmd', { pstscmdname: 'devsys_pubcode', psdevslnsysid: psDevSlnSys, data: { sysrun: sysRun.data.pssystemrunname } });
          if (res) {
            window.showInformationMessage(`已建立 <${ctx.get('psdevslnsysname')}> 系统代码发布`);
          }
          resolve();
        }, 300);
      });
    });
  }
}
