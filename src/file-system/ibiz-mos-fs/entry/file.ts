import { FileType, Uri } from 'vscode';
import { GlobalConst } from '../../../constants';
import { PSMosFile } from '../../../entities';
import { MosFileStat } from './mos-file-stat';

/**
 * 文件
 *
 * @author chitanda
 * @date 2021-11-30 12:11:45
 * @export
 * @class File
 * @extends {MosFileStat}
 */
export class File extends MosFileStat {
  /**
   * 文件内容
   *
   * @author chitanda
   * @date 2021-11-09 09:11:59
   * @type {Uint8Array}
   */
  get data(): Uint8Array {
    switch (this.extension) {
      default:
        try {
          this.content.data = JSON.stringify(JSON.parse(this.content.data), null, 2);
        } catch (err) {
          console.log(err);
        }
    }
    return Buffer.from(this.content.data);
  }

  set data(val: Uint8Array) {
    this.mtime = Date.now();
    this.size = val.byteLength;
    this.content.data = val.toString();
  }

  get fullPath(): string {
    return this.path + this.extension;
  }

  get name(): string {
    return super.name + this.extension;
  }

  /**
   * 文件扩展名
   *
   * @author chitanda
   * @date 2021-11-15 19:11:09
   * @type {string}
   */
  readonly extension: string;

  /**
   * Creates an instance of File.
   *
   * @author chitanda
   * @date 2021-11-12 18:11:17
   * @param {PSMosFile} content 模型文件
   * @param {string} [extension] 文件扩展名
   */
  constructor(public readonly content: PSMosFile, extension?: string) {
    super(content, FileType.File | (content.isLink === true ? FileType.SymbolicLink : 0));
    if (extension) {
      this.extension = extension;
    } else if (content.extension) {
      this.extension = content.extension;
    } else {
      this.extension = '';
    }
  }

  getUri(): Uri {
    return Uri.parse(`${GlobalConst.MOS_FS_PROTOCOL}${this.fullPath}`);
  }
}
