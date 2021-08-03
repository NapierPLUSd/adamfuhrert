import { QuickPickItem } from 'vscode';

/**
 * 系统运行选项
 *
 * @author chitanda
 * @date 2021-12-13 15:12:27
 * @export
 * @class SystemRunPickItem
 * @implements {QuickPickItem}
 */
export class SystemRunPickItem implements QuickPickItem {
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
   * @param {Record<string, string>} run
   */
  constructor(run: Record<string, string>) {
    this.data = run;
    this.label = run.pssystemrunname;
    this.description = `服务：${run.pssyssfpubname}`;
    this.detail = `应用：${run.pssysappname}`;
  }
}
