/**
 * 是否为方法
 *
 * @export
 * @param {*} fn 需要判断的方法
 * @return {*}  {boolean}
 */
export function isFunc(fn: any): boolean {
  return Object.prototype.toString.call(fn) === '[object Function]';
}

/**
 * 是否为异步方法
 *
 * @export
 * @param {*} fn 需要判断的方法
 * @return {*}  {boolean}
 */
export function isAsync(fn: any): boolean {
  return Object.prototype.toString.call(fn) === '[object AsyncFunction]';
}

/**
 * 是否为Promise对象
 *
 * @export
 * @param {*} obj
 * @return {*}  {boolean}
 */
export function isPromise(obj: any): boolean {
  return Object.prototype.toString.call(obj) === '[object Promise]';
}

/**
 * 是否为对象类型
 *
 * @export
 * @param {*} obj
 * @return {*}  {boolean}
 */
export function isObject(obj: any): boolean {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 * 是否为数组类型
 *
 * @export
 * @param {*} obj
 * @return {*}  {boolean}
 */
export function isArray(obj: any): boolean {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

/**
 * 是否为字符串类型
 *
 * @export
 * @param {*} obj
 * @return {*}  {boolean}
 */
export function isString(obj: any): boolean {
  return Object.prototype.toString.call(obj) === '[object String]';
}

/**
 * 是否为数值类型
 *
 * @export
 * @param {*} obj
 * @return {*}  {boolean}
 */
export function isNumber(obj: any): boolean {
  return Object.prototype.toString.call(obj) === '[object Number]';
}

/**
 * 是否为布尔类型
 *
 * @export
 * @param {*} obj
 * @return {*}  {boolean}
 */
export function isBoolean(obj: any): boolean {
  return Object.prototype.toString.call(obj) === '[object Boolean]';
}

/**
 * 判断数据类型
 *
 * @author chitanda
 * @date 2021-05-18 11:05:23
 * @export
 * @param {*} obj 需要判断的数据
 * @return {*}  {('boolean' | 'number' | 'string' | 'function' | 'array' | 'date' | 'regExp' | 'undefined' | 'null' | 'object')}
 */
export function typeOf(obj: any): 'boolean' | 'number' | 'string' | 'function' | 'array' | 'date' | 'regExp' | 'undefined' | 'null' | 'object' {
  const toString = Object.prototype.toString;
  const map: any = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  };
  return map[toString.call(obj)];
}
