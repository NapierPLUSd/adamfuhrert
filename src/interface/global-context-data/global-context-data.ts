/**
 * 全局上下文参数声明
 *
 * @author chitanda
 * @date 2021-11-12 09:11:11
 * @export
 * @interface GlobalContextData
 */
export interface GlobalContextData {
  /**
   * 当前系统类型
   *
   * @author chitanda
   * @date 2021-11-12 15:11:16
   * @type {('PSSYSTEM' | 'PSSYSAPP')}
   */
  type?: 'PSSYSTEM' | 'PSSYSAPP';
  /**
   * 开发方案标识
   *
   * @author chitanda
   * @date 2021-11-25 20:11:23
   * @type {string}
   */
  psdevsln?: string;
  /**
   * 开发系统标识
   *
   * @author chitanda
   * @date 2021-11-10 12:11:22
   * @type {string}
   */
  psdevslnsys?: string;
  /**
   * 开发系统名称
   *
   * @author chitanda
   * @date 2021-11-12 09:11:50
   * @type {string}
   */
  psdevslnsysname?: string;
}
