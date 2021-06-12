// import { AxiosResponse } from 'axios';
// import { isNilOrEmpty, notNilEmpty } from '../utils/utils';

// /**
//  * 请求返回结果
//  *
//  * @author chitanda
//  * @date 2021-11-09 11:11:22
//  * @export
//  * @class FetchResponse
//  */
// export class FetchResponse {
//   readonly data: any;
//   readonly ok!: boolean;
//   readonly status!: number;
//   readonly statusText?: string;
//   readonly headers: Record<string, string> = {};
//   readonly url?: string;

//   /**
//    * Creates an instance of HttpResponse.
//    *
//    * @param {*} [data] 数据
//    * @param {AxiosResponse} [res] 结果
//    * @param {number} [errorCode] 错误码
//    * @memberof HttpResponse
//    */
//   constructor(data?: any, res?: AxiosResponse, errorCode?: number) {
//     if (res) {
//       const { ok, status, url, headers } = res;
//       this.ok = ok;
//       this.status = status;
//       if (headers) {
//         headers.forEach((val, key) => {
//           this.headers[key] = val;
//         });
//       }
//       this.url = url;
//       this.statusText = res.statusText;
//       if (data && notNilEmpty(data.message)) {
//         this.statusText = data.message;
//       }
//     }
//     if (isNilOrEmpty(this.ok)) {
//       this.ok = true;
//     }
//     if (isNilOrEmpty(this.status)) {
//       this.status = errorCode || 200;
//     }
//     this.data = data;
//   }
// }
