import { commands, Uri, window } from 'vscode';
import { CommandConst, RTContextConst } from '../../constants';
import { ctx } from '../../context';
import { SystemRunPickItem } from '../../entities';
import { CoreAPI } from '../../service';
import { taskBar } from '../../status-bar';
import { FileUtil } from '../../util';

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
    const pick = window.createQuickPick<SystemRunPickItem>();
    pick.title = '代码发布';
    pick.placeholder = '请选择需要运行的发布模式';
    const btnTooltip = '建立发布配置';
    pick.buttons = [
      {
        tooltip: btnTooltip,
        iconPath: {
          dark: FileUtil.resources.resolveResourceUri('icon/dark/add.svg'),
          light: FileUtil.resources.resolveResourceUri('icon/light/add.svg'),
        },
      },
    ];
    pick.busy = true;
    pick.show();
    const sysRuns = await CoreAPI.curSystemRuns();
    const arr: SystemRunPickItem[] = sysRuns.map(item => new SystemRunPickItem(item));
    if (arr.length === 0) {
      pick.placeholder = '暂无发布配置，请点击输入框右上方的添加按钮建立';
    }
    pick.items = arr;
    pick.busy = false;
    pick.onDidChangeSelection(async items => {
      pick.hide();
      if (items.length > 0) {
        const run = items[0];
        ctx.setContext(RTContextConst.PUBLISH_CODE, true);
        taskBar.warn({ text: `$(loading~spin) 正在建立发布任务` });
        const res = await CoreAPI.cli('ExecuteSysCLICmd', { pstscmdname: 'devsys_pubcode', psdevslnsysid: psDevSlnSys, data: { sysrun: run.data.pssystemrunname } });
        if (res && res.status !== 200) {
          taskBar.hide();
          ctx.setContext(RTContextConst.PUBLISH_CODE, false);
        }
      }
    });
    pick.onDidTriggerButton(e => {
      if (e.tooltip === btnTooltip) {
        const uri = Uri.parse(`${ctx.toolAddress}/mos-dynamic-mgr/#/mosdynamicmgr/${ctx.get('psdevslnsys')}/pssystemruns/views/cursysgridview`);
        commands.executeCommand(CommandConst.VSCODE.OPEN, uri);
      }
    });
  }
}
