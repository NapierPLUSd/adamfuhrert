import { isNil, isEmpty } from 'ramda';
import { window } from 'vscode';

/**
 * 存在并且不等于空，支持所有数据类型。例：[]、{}都算为空值。
 *
 * @export
 * @param {*} data
 * @return {*}  {boolean}
 */
export function notNilEmpty(data: any): boolean {
  if (!isNil(data) && !isEmpty(data)) {
    return true;
  }
  return false;
}

/**
 * 在当前类型中，不存在或者为空值。例：[]、{}都算为空值。
 *
 * @export
 * @param {*} data
 * @return {*}  {boolean}
 */
export function isNilOrEmpty(data: any): boolean {
  if (isNil(data) || isEmpty(data)) {
    return true;
  }
  return false;
}

/**
 * 获取随机字符串
 *
 * @author chitanda
 * @date 2021-11-15 18:11:11
 * @export
 * @return {*}  {string}
 */
export function getNonce(): string {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

/**
 * 显示错误信息
 *
 * @author chitanda
 * @date 2021-11-24 20:11:03
 * @export
 * @param {*} err
 */
export function showErrInfo(err: any) {
  if (err.response) {
    const data = err.response.data;
    const parameters = data.parameters;
    if (parameters && parameters.exmessage) {
      window.showErrorMessage(parameters.exmessage);
    } else {
      window.showErrorMessage(data.message);
    }
  } else {
    window.showErrorMessage(err.message);
  }
}

/**
 * 创建 uuid
 *
 * @author chitanda
 * @date 2021-11-24 20:11:18
 * @export
 * @return {*}  {string}
 */
export function createUUID(): string {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

/**
 * 获取 query 格式的参数值
 *
 * @author chitanda
 * @date 2021-11-26 20:11:51
 * @export
 * @param {string} query
 * @param {string} variable
 * @return {*}  {(string | null)}
 */
export function getQueryVariable(query: string, variable: string): string | null {
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return null;
}
