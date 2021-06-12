import { QuickPickItem } from 'vscode';

/**
 * 模板选择项
 *
 * @author chitanda
 * @date 2021-12-07 11:12:27
 * @export
 * @class TemplatePickItem
 * @implements {QuickPickItem}
 */
export class TemplatePickItem implements QuickPickItem {
  readonly label: string;
  readonly description?: string | undefined;
  readonly detail?: string | undefined;
  readonly picked?: boolean | undefined;
  readonly alwaysShow?: boolean | undefined;
  readonly data: Record<string, string>;

  /**
   * Creates an instance of TemplatePickItem.
   * @author chitanda
   * @date 2021-12-07 11:12:30
   * @param {Record<string, string>} temp
   */
  constructor(temp: Record<string, string>) {
    this.data = temp;
    let description = '';
    if (temp.templtype === 'PSPF') {
      description = '前端模板';
      if (temp.pspfname) {
        description += ` - ${temp.pspfname}`;
      }
    } else {
      description = '后端模板';
      if (temp.pssfname) {
        description += ` - ${temp.pssfname}`;
      }
    }
    this.label = temp.psdevslntemplname;
    this.description = description;
    if (temp.memo) {
      this.detail = temp.memo;
    }
  }
}
