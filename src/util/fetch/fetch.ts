import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { notNilEmpty } from '../utils/utils';
import { URLSearchParams } from 'url';
import { ctx } from '../../context';

/**
 * Http 请求
 *
 * @author chitanda
 * @date 2021-11-09 10:11:37
 * @export
 * @class Fetch
 */
export class Fetch {
  static post(url: string, data: any = {}, urlParams: any = {}, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    url = this.urlParamsParse(url, urlParams);
    config = this.configParse(url, config);
    return axios.post(url, data, config);
  }

  static get(url: string, urlParams: any = {}, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    url = this.urlParamsParse(url, urlParams);
    config = this.configParse(url, config);
    return axios.get(url, config);
  }

  static put(url: string, data: any = {}, urlParams: any = {}, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    url = this.urlParamsParse(url, urlParams);
    config = this.configParse(url, config);
    return axios.put(url, data, config);
  }

  /**
   * 编辑请求参数
   *
   * @author chitanda
   * @date 2021-11-25 19:11:43
   * @protected
   * @static
   * @param {string} url
   * @param {AxiosRequestConfig} [config]
   * @return {*}  {AxiosRequestConfig}
   */
  protected static configParse(_url: string, config?: AxiosRequestConfig): AxiosRequestConfig {
    if (!config) {
      config = {};
    }
    if (!config.data) {
      config.data = {};
    }
    const headers = config.headers || {};
    const token = ctx.token;
    if (notNilEmpty(token)) {
      headers.authorization = 'Bearer ' + token;
    }
    config.headers = headers;
    return config;
  }

  /**
   * url 参数编译
   *
   * @author chitanda
   * @date 2021-11-09 11:11:00
   * @protected
   * @param {string} url
   * @param {Record<string, any>} urlParams
   * @return {*}  {string}
   */
  protected static urlParamsParse(url: string, urlParams: Record<string, any>): string {
    if (notNilEmpty(urlParams)) {
      const params = new URLSearchParams();
      for (const key in urlParams) {
        if (Object.prototype.hasOwnProperty.call(urlParams, key)) {
          const val = urlParams[key];
          params.append(key, val);
        }
      }
      if (url.lastIndexOf('?') === -1) {
        return `${url}?${params.toString()}`;
      } else {
        return url + params.toString();
      }
    }
    return url;
  }
}
