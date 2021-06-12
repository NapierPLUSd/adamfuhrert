import { DesignToolUrl, IBizModelFSCustomConfig } from '../../config';
import { FileExtensionConst } from '../../constants';
import { PSMosFileBase } from './ps-mos-file-base';

/**
 * 实体-模型系统文件
 *
 * @author chitanda
 * @date 2021-11-10 10:11:01
 * @export
 * @class PSMosFile
 * @extends {PSMosFileBase}
 */
export class PSMosFile extends PSMosFileBase {
  /**
  /**
   * 分隔符
   *
   * @author chitanda
   * @date 2021-11-14 17:11:30
   * @static
   */
  static readonly pathSeparator = '/';
  /**
   * 主键
   *
   * @type {*}
   * @memberof PsMOSFile
   */
  get id() {
    return this.psmodelid;
  }
  /**
   * 主文本信息
   *
   * @type {*}
   * @memberof PsMOSFile
   */
  get name(): string {
    return this.psmosfilename;
  }
  /**
   * 父路径
   *
   * @author chitanda
   * @date 2021-11-14 17:11:44
   * @protected
   * @type {(string | null | undefined)}
   */
  protected _pPath: string | null | undefined = undefined;
  /**
   * 父路径
   *
   * @author chitanda
   * @date 2021-11-14 17:11:40
   * @readonly
   * @type {(string | null)}
   */
  get pPath(): string | null {
    if (this._pPath !== undefined) {
      return this._pPath;
    }
    const paths = this.path.split(PSMosFile.pathSeparator);
    if (paths.length > 2) {
      paths.pop();
      this._pPath = paths.join(PSMosFile.pathSeparator);
    } else {
      this._pPath = null;
    }
    return this._pPath;
  }
  /**
   * 路径
   *
   * @type {string}
   * @memberof PsMOSFile
   */
  get path(): string {
    if (this.isLink) {
      return this.filetag2;
    }
    return this.psmosfileid;
  }
  /**
   * 是否为文件夹
   *
   * @type {boolean}
   * @memberof PsMOSFile
   */
  get isFolder(): boolean {
    return this.folderflag !== 0;
  }
  /**
   * 文件类型
   *
   * @author chitanda
   * @date 2021-11-10 10:11:16
   * @readonly
   * @type {('MODEL' | 'LINK' | 'DR' | 'GROUP' | 'RECENTS' | 'BOOKMARKS' | 'MODELREPOS')}
   */
  get type(): 'MODEL' | 'LINK' | 'DR' | 'GROUP' | 'RECENTS' | 'BOOKMARKS' | 'MODELREPOS' {
    return this.filetag;
  }
  /**
   * 是否为链接文件
   *
   * @author chitanda
   * @date 2021-11-24 16:11:49
   * @readonly
   * @type {boolean}
   */
  get isLink(): boolean {
    return this.type === 'LINK';
  }
  /**
   * 是否有索引文件
   *
   * @author chitanda
   * @date 2021-11-10 10:11:58
   * @readonly
   * @type {boolean}
   */
  get ownIndex(): boolean {
    return IBizModelFSCustomConfig.ownIndex(this.path);
  }
  /**
   * 文件类型
   *
   * @type {(0 | 1 | 3)} 0：文件、1：文件夹、3：文件夹并默认展开
   * @memberof PsMOSFile
   */
  folderflag!: 0 | 1 | 3;

  /**
   * 指定扩展名
   *
   * @author chitanda
   * @date 2021-11-18 11:11:51
   * @protected
   * @type {string}
   */
  protected _extension?: string;

  /**
   * 当前文件扩展类型
   *
   * @author chitanda
   * @date 2021-11-16 17:11:45
   * @readonly
   * @type {string}
   */
  get extension(): string {
    if (this._extension) {
      return this._extension;
    }
    const type = this.psmodeltype as string;
    const subType = this.psmodelsubtype as string;
    if (DesignToolUrl.has(subType) || DesignToolUrl.has(type)) {
      return FileExtensionConst.MODEL_UI;
    }
    return '';
  }

  /**
   * 特殊指定扩展名称
   *
   * @author chitanda
   * @date 2021-11-18 11:11:36
   */
  set extension(str: string) {
    this._extension = str;
  }

  get fullPath(): string {
    return `${this.path}${this.extension}`;
  }

  /**
   * Creates an instance of PSMosFile.
   *
   * @author chitanda
   * @date 2021-11-10 10:11:51
   * @param {Record<string, any>} data
   */
  constructor(data: Record<string, any>) {
    super();
    this.fill(data);
  }

  /**
   * 填充数据
   *
   * @author chitanda
   * @date 2021-11-10 10:11:14
   * @protected
   * @param {*} data
   */
  protected fill(data: any) {
    const self = this as any;
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const val = data[key];
        self[key.toLowerCase()] = val;
      }
    }
  }

  /**
   * 转为 JSON 字符串
   *
   * @author chitanda
   * @date 2021-11-11 09:11:37
   * @return {*}  {string}
   */
  toString(): string {
    try {
      return JSON.stringify(this, null, 2);
    } catch (err) {
      console.log(err);
    }
    return '';
  }
}
