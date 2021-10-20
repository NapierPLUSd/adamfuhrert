import { commands, StatusBarAlignment, window } from 'vscode';
import { CommandConst } from '../../constants';
import { ctx } from '../../context';
import { serviceApi } from '../../service';
import { notNilEmpty } from '../../util';

export class SystemRunMultipleTaskCommand {
  protected bar = window.createStatusBarItem(StatusBarAlignment.Right, 20);

  constructor() {
    commands.registerCommand(CommandConst.SYSTEM.TASK.MULTIPLE, this.execute, this);
  }

  protected async execute(runs: Record<string, any>[]): Promise<void> {
    if (runs && notNilEmpty(runs)) {
      if (runs.length === 1) {
        await commands.executeCommand(CommandConst.SYSTEM.TASK.RUN, runs[0]);
      } else {
        await this.executeRuns(runs);
      }
    }
  }

  protected async executeRuns(runs: Record<string, any>[]): Promise<void> {
    this.bar.show();
    this.bar.color = '#3880ff';
    for (let i = 0; i < runs.length; i++) {
      const run = runs[i];
      this.bar.text = `$(loading~spin) 批量执行发布任务(${i + 1}/${runs.length}): ${run.label}`;
      const res: any = await commands.executeCommand(CommandConst.SYSTEM.TASK.RUN, run);
      if (res && res.status === 200) {
        await this.currentTaskExecutionCompleted();
      }
    }
    this.bar.hide();
  }

  /**
   * 等待当前任务执行完毕
   *
   * @author chitanda
   * @date 2021-12-22 14:12:03
   * @protected
   * @return {*}  {Promise<void>}
   */
  protected currentTaskExecutionCompleted(): Promise<void> {
    return new Promise(resolve => {
      const sub = ctx.ws.command(
        async () => {
          const items = await serviceApi.getSystemRun();
          if (items.length > 0) {
            return;
          }
          ctx.ws.unsubscribe(sub);
          setTimeout(() => {
            resolve();
          }, 3000);
        },
        'all',
        'PSSYSDEVBKTASK',
      );
    });
  }
}
