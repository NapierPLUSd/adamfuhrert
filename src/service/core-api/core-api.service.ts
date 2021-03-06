/* eslint-disable @typescript-eslint/naming-convention */
import { AxiosRequestConfig } from 'axios';
import { ctx } from '../../context';
import { CliAPIData } from '../../interface';
import { Fetch, showErrInfo } from '../../util';

/**
 * 核心 api 服务
 *
 * @author chitanda
 * @date 2021-11-26 09:11:19
 * @export
 * @class CoreAPI
 */
export class CoreAPI {
  /**
   * 执行 API
   *
   * @author chitanda
   * @date 2021-11-05 16:11:46
   * @static
   * @param {string} api
   * @param {CliAPIData} [data={}]
   * @param {AxiosRequestConfig<unknown>} [config={}]
   * @return {*}  {Promise<any>}
   */
  static async cli(api: string, data: CliAPIData = {}, config: AxiosRequestConfig<unknown> = {}): Promise<any> {
    if (ctx.completed === false) {
      await ctx.waitCompleted();
    }
    config.headers = {
      'content-type': 'application/json;charset=UTF-8',
    };
    try {
      const res = await Fetch.post(this.getAddress() + '/pstscmds/null/' + (api ? api.toLocaleLowerCase() : ''), data, null, config);
      return res;
    } catch (err: any) {
      showErrInfo(err);
      return err;
    }
  }

  /**
   * 获取当前方案下，用户所有模板
   *
   * @author chitanda
   * @date 2021-11-26 09:11:50
   * @static
   * @return {*}  {Promise<any[]>}
   */
  static async curUserTemplates(): Promise<any[]> {
    if (ctx.completed === false) {
      await ctx.waitCompleted();
    }
    try {
      const config: AxiosRequestConfig<unknown> = {
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      };
      const path = `${this.getAddress()}/psdevslntempls/fetchcuruserall?size=1000&page=0`;
      const res = await Fetch.post(path, { n_psdevslnid_eq: ctx.get('psdevsln'), size: 1000, page: 0 }, null, config);
      if (res) {
        return res.data;
      }
    } catch (err) {
      showErrInfo(err);
    }
    return [];
  }

  /**
   * 获取模板地址
   *
   * @author chitanda
   * @date 2022-01-21 13:01:43
   * @static
   * @param {string} templateId
   * @return {*}  {Promise<string>}
   */
  static async getTemplateRepoUrl(templateId: string): Promise<string> {
    if (ctx.completed === false) {
      await ctx.waitCompleted();
    }
    try {
      const config: AxiosRequestConfig<unknown> = {
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      };
      const path = `${this.getAddress()}/psdevslntempls/${templateId}/getrepourl`;
      const res = await Fetch.post(path, { psdevslnid: ctx.get('psdevsln') }, null, config);
      if (res) {
        return res.data.coderepourl;
      }
    } catch (err) {
      showErrInfo(err);
    }
    return '';
  }

  /**
   * 查询当前系统运行
   *
   * @author chitanda
   * @date 2021-12-13 10:12:40
   * @static
   * @return {*}  {Promise<any[]>}
   */
  static async curSystemRuns(): Promise<any[]> {
    if (ctx.completed === false) {
      await ctx.waitCompleted();
    }
    try {
      const config: AxiosRequestConfig<unknown> = {
        headers: {
          psdevslnsys: ctx.get('psdevslnsys') as string,
          'content-type': 'application/json;charset=UTF-8',
        },
      };
      const path = `${this.getAddress()}/pssystemruns/fetchcursys`;
      const res = await Fetch.get(path, { n_psdevslnid_eq: ctx.get('psdevsln'), size: 1000, page: 0 }, config);
      if (res) {
        return res.data;
      }
    } catch (err) {
      showErrInfo(err);
    }
    return [];
  }

  /**
   * 获取 core api 服务域
   *
   * @author chitanda
   * @date 2021-11-26 09:11:45
   * @protected
   * @static
   * @return {*}  {string}
   */
  protected static getAddress(): string {
    return ctx.coreApiAddress || '';
  }
}
