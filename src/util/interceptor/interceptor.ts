import axios from 'axios';
import { window } from 'vscode';
import { login } from '../../service';

/**
 * 网络拦截器
 *
 * @author chitanda
 * @date 2021-11-21 21:11:04
 * @export
 * @class Interceptor
 */
export class Interceptor {
  constructor() {
    this.init();
  }

  protected init(): void {
    axios.interceptors.response.use(
      response => response,
      error => {
        const { response } = error;
        if (response) {
          if (response.status === 401) {
            login.notLogged(401);
            return Promise.resolve();
          } else if (response.status === 403) {
            window.showWarningMessage('您暂时无权限查看此数据!');
          }
        }
        return Promise.reject(error);
      },
    );
  }
}
