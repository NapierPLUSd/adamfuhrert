import { commands, window } from 'vscode';
import { CommandConst, RTContextConst } from '../../constants';
import { ctx } from '../../context';
import { SystemRunPickItem } from '../../entities';
import { CoreAPI } from '../../service';
import { taskBar } from '../../status-bar';
import { getErrMessage } from '../../util';

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
    ctx.setContext(RTContextConst.PUBLISH_CODE, true);
    taskBar.warn({ text: `$(loading~spin) 正在建立发布任务` });
    const res = await CoreAPI.cli('ExecuteSysCLICmd', { pstscmdname: 'devsys_pubcode', psdevslnsysid: psDevSlnSys, data: { sysrun: sysRun.data.pssystemrunname } });
    if (res && res.status !== 200) {
      taskBar.hide();
      ctx.setContext(RTContextConst.PUBLISH_CODE, false);
    }
  }
}
