import { FileStat, FileType, Uri } from 'vscode';
import { GlobalConst } from '../../../constants';
import { PSMosFile } from '../../../entities';

/**
 * 文件系统基类
 *
 * @author chitanda
 * @date 2021-11-30 12:11:17
 * @export
 * @abstract
 * @class MosFileStat
 * @implements {FileStat}
 */
export abstract class MosFileStat implements FileStat {
  ctime: number = Date.now();
  mtime: number = Date.now();
  size: number = 0;

  /**
   * 文件路径
   *
   * @author chitanda
   * @date 2021-11-30 12:11:03
   * @readonly
   * @type {string}
   */
  get path(): string {
    return this.content.path;
  }

  /**
   * 全路径，为文件时有用
   *
   * @author chitanda
   * @date 2021-12-07 10:12:04
   * @readonly
   * @type {string}
   */
  get fullPath(): string {
    return this.path;
  }

  /**
   * 文件名称
   *
   * @author chitanda
   * @date 2021-11-30 12:11:11
   * @readonly
   * @type {string}
   */
  get name(): string {
    return this.content.name;
  }

  readonly logicName!: string;

  /**
   * Creates an instance of MosFileStat.
   *
   * @author chitanda
   * @date 2021-11-30 12:11:19
   * @param {PSMosFile} content 文件对象
   * @param {FileType} type 文件类型
   */
  constructor(public readonly content: PSMosFile, readonly type: FileType) {
    // 计算中文逻辑名称
    if (content.type === 'DR') {
      this.logicName = content.filetag4;
    } else {
      let name = '';
      if (content.filetag4) {
        name = content.filetag4;
      }
      if (name) {
        name = `${name}（${content.psmosfilename}）`;
      } else {
        name = content.psmosfilename;
      }
      this.logicName = name;
    }
  }

  /**
   * 获取 uri
   *
   * @author chitanda
   * @date 2021-11-30 12:11:32
   * @return {*}  {Uri}
   */
  getUri(): Uri {
    return Uri.parse(`${GlobalConst.MOS_FS_PROTOCOL}${this.fullPath}`);
  }
}
