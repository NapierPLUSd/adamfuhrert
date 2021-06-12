import { QuickPickItem } from 'vscode';
import { notNilEmpty } from '../../util';
import { PSMosFile } from '../mos-file/ps-mos-file';

/**
 * mos file 选择项
 *
 * @author chitanda
 * @date 2021-12-07 11:12:49
 * @export
 * @class MosFilePickItem
 * @implements {QuickPickItem}
 */
export class MosFilePickItem implements QuickPickItem {
  /**
   * 显示 label 内容
   *
   * @author chitanda
   * @date 2021-12-07 11:12:52
   * @type {string}
   */
  readonly label!: string;
  readonly description?: string | undefined;
  readonly detail?: string | undefined;
  readonly picked?: boolean | undefined;
  readonly alwaysShow?: boolean | undefined;
  readonly data: PSMosFile;

  /**
   * Creates an instance of MosFilePickItem.
   *
   * @author chitanda
   * @date 2021-12-07 11:12:13
   * @param {PSMosFile} mosFile
   */
  constructor(mosFile: PSMosFile) {
    this.data = mosFile;
    if (notNilEmpty(mosFile.filetag4)) {
      this.label = mosFile.filetag4;
    }
    if (notNilEmpty(this.label)) {
      this.description = mosFile.psmosfilename;
    } else {
      this.label = mosFile.psmosfilename;
    }
    this.detail = mosFile.filetag2 || mosFile.psmosfileid;
  }
}
