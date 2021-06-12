import { posix } from 'path';
import { Disposable, Event, EventEmitter, FileChangeEvent, FileStat, FileSystemError, FileSystemProvider, FileType, Uri } from 'vscode';
import { PSMosFile } from '../../../entities';
import { IBizMOSService } from '../service/ibiz-mos.service';
import { Directory } from '../entry/directory';
import { File } from '../entry/file';
import { FileExtensionConst, GlobalConst } from '../../../constants';
import { MosFileUtil, showErrInfo } from '../../../util';
import { Entry } from '../entry';

/**
 * IBiz 模型虚拟文件系统适配
 *
 * @author chitanda
 * @date 2021-11-09 08:11:19
 * @export
 * @class IBizMosFS
 * @implements {FileSystemProvider}
 */
export class IBizMosFS implements FileSystemProvider {
  /**
   * 根文件夹
   *
   * @author chitanda
   * @date 2021-11-09 10:11:30
   */
  readonly root = new Directory(new PSMosFile({ psmosfileid: '/', psmosfilename: '/' }));

  /**
   * 文件变更事件
   *
   * @author chitanda
   * @date 2021-11-09 09:11:08
   * @private
   */
  private emitter = new EventEmitter<FileChangeEvent[]>();

  /**
   * 文件服务
   *
   * @author chitanda
   * @date 2021-11-09 16:11:16
   * @private
   */
  private fsService: IBizMOSService;

  /**
   * 忽略去后台查询的文件 or 目录
   *
   * @author chitanda
   * @date 2021-11-12 11:11:57
   * @private
   */
  private virtualFilePath: RegExp;

  /**
   * 文件[创建、修改、删除]触发
   *
   * @author chitanda
   * @date 2021-11-09 09:11:26
   * @type {Event<FileChangeEvent[]>}
   */
  onDidChangeFile: Event<FileChangeEvent[]> = this.emitter.event;

  /**
   * Creates an instance of IBizMosFS.
   *
   * @author chitanda
   * @date 2021-11-14 20:11:13
   */
  constructor() {
    this.fsService = new IBizMOSService();
    // 计算支持的目录正则 Start
    // {
    //   const rootPathData = MosFileUtil.pathReplace.PSSYSTEM;
    //   let regStr = '';
    //   let isRoot = true;
    //   for (const key in rootPathData) {
    //     const data = rootPathData[key];
    //     if (isRoot === false) {
    //       regStr += `|`;
    //     }
    //     regStr += `\/${data.caption}`;
    //     isRoot = false;
    //   }
    //   this.virtualFilePath = new RegExp(`^(${regStr})`);
    // }
    {
      this.virtualFilePath = new RegExp(
        `^(/pssubsysserviceapis|/pssystestprjs|/pssyscounters|/psviewmsggroups|/psviewmsgs|/psachandlers|/psdetoolbars|/pssyspfplugins|/pssysvaluerules|/pssyssearchschemes|/pssysermaps|/psworkflows|/pssysmsgtempls|/pssystestdata|/pssysapps|/pssysimages|/pssysdynamodels|/pssysviewpanels|/pssyseditorstyles|/pssyssfplugins|/pssysrefs|/psmodules|/pssysportlets|/pssysdelogicnodes|/pssyssfpubs|/psdeuagroups|/pssysresources|/pssysutildes|/pscodelists|/pssysmodelgroups|/pssysserviceapis|/pssysbdschemes|/psdeuiactions|/pssyscsses|/pssysdeftypes|/pssysdbschemes|/pssysucmaps|/pssysunits)`,
      );
    }
  }

  /**
   * 是否为当前虚拟文件系统支持文件
   *
   * @author chitanda
   * @date 2021-11-14 20:11:04
   * @param {string} path
   * @return {*}  {boolean}
   */
  isFSPath(path: string): boolean {
    return this.virtualFilePath.test(path);
  }

  watch(uri: Uri, _options: { recursive: boolean; excludes: string[] }): Disposable {
    console.log(`watch: ${uri.path}`);
    return new Disposable(() => {});
  }

  /**
   * 根据地址返回对应 文件、文件夹
   *
   * @author chitanda
   * @date 2021-11-09 09:11:47
   * @param {Uri} uri
   * @return {*}  {(FileStat | Thenable<FileStat>)}
   */
  async stat(uri: Uri): Promise<FileStat> {
    if (!this.isFSPath(uri.path)) {
      return this._lookup(uri, false);
    }
    let enter = this.getFile(uri);
    if (!enter) {
      enter = await this.getFileByBackend(uri.path);
      if (!enter) {
        throw FileSystemError.FileNotFound(`${uri.path}`);
      }
    }
    console.log(`stat: ${enter.path}`);
    return enter;
  }

  /**
   * 读取目录下文件
   *
   * @author chitanda
   * @date 2021-11-09 16:11:06
   * @param {Uri} uri
   * @return {*}  {Promise<[string, FileType][]>}
   */
  async readDirectory(uri: Uri): Promise<[string, FileType][]> {
    const entry = await this.loadDir(uri);
    // 返回的目录信息
    const result: [string, FileType][] = [];
    entry.entries.forEach((item, key) => {
      result.push([key, item.type]);
    });
    return result;
  }

