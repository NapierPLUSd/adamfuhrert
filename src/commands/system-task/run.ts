import { commands } from 'vscode';
import { CommandConst, RTContextConst } from '../../constants';
import { ctx } from '../../context';
import { CoreAPI, serviceApi } from '../../service';
import { taskBar } from '../../status-bar';
import { notNilEmpty } from '../../util';

export class SystemRunTaskCommand {
  constructor() {
    commands.registerCommand(CommandConst.SYSTEM.TASK.RUN, this.execute, this);
  }

  protected async execute(run: Record<string, any>): Promise<any> {
    const data = run.data;
    if (data) {
      if (notNilEmpty(data.pssysappid)) {
        // 保存应用，刷新缓存
        await serviceApi.refreshAppCache(data.pssysappid);
      }
      // 发布
      const psDevSlnSys = ctx.get('psdevslnsys');
      ctx.setContext(RTContextConst.PUBLISH_CODE, true);
      taskBar.warn({ text: `$(loading~spin) 正在建立发布任务` });
      const res = await CoreAPI.cli('ExecuteSysCLICmd', { pstscmdname: 'devsys_pubcode', psdevslnsysid: psDevSlnSys, data: { sysrun: run.data.pssystemrunname } });
      if (res && res.status !== 200) {
        taskBar.hide();
        ctx.setContext(RTContextConst.PUBLISH_CODE, false);
      }
      return res;
    }
  }
}
