import { Disposable, Event, EventEmitter, FileChangeEvent, FileSystemError, FileSystemProvider, FileType, Uri } from 'vscode';
import { IBizMOSService } from '../service/ibiz-mos.service';
import { Directory } from '../entry/directory';
import { File } from '../entry/file';
import { FileExtensionConst, GlobalConst } from '../../../constants';
import { MosFileUtil } from '../../../util';
import { Entry } from '../entry';
import { IBizModelFSCustomConfig } from '../../../config';
import { PSMosFile } from '../../../entities';

/**
 * IBiz 模型虚拟文件系统适配，自定义版非递归模式
 *
 * @author chitanda
 * @date 2021-11-09 08:11:19
 * @export
 * @class IBizMosFSCustom
 * @implements {FileSystemProvider}
 */
export class IBizMosFSCustom implements FileSystemProvider {
  /**
   * 所有已加载文件
   *
   * @author chitanda
   * @date 2021-11-30 19:11:11
   * @protected
   */
  protected entries: Map<string, Entry>;
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
    this.fsService = IBizMOSService.getInstance();
    this.entries = new Map();
  }

  watch(_uri: Uri, _options: { recursive: boolean; excludes: string[] }): Disposable {
    return new Disposable(() => {});
  }

  /**
   * 根据地址返回对应 文件、文件夹
   *
   * @author chitanda
   * @date 2021-12-01 14:12:51
   * @param {Uri} uri
   * @return {*}  {Promise<Entry>}
   */
  async stat(uri: Uri): Promise<Entry> {
    let enter = this.exist(uri, true);
    if (!enter) {
      enter = await this.getMosFile(uri.path);
      if (!enter) {
        throw FileSystemError.FileNotFound(`${uri.path}`);
      }
      this.cacheEntry(enter);
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
    const entries = await this.loadDir(uri.path);
    // 返回的目录信息
    const result: [string, FileType][] = [];
    entries.forEach(item => {
      result.push([item.name, item.type]);
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
  async createDirectory(_uri: Uri): Promise<void> {
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
    let enter = this.exist(uri, true) as File;
    if (!enter) {
      enter = (await this.getMosFile(uri.path)) as File;
      if (!enter) {
        throw FileSystemError.FileNotFound(`${uri.path}`);
      }
      this.cacheEntry(enter);
    }
    console.log(`readFile: ${enter.path}`);
    if (MosFileUtil.extensionReg.test(enter.extension)) {
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
  async writeFile(_uri: Uri, _content: Uint8Array, _options: { create: boolean; overwrite: boolean }): Promise<void> {
    throw new Error('暂未支持写入文件');
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
  async delete(_uri: Uri, _options: { recursive: boolean }): Promise<void> {
    throw new Error('暂未支持删除文件');
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
  rename(_oldUri: Uri, _newUri: Uri, _options: { overwrite: boolean }): void | Thenable<void> {
    throw FileSystemError.NoPermissions('暂未支持重命名文件');
  }

  private exist(uri: Uri, silent?: false): Entry;
  private exist(uri: Uri, silent?: boolean): Entry | null;
  private exist(uri: Uri, silent: boolean = false): Entry | null {
    if (this.entries.has(uri.path)) {
      return this.entries.get(uri.path)!;
    }
    if (!silent) {
      throw FileSystemError.FileNotFound(uri);
    }
    return null;
  }

  /**
   * 找父
   *
   * @author chitanda
   * @date 2021-12-01 14:12:41
   * @private
   * @param {Uri} uri
   * @param {number} [position=1] 偏移多少的父，默认为 1 层
   * @return {*}  {(Directory | null)}
   */
  private existParentDirectory(uri: Uri, position: number = 1): Directory | null {
    const paths = uri.path.split('/');
    const path = paths.slice(0, paths.length - position - 1).join('/');
    if (this.entries.has(path)) {
      return this.entries.get(path) as Directory;
    }
    return null;
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
   * @return {*}  {(Promise<File | null>)}
   */
  protected async getMosFile(path: string): Promise<Entry | null> {
    try {
      const data = await this.fsService.get(path, true);
      if (data) {
        if (data.isFolder) {
          return new Directory(data);
        }
        return new File(data);
      }
    } catch (err) {
      throw FileSystemError.FileNotFound(path);
    }
    return null;
  }

  /**
   * 获取指定路径组文件对象
   *
   * @author chitanda
   * @date 2021-11-30 21:11:37
   * @protected
   * @param {string[]} paths
   * @return {*}  {Promise<PSMosFile[]>}
   */
  protected async readFiles(paths: string[]): Promise<PSMosFile[]> {
    return this.fsService.getFiles(paths);
  }

  /**
   * 加载指定目录数据
   *
   * @author chitanda
   * @date 2021-11-30 21:11:04
   * @param {string} path 默认加载根目录数据
   * @return {*}  {Promise<Entry[]>}
   */
  async loadDir(path: string): Promise<Entry[]> {
    console.log(`loadDir: ${path}`);
    if (path === '/') {
      path = '';
    }
    const entries: Entry[] = [];
    // 查找目录是否存在配置文件
    let configs = IBizModelFSCustomConfig.getItems(path);
    // 存在配置文件，并且子只有一级时，忽略当前级别直接加载子级的数据挂载到当前
    if (configs?.length === 1) {
      path = `${path}/${configs[0].name}`;
      configs = IBizModelFSCustomConfig.getItems(path);
    }
    let items: PSMosFile[] = [];
    // 有配置文件时，加载配置文件目录信息
    if (configs) {
      const paths = configs.map(item => `${path}/${item.name}`);
      if (paths?.length > 0) {
        items = await this.readFiles(paths);
        for (let i = 0; i < items.length; i++) {
          const config = configs[i];
          const mosFile = items[i];
          mosFile.filetag4 = config.logicName;
        }
      }
    } else {
      items = await this.fsService.fetchDirectory(path);
    }
    // 实例化全部文件对象
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.path) {
        if (item.isFolder) {
          entries.push(new Directory(item));
        } else {
          entries.push(new File(item));
        }
      }
    }
    // 设置缓存
    entries.forEach(enter => this.cacheEntry(enter));
    // 未指定配置文件时，进行排序
    if (!configs) {
      entries.sort((a, b) => {
        if (a.type === b.type) {
          return a.name.localeCompare(b.name);
        }
        return a.type === FileType.Directory ? -1 : 1;
      });
    }
    return entries;
  }

  /**
   * 缓存文件 or 文件夹信息
   *
   * @author chitanda
   * @date 2021-12-04 22:12:33
   * @protected
   * @param {Entry} entry
   */
  protected cacheEntry(entry: Entry) {
    this.entries.set(entry.fullPath, entry);
  }
}