  /**
   * 新建目录
   *
   * @author chitanda
   * @date 2021-11-18 11:11:49
   * @param {Uri} uri
   * @return {*}  {Promise<void>}
   */
  async createDirectory(uri: Uri): Promise<void> {
    console.log(`createDirectory: ${uri.path}`);
    await this.createMosDirByBackend(uri);
    throw FileSystemError.FileNotADirectory('暂未支持新建目录');
  }

  /**
   * 读取文件内容
   *
   * @author chitanda
   * @date 2021-11-09 16:11:21
   * @param {Uri} uri
   * @return {*}  {Promise<Uint8Array>}
   */
  async readFile(uri: Uri): Promise<Uint8Array> {
    if (!this.isFSPath(uri.path)) {
      throw FileSystemError.FileNotFound(uri);
    }
    let enter = this.getFile(uri);
    if (!enter) {
      enter = await this.getFileByBackend(uri.path);
      if (!enter) {
        throw FileSystemError.FileNotFound(`${uri.path}`);
      }
    }
    console.log(`readFile: ${enter.path}`);
    if (MosFileUtil.extensionReg.test(enter.extension)) {
      // if (FileExtensionConst.MODEL_YAML === enter.extension) {
      //   let parentFile: Directory | null = null;
      //   try {
      //     parentFile = this._lookupParentDirectory(uri, 2);
      //   } catch (err) {}
      //   const model = await this.fsService.loadYamlModel(
      //     enter.path,
      //     enter.content.psmodeltype,
      //     enter.content.psmodelid,
      //     parentFile?.content.psmodeltype,
      //     parentFile?.content.psmodelid,
      //   );
      //   return Buffer.from(model || '');
      // }
      if (FileExtensionConst.MODEL_RUNTIME === enter.extension) {
        return Buffer.from(JSON.stringify(enter.content) || '');
      }
      const data = await this.fsService.getModel(enter.path);
      return Buffer.from(JSON.stringify(data, null, 2) || '');
    }
    return Buffer.from(enter.content.toString());
  }

  /**
   * 写入文件内容
   *
   * @author chitanda
   * @date 2021-11-17 19:11:35
   * @param {Uri} uri
   * @param {Uint8Array} content
   * @param {{ create: boolean; overwrite: boolean }} options
   * @return {*}  {Promise<void>}
   */
  async writeFile(uri: Uri, content: Uint8Array, _options: { create: boolean; overwrite: boolean }): Promise<void> {
    // if (options.create === true) {
    //   throw FileSystemError.NoPermissions('暂未支持新建文件');
    // }
    // 查找文件
    const enter = this.getFile(uri);
    if (!enter) {
      const bol = await this.existByBackend(uri.path);
      if (!bol) {
        await this.createMosFileByBackend(uri, content);
      }
    } else {
      // 设置修改内容
      enter.data = content;
      // if (MosFileUtil.extensionReg.test(enter.extension)) {
      //   if (FileExtensionConst.MODEL_YAML === enter.extension) {
      //     const parentFile = this._lookupParentDirectory(uri, 2);
      //     const model = await this.fsService.saveYamlModel(
      //       enter.path,
      //       enter.content.psmodeltype,
      //       enter.content.psmodelid,
      //       enter.data.toString(),
      //       parentFile.content.psmodeltype,
      //       parentFile.content.psmodelid,
      //     );
      //     if (model && model.srfkey) {
      //       return;
      //     }
      //   }
      // }
      console.log(`writeFile: ${enter.path}`);
    }
    throw FileSystemError.NoPermissions('暂未支持修改该文件');
  }

  /**
   * 删除文件
   *
   * @author chitanda
   * @date 2021-11-17 18:11:55
   * @param {Uri} uri
   * @param {{ recursive: boolean }} options
   * @return {*}  {Promise<void>}
   */
  async delete(uri: Uri, options: { recursive: boolean }): Promise<void> {
    console.log(`delete: ${uri.path}`);
    const bol = await this.fsService.delete(uri.path);
    if (bol === false) {
      throw FileSystemError.NoPermissions('暂未支持删除该文件');
    }
  }

  /**
   * 文件重命名
   *
   * @author chitanda
   * @date 2021-11-09 16:11:41
   * @param {Uri} oldUri
   * @param {Uri} newUri
   * @param {{ overwrite: boolean }} options
   * @return {*}  {(void | Thenable<void>)}
   */
  rename(oldUri: Uri, newUri: Uri, options: { overwrite: boolean }): void | Thenable<void> {
    console.log(`rename old: ${oldUri.path} new: ${newUri.path}`);
    throw FileSystemError.NoPermissions('暂未支持重命名文件');
  }

