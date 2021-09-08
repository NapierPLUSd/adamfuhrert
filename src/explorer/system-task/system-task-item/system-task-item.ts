import { TreeItem } from 'vscode';
import { IPSData } from '../../../interface';
import { FileUtil } from '../../../util';

/**
 * 模型树节点
 *
 * @author chitanda
 * @date 2021-11-30 12:11:35
 * @export
 * @class SystemTaskItem
 * @extends {TreeItem}
 */
export class SystemTaskItem extends TreeItem {
  constructor(protected data: IPSData) {
    super(data.pssysdevbktaskname);
    if (data.taskstate === 20) {
      const darkIcon = FileUtil.resources.resolveResourceUri('icon/dark/loading.svg');
      const lightIcon = FileUtil.resources.resolveResourceUri('icon/light/loading.svg');
      this.iconPath = {
        dark: darkIcon,
        light: lightIcon,
      };
    }
    if (data.queueinfo) {
      this.description = data.queueinfo;
    }
  }
}
