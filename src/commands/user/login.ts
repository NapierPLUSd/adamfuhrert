import { commands } from 'vscode';
import { CommandConst } from '../../constants';
import { login } from '../../service';

export class UserLoginCommand {
  constructor() {
    commands.registerCommand(CommandConst.USER.LOGIN, this.execute.bind(this));
  }

  protected async execute(): Promise<void> {
    login.login();
  }
}