  private _lookup(uri: Uri, silent: false): Entry;
  private _lookup(uri: Uri, silent: boolean): Entry | undefined;
  private _lookup(uri: Uri, silent: boolean): Entry | undefined {
    const parts = uri.path.split('/');
    let entry: Entry = this.root;
    for (const part of parts) {
      if (!part) {
        continue;
      }
      let child: Entry | undefined;
      if (entry instanceof Directory) {
        child = entry.entries.get(part);
      }
      if (!child) {
        if (!silent) {
          throw FileSystemError.FileNotFound(uri);
        } else {
          return undefined;
        }
      }
      entry = child;
    }
    return entry;
  }

  private _lookupAsDirectory(uri: Uri, silent: boolean): Directory {
    const entry = this._lookup(uri, silent);
    if (entry instanceof Directory) {
      return entry;
    }
    throw FileSystemError.FileNotADirectory(uri);
  }

  private _lookupAsFile(uri: Uri, silent: boolean): File {
    const entry = this._lookup(uri, silent);
    if (entry instanceof File) {
      return entry;
    }
    throw FileSystemError.FileIsADirectory(uri);
  }

  /**
   * 查找父目录
   *
   * @author chitanda
   * @date 2021-11-17 19:11:56
   * @private
   * @param {Uri} uri 当前目录
   * @param {number} [offset=1] 偏移几级查找父，默认为 1 级
   * @return {*}  {Directory}
   */
  private _lookupParentDirectory(uri: Uri, offset: number = 1): Directory {
    let path = uri.path;
    for (let i = 0; i < offset; i++) {
      path = posix.dirname(path);
    }
    const dirname = uri.with({ path });
    return this._lookupAsDirectory(dirname, false);
  }

  /**
   * 获取文件对象
   *
   * @author chitanda
   * @date 2021-11-15 14:11:11
   * @param {Uri} uri
   * @return {*}  {(File | undefined)}
   */
  getFile(uri: Uri): File | undefined {
    return this._lookup(uri, true) as File;
  }

  /**
   * 根据路径获取当前虚拟文件系统的 uri 对象
   *
   * @author chitanda
   * @date 2021-11-14 19:11:56
   * @param {string} path
   * @return {*}  {Uri}
   */
  getUri(path: string): Uri {
    return Uri.parse(GlobalConst.MOS_FS_PROTOCOL + path);
  }

  /**
   * 去后台查询文件对象
   *
   * @author chitanda
   * @date 2021-11-15 15:11:50
   * @protected
   * @param {string} path
   * @return {*}  {(Promise<File | undefined>)}
   */
  protected async getFileByBackend(path: string): Promise<File | undefined> {
    try {
      const data = await this.fsService.get(path, true);
      if (data) {
        return new File(data);
      }
    } catch (err) {
      showErrInfo(err);
    }
  }

  /**
   * 判断文件是否存在
   *
   * @author chitanda
   * @date 2021-11-18 10:11:11
   * @protected
   * @param {string} path
   * @return {*}  {Promise<boolean>}
   */
  protected async existByBackend(path: string): Promise<boolean> {
    const data = await this.getFileByBackend(path);
    if (data) {
      return true;
    }
    return false;
  }

  /**
   * 加载目录数据
   *
   * @author chitanda
   * @date 2021-11-14 21:11:23
   * @param {Uri} uri
   * @param {boolean} [silent=false]
   * @return {*}  {Promise<Directory>}
   */
  async loadDir(uri: Uri, silent: boolean = false): Promise<Directory> {
    // 需要打开的目录对象
    const enter = this._lookupAsDirectory(uri, silent);
    if (enter.entries.size > 0) {
      return enter;
    }
    console.log(`readDirectory: ${enter.path}`);
    // 获取子信息
    const items = await this.fsService.fetch(enter.content);
    if (enter.entries.size > 0) {
      return enter;
    }
    // 填充子信息
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.path) {
        if (item.isFolder) {
          enter.entries.set(item.name, new Directory(item));
        } else {
          const file = new File(item);
          enter.entries.set(file.name, file);
        }
      }
    }
    return enter;
  }

  /**
   * 去 api 创建文件
   *
   * @author chitanda
   * @date 2021-11-18 10:11:46
   * @protected
   * @param {Uri} uri
   * @param {Uint8Array} content
   * @return {*}  {Promise<void>}
   */
  protected async createMosFileByBackend(uri: Uri, content: Uint8Array): Promise<void> {
    const parent = this._lookupParentDirectory(uri);
    if (parent.content.type !== 'DR') {
      throw FileSystemError.NoPermissions('该目录暂未支持新建文件');
    }
    const res = await this.fsService.create(uri.path, { data: content.toString() });
    console.log('新建成功：', res);
  }

  /**
   * 去 api 创建文件夹
   *
   * @author chitanda
   * @date 2021-11-18 11:11:48
   * @protected
   * @param {Uri} uri
   * @param {*} data
   * @return {*}  {Promise<void>}
   */
  protected async createMosDirByBackend(uri: Uri, data?: any): Promise<void> {
    const parent = this._lookupParentDirectory(uri);
    if (parent.content.type === 'MODEL') {
      throw FileSystemError.NoPermissions('该目录暂未支持新建数据');
    }
    const res = await this.fsService.create(uri.path, { data });
    console.log('新建成功：', res);
  }
}
