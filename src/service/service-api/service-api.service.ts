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

  async getSystemRun(): Promise<IPSData[]> {
    try {
      const psDevSlnSys: string = ctx.get('psdevslnsys')!;
      const res = await Fetch.get(
        `${ctx.studioAddress}/MosDynamic/pssysdevbktasks/fetchdefault`,
        { psdevslnsysid: psDevSlnSys, n_taskstate_in: '10,20', size: 100, page: 0 },
        { headers: { 'content-type': 'application/json', psdevslnsys: psDevSlnSys } },
      );
      if (res?.data) {
        return res.data;
      }
    } catch (err) {
      showErrInfo(err);
    }
    return [];
  }
}

export const serviceApi = new ServiceApiService();
