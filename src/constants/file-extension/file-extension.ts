/* eslint-disable @typescript-eslint/naming-convention */
/**
 * 文件后缀
 *
 * @author chitanda
 * @date 2021-11-11 10:11:19
 * @export
 * @class FileExtensionConst
 */
export class FileExtensionConst {
  /**
   * 模型编辑文件
   *
   * @author chitanda
   * @date 2021-11-11 10:11:10
   * @static
   */
  static readonly MODEL = '.ibizmodel';
  /**
   * 模型编辑文件
   *
   * @author chitanda
   * @date 2021-11-11 10:11:10
   * @static
   */
  // static readonly MODEL_YAML = FileExtensionConst.MODEL + '.yaml';
  /**
   * 模型图形编辑文件
   *
   * @author chitanda
   * @date 2021-11-15 15:11:58
   * @static
   */
  static readonly MODEL_UI = FileExtensionConst.MODEL + '.ui';
  /**
   * 对象运行时
   *
   * @author chitanda
   * @date 2021-11-19 14:11:21
   * @static
   */
  static readonly MODEL_RUNTIME = FileExtensionConst.MODEL + '.runtime';
}
