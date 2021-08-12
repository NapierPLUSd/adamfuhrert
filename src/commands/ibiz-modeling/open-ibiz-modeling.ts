import { commands, Uri } from 'vscode';
import { CommandConst } from '../../constants';
import { ctx } from '../../context';

/**
 * 打开 iBizModeling 工具
 *
 * @author chitanda
 * @date 2021-12-07 17:12:13
 * @export
 * @class OpenIBizModelingCommand
 */
export class OpenIBizModelingCommand {
  constructor() {
    commands.registerCommand(CommandConst.IBIZ_MODELING.OPEN, this.execute, this);
  }

  protected async execute(): Promise<void> {
    const openUri = Uri.parse(`${ctx.toolAddress}/mos-dynamic-mgr/#/mosdynamicmgr/${ctx.get('psdevslnsys')}`);
    commands.executeCommand(CommandConst.VSCODE.OPEN, openUri);
  }
}
