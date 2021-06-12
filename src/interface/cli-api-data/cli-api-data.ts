/**
 * cli api 参数
 *
 * @author chitanda
 * @date 2021-11-02 11:11:08
 * @export
 * @interface CliAPIData
 */
export interface CliAPIData {
  /**
   * 携带数据
   *
   * @author chitanda
   * @date 2021-11-25 17:11:43
   * @type {*}
   */
  data?: any;
  /**
   * 需要 api 执行的命令
   *
   * @author chitanda
   * @date 2021-11-02 16:11:15
   * @type {string}
   */
  pstscmdname?: string;
  /**
   * 开发方案
   *
   * @author chitanda
   * @date 2021-11-02 11:11:39
   * @type {string}
   */
  psdevslnid?: string;
  /**
   * 开发系统
   *
   * @author chitanda
   * @date 2021-11-02 11:11:25
   * @type {string}
   */
  psdevslnsysid?: string;
  /**
   * 开发模板
   *
   * @author chitanda
   * @date 2021-11-02 11:11:25
   * @type {string}
   */
  psdevslntemplid?: string;
}
