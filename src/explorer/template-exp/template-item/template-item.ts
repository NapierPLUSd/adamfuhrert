import { TreeItem } from 'vscode';

export class TemplateItem extends TreeItem {
  constructor(data: any) {
    super(data.psdevslntemplname);
    let description = '';
    if (data.templtype === 'PSPF') {
      description = '前端模板';
      if (data.pspfname) {
        description += ` - ${data.pspfname}`;
      }
    } else {
      description = '后端模板';
      if (data.pssfname) {
        description += ` - ${data.pssfname}`;
      }
    }
    this.label = data.psdevslntemplname;
    this.description = description;
    if (data.memo) {
      this.tooltip = data.memo;
    }
  }
}
