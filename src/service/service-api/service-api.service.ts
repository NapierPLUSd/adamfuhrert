import { ctx } from '../../context';
import { Fetch, showErrInfo } from '../../util';

/**
 *
 *
 * @author chitanda
 * @date 2021-11-27 02:11:31
 * @export
 * @class ServiceApiService
 */
export class ServiceApiService {
  async getAppData(): Promise<unknown> {
    try {
      const res = await Fetch.get(`${ctx.studioAddress}/MosDynamic/appdata`, { psdevslnsys: ctx.get('psdevslnsys') }, { headers: { 'Content-Type': 'application/json' } });
      if (res?.data) {
        return res.data;
      }
    } catch (err) {
      showErrInfo(err);
    }
    return {};
  }
}

export const serviceApi = new ServiceApiService();
