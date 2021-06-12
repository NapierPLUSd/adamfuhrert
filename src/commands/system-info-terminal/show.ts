import { commands } from 'vscode';
import { CommandConst } from '../../constants';
import { wsOutput } from '../../terminal';

export class SystemInfoTerminalShowCommand {
  constructor() {
    commands.registerCommand(CommandConst.SYSTEM_INFO_TERMINAL.SHOW, this.execute.bind(this));
  }

  protected async execute(): Promise<void> {
    wsOutput.openTerminal();
  }
}
