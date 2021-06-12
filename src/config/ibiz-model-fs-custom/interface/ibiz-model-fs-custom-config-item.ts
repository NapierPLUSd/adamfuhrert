/**
 * 配置子项
 *
 * @author chitanda
 * @date 2021-12-01 09:12:08
 * @export
 * @interface IBizModelFSCustomChildConfigItem
 */
export interface IBizModelFSCustomChildConfigItem {
  /**
   * 逻辑名称
   *
   * @author chitanda
   * @date 2021-11-30 18:11:57
   * @type {string}
   */
  logicName: string;
  /**
   * 路径
   *
   * @author chitanda
   * @date 2021-11-30 18:11:02
   * @type {string}
   */
  path: string;
  /**
   * 标识名称
   *
   * @author chitanda
   * @date 2021-11-30 18:11:06
   * @type {string}
   */
  name: string;
}

/**
 * 配置项
 *
 * @author chitanda
 * @date 2021-11-30 17:11:32
 * @export
 * @interface IBizModelFSCustomConfigItem
 */
export interface IBizModelFSCustomConfigItem {
  /**
   * 路径
   *
   * @author chitanda
   * @date 2021-11-30 16:11:38
   * @type {string}
   */
  path: string;
  /**
   * 路径匹配正则
   *
   * @author chitanda
   * @date 2021-11-30 18:11:03
   * @type {RegExp}
   */
  reg?: RegExp;
  /**
   * 子项
   *
   * @author chitanda
   * @date 2021-11-30 17:11:01
   * @type {IBizModelFSCustomChildConfigItem[]}
   */
  children: IBizModelFSCustomChildConfigItem[];
}
