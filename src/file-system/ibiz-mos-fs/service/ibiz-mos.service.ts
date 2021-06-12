import { AxiosRequestConfig } from 'axios';
import { window } from 'vscode';
import { FileExtensionConst } from '../../../constants';
import { ctx } from '../../../context';
import { Fetch, MosFileUtil, notNilEmpty } from '../../../util';
import { PSMosFile } from '../../../entities';

/**
 * 文件系统服务
 *
 * @author chitanda
 * @date 2021-11-09 13:11:20
 * @export
 * @class IBizMOSService
 */
export class IBizMOSService {
  /**
   * 唯一实例
   *
   * @author chitanda
   * @date 2021-12-06 19:12:33
   * @protected
   * @static
   * @type {IBizMOSService}
   */
  protected static instance: IBizMOSService;
  /**
   * 请求文件列表
   *
   * @param {string} [path='']
   * @returns {Promise<PSMosFile[]>}
   * @memberof FileService
   */
  async fetch(mosFile: PSMosFile): Promise<PSMosFile[]> {
    const files: any[] = [];
    if (notNilEmpty(mosFile)) {
      if (mosFile.ownIndex) {
        // 对象运行时文件
        mosFile.folderflag = 0;
        mosFile.psmosfilename = '';
        mosFile.extension = FileExtensionConst.MODEL_RUNTIME;
        files.push(new PSMosFile(mosFile));
      }
      // if (mosFile.type === 'MODEL' || mosFile.type === 'LINK') {
      //   mosFile.folderflag = 0;
      //   mosFile.psmosfilename = '';
      //   mosFile.extension = FileExtensionConst.IBizModelYaml;
      //   files.push(new PSMosFile(mosFile));
      // }
    }
    const items = await this.listFiles(mosFile.path);
    files.push(...items);
    return files;
  }

  /**
   * 加载目录数据
   *
   * @author chitanda
   * @date 2021-11-30 20:11:57
   * @param {string} path
   * @return {*}  {Promise<PSMosFile[]>}
   */
  fetchDirectory(path: string): Promise<PSMosFile[]>;
  fetchDirectory(path: PSMosFile): Promise<PSMosFile[]>;
  async fetchDirectory(param: string | PSMosFile): Promise<PSMosFile[]> {
    const files: any[] = [];
    let path = '';
    // let mosFile: PSMosFile | null;
    if (typeof param === 'string') {
      path = param;
      // mosFile = await this.get(path);
    } else {
      // mosFile = param;
      path = param.path;
    }
    // if (mosFile?.ownIndex) {
    //   // 对象运行时文件模拟
    //   {
    //     const file = new PSMosFile(mosFile);
    //     // 设置为文件夹
    //     file.folderflag = 0;
    //     // 文件名置空
    //     file.psmosfilename = '';
    //     // 变更文件后缀
    //     file.extension = FileExtensionConst.MODEL_RUNTIME;
    //     files.push(file);
    //   }
    // }
    const items = await this.listFiles(path);
    files.push(...items);
    return files;
  }

  /**
   * 查找文件列表
   *
   * @author chitanda
   * @date 2021-12-06 19:12:47
   * @param {string} path
   * @return {*}  {Promise<PSMosFile[]>}
   */
  async listFiles(path: string): Promise<PSMosFile[]> {
    const files: any[] = [];
    const res = await this.request('listfiles', path);
    if (res && res.status === 200) {
      const arr = res.data;
      if (notNilEmpty(arr)) {
        for (let i = 0; i < arr.length; i++) {
          const item = arr[i];
          const file = await this.formatPSMosFile(new PSMosFile(item));
          files.push(file);
        }
      }
    }
    return files;
  }

  /**
   * 批量获取 mosFile
   *
   * @author chitanda
   * @date 2021-11-30 16:11:34
   * @param {string[]} paths
   * @return {*}  {Promise<PSMosFile[]>}
   */
  async getFiles(paths: string[]): Promise<PSMosFile[]> {
    const files: any[] = [];
    const res = await this.request('getfiles', paths);
    if (res && res.status === 200) {
      const arr = res.data;
      if (notNilEmpty(arr)) {
        for (let i = 0; i < arr.length; i++) {
          const item = arr[i];
          const file = await this.formatPSMosFile(new PSMosFile(item));
          files.push(file);
        }
      }
    }
    return files;
  }

  /**
   * 根据路径查找当前文件夹信息
   *
   * @author chitanda
   * @date 2021-11-17 20:11:46
   * @param {string} path
   * @param {boolean} [throwErr]
   * @return {*}  {(Promise<PSMosFile | null>)}
   */
  async get(path: string, throwErr?: boolean): Promise<PSMosFile | null> {
    const filePath = MosFileUtil.removePathExtension(path);
    const res = await this.request('getfile', filePath, {}, throwErr);
    if (res?.status === 200) {
      if (res.data) {
        const data = await this.formatPSMosFile(new PSMosFile(res.data));
        const pathExtension = path.substr(filePath.length, path.length);
        if (MosFileUtil.extensionReg.test(pathExtension)) {
          data.folderflag = 0;
          data.extension = pathExtension;
        }
        return data;
      }
    }
    return null;
  }

