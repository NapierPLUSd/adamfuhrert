import { commands } from 'vscode';
import { CommandConst } from '../../constants';
import { login } from '../../service';

/**
 * 用户登出
 *
 * @author chitanda
 * @date 2021-12-08 15:12:52
 * @export
 * @class UserLogoutCommand
 */
export class UserLogoutCommand {
  constructor() {
    commands.registerCommand(CommandConst.USER.LOGOUT, this.execute, this);
  }

  protected async execute(): Promise<void> {
    login.logout();
  }
}
