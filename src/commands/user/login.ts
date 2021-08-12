import { commands } from 'vscode';
import { CommandConst } from '../../constants';
import { login } from '../../service';

/**
 * 用户登录
 *
 * @author chitanda
 * @date 2021-12-08 15:12:46
 * @export
 * @class UserLoginCommand
 */
export class UserLoginCommand {
  constructor() {
    commands.registerCommand(CommandConst.USER.LOGIN, this.execute, this);
  }

  protected async execute(): Promise<void> {
    login.login();
  }
}