  /**
   * 根据路径查找模型包
   *
   * @author chitanda
   * @date 2021-11-12 17:11:59
   * @param {string} path
   * @return {*}  {(Promise<Record<string, any>>)}
   */
  async getModel(path: string): Promise<Record<string, any>> {
    const filePath = MosFileUtil.removePathExtension(path);
    const res = await this.request('getfilesummary', filePath);
    if (res?.status === 200) {
      return res.data;
    }
    return {};
  }

  /**
   * 创建文件
   *
   * @author chitanda
   * @date 2021-11-17 18:11:38
   * @param {string} path
   * @param {*} params
   * @return {*}
   */
  async create(path: string, params: any) {
    path = MosFileUtil.removePathExtension(path);
    const res = await this.request('createfile', path, { params });
    if (res?.status === 200) {
      return res.data;
    }
    return {};
  }

  /**
   * 删除文件
   *
   * @author chitanda
   * @date 2021-11-17 18:11:14
   * @param {string} path
   * @return {*}  {Promise<boolean>}
   */
  async delete(path: string): Promise<boolean> {
    const res = await this.request('deletefile', path);
    if (res?.status === 200) {
      return res.data === true;
    }
    return false;
  }

  /**
   * 从后台导入 yaml 模型数据
   *
   * @author chitanda
   * @date 2021-11-18 10:11:15
   * @param {string} path
   * @param {string} deName
   * @param {string} key
   * @param {string} [parentDeName]
   * @param {string} [parentKey]
   * @return {*}  {Promise<string>}
   */
  async loadYamlModel(path: string, deName: string, key: string, parentDeName?: string, parentKey?: string): Promise<string> {
    const res = await this.request('exportyamlmodel', path, { srfdename: deName, srfkey: key, srfparentdata: { srfparentdename: parentDeName, srfparentkey: parentKey } });
    if (res?.status === 200) {
      return res.data;
    }
    return '';
  }

  /**
   * 导出 yaml 模型数据到 后台
   *
   * @author chitanda
   * @date 2021-11-18 10:11:08
   * @param {string} path
   * @param {string} deName
   * @param {string} key
   * @param {string} model
   * @param {string} [parentDeName]
   * @param {string} [parentKey]
   * @return {*}  {Promise<any>}
   */
  async saveYamlModel(path: string, deName: string, key: string, model: string, parentDeName?: string, parentKey?: string): Promise<any> {
    const res = await this.request('importyamlmodel', path, {
      srfdename: deName,
      srfkey: key,
      srfmodel: model,
      srfparentdata: { srfparentdename: parentDeName, srfparentkey: parentKey },
    });
    if (res?.status === 200) {
      return res.data;
    }
    return null;
  }

  /**
   * 文件信息请求统一处理
   *
   * @author chitanda
   * @date 2021-11-17 20:11:54
   * @protected
   * @param {string} action
   * @param {(string | string[])} paths
   * @param {*} [params={}]
   * @param {boolean} [throwErr=false]
   * @return {*}  {Promise<any>}
   */
  protected async request(action: string, paths: string | string[], params: any = {}, throwErr: boolean = false): Promise<any> {
    if (ctx.completed === false) {
      await ctx.waitCompleted();
    }
    if (throwErr === true) {
      const res = await this.request2(action, paths, params);
      return res;
    } else {
      try {
        const res = await this.request2(action, paths, params);
        return res;
      } catch (err: any) {
        console.log('iBizMosService 请求异常', err);
        if (err.response && err.response.data) {
          window.showErrorMessage(err.response.data.message);
        } else {
          window.showErrorMessage(err.message);
        }
      }
    }
  }

  protected async request2(action: string, paths: string | string[], params: any = {}): Promise<any> {
    const headers: any = {
      psdevslnsys: ctx.get('psdevslnsys')!,
      'content-type': 'application/json;charset=utf-8',
    };
    const config: AxiosRequestConfig<any> = {
      headers,
    };
    console.log(`接口 ${action}, 路径：${paths}`);
    if (paths instanceof Array) {
      Object.assign(params, { srfpaths: paths });
    } else {
      Object.assign(params, { srfpath: paths });
    }
    const res = await Fetch.post(this.mergeUrl(action), params, null, config);
    console.log(`路径 ${paths} 返回值`, res?.data);
    return res;
  }

  /**
   * 修改文件信息
   *
   * @author chitanda
   * @date 2021-11-12 15:11:15
   * @protected
   * @param {PSMosFile} file
   * @return {*}  {PSMosFile}
   */
  protected async formatPSMosFile(file: PSMosFile): Promise<PSMosFile> {
    return file;
  }

  /**
   * 合并请求路径
   *
   * @author chitanda
   * @date 2021-11-09 13:11:20
   * @protected
   * @param {string} path
   * @return {*}  {string}
   */
  protected mergeUrl(path: string): string {
    return `${ctx.serviceApiAddress}/ibizmos/${path}`;
  }

  /**
   * 唯一实例
   *
   * @author chitanda
   * @date 2021-12-06 19:12:13
   * @static
   * @return {*}  {IBizMOSService}
   */
  static getInstance(): IBizMOSService {
    if (!this.instance) {
      this.instance = new IBizMOSService();
    }
    return this.instance;
  }
}
