import { commands, window } from 'vscode';
import { CommandConst } from '../../constants';
import { CoreAPI } from '../../service';

export class SystemRunAllTaskCommand {
  constructor() {
    commands.registerCommand(CommandConst.SYSTEM.TASK.ALL, this.execute, this);
  }

  protected async execute(): Promise<void> {
    const result = await window.showWarningMessage(`将在后台执行所有系统任务，请确认是否继续？`, '继续');
    if (result === '继续') {
      const runs = await CoreAPI.curSystemRuns();
    }
  }
}
