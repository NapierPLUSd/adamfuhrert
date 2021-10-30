import { Event, EventEmitter, ExtensionContext, TreeDataProvider } from 'vscode';
import { CoreAPI } from '../../../service';
import { TemplateItem } from '../template-item/template-item';

export type TemplateData = Record<string, unknown>;

/**
 * 模型导航树
 *
 * @author chitanda
 * @date 2021-11-30 10:11:47
 * @export
 * @class ModelExpTreeProvider
 * @implements {TreeDataProvider<TemplateData>}
 */
export class TemplateExpProvider implements TreeDataProvider<TemplateData> {
  readonly evt: EventEmitter<any> = new EventEmitter<any>();

  onDidChangeTreeData: Event<void | TemplateData | null | undefined> | undefined = this.evt.event;

  constructor(protected context: ExtensionContext) {}

  async getTreeItem(file: TemplateData): Promise<TemplateItem> {
    const treeItem = new TemplateItem(file);
    return treeItem;
  }

  async getChildren(file?: TemplateData): Promise<TemplateData[]> {
    const templates = await CoreAPI.curUserTemplates();
    return templates;
  }
}
