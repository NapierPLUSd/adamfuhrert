import { commands, window } from 'vscode';
import { CommandConst } from '../../constants';
import { MosFilePickItem } from '../../entities';
import { IBizMOSService } from '../../file-system';

/**
 * 搜索实体
 *
 * @author chitanda
 * @date 2021-12-06 19:12:28
 * @export
 * @class SearchEntityCommand
 */
export class SearchEntityCommand {
  constructor() {
    commands.registerCommand(CommandConst.MOS_FS.SEARCH_ENTITY, this.execute, this);
  }

  protected async execute(): Promise<void> {
    // 加载实体信息
    const promise = new Promise<readonly MosFilePickItem[]>(async resolve => {
      const arr: MosFilePickItem[] = [];
      const service = IBizMOSService.getInstance();
      const entities = await service.listFiles('/psdataentities');
      if (entities) {
        for (let i = 0; i < entities.length; i++) {
          arr.push(new MosFilePickItem(entities[i]));
        }
      }
      resolve(arr);
    });
    const entity = await window.showQuickPick(promise, {
      title: '查找实体',
      placeHolder: '请输入实体名称',
      matchOnDescription: true,
      matchOnDetail: true,
    });
    if (entity) {
      commands.executeCommand(CommandConst.MOS_FS.OPEN_FILE, entity.data);
    }
  }
}
