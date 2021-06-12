import { FileType } from 'vscode';
import { Entry } from '..';
import { PSMosFile } from '../../../entities';
import { MosFileStat } from './mos-file-stat';

/**
 * 文件夹
 *
 * @author chitanda
 * @date 2021-11-30 12:11:28
 * @export
 * @class Directory
 * @extends {MosFileStat}
 */
export class Directory extends MosFileStat {
  /**
   * 子目录
   *
   * @author chitanda
   * @date 2021-11-09 09:11:13
   * @type {(Map<string, Entry>)}
   */
  readonly entries: Map<string, Entry> = new Map();

  constructor(public readonly content: PSMosFile) {
    super(content, FileType.Directory | (content.isLink === true ? FileType.SymbolicLink : 0));
  }
}
