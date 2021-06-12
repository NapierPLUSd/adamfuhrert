import { commands } from 'vscode';
import { CommandConst } from '../../constants';
import { IBizMOSService } from '../../file-system';

/**
 * 搜索实体视图
 *
 * @author chitanda
 * @date 2021-12-06 19:12:35
 * @export
 * @class SearchEntityViewCommand
 */
export class SearchEntityViewCommand {
  constructor() {
    commands.registerCommand(CommandConst.MOS_FS.SEARCH_ENTITY_VIEW, this.execute.bind(this));
  }

  protected async execute(): Promise<void> {
    const service = IBizMOSService.getInstance();
    const entityViews = await service.listFiles('/psdeviewbases');
    console.log(entityViews);
  }
}
