/* eslint-disable @typescript-eslint/naming-convention */

import { ctx } from '../../context';
import { IPSData } from '../../interface';
import { Fetch, showErrInfo } from '../../util';

/**
 * MosDynamic 服务
 *
 * @author chitanda
 * @date 2021-11-27 02:11:31
 * @export
 * @class ServiceApiService
 */
export class ServiceApiService {
  /**
   * 获取系统基本信息
   *
   * @author chitanda
   * @date 2021-12-14 11:12:34
   * @return {*}  {Promise<IPSData>}
   */
  async getAppData(): Promise<IPSData> {
    try {
      const res = await Fetch.get(`${ctx.studioAddress}/MosDynamic/appdata`, { psdevslnsys: ctx.get('psdevslnsys') }, { headers: { 'content-type': 'application/json' } });
      if (res?.data) {
        return res.data;
      }
    } catch (err) {
      showErrInfo(err);
    }
    return {};
  }

  /**
   * 获取系统运行任务信息
   *
   * @author chitanda
   * @date 2021-12-14 11:12:42
   * @return {*}  {Promise<IPSData[]>}
   */
  async getSystemRun(): Promise<IPSData[]> {
    try {
      const psDevSlnSys: string = ctx.get('psdevslnsys')!;
      const res = await Fetch.get(
        `${ctx.studioAddress}/MosDynamic/pssysdevbktasks/fetchdefault`,
        { psdevslnsysid: psDevSlnSys, n_taskstate_in: '10,20', size: 100, page: 0 },
        { headers: { 'content-type': 'application/json', psdevslnsys: psDevSlnSys } },
      );
      if (res?.status === 200) {
        return res.data;
      }
    } catch (err) {
      showErrInfo(err);
    }
    return [];
  }

  /**
   * 取消系统运行任务
   *
   * @author chitanda
   * @date 2021-12-14 11:12:46
   * @param {string[]} keys 需要取消的任务组
   * @return {*}  {Promise<boolean>}
   */
  async cancelSystemRun(keys: string[]): Promise<boolean> {
    try {
      const psDevSlnSys: string = ctx.get('psdevslnsys')!;
      const res = await Fetch.post(
        `${ctx.studioAddress}/MosDynamic/pssysdevbktasks/cancel`,
        { psdevslnsysid: psDevSlnSys, keys: keys.join(';') },
        { headers: { 'content-type': 'application/json', psdevslnsys: psDevSlnSys } },
      );
      if (res?.status === 200) {
        return res.data;
      }
    } catch (err) {
      showErrInfo(err);
    }
    return false;
  }
}

export const serviceApi = new ServiceApiService();
