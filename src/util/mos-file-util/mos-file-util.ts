import { FileExtensionConst } from '../../constants';

/**
 * mos 文件辅助操作
 *
 * @author chitanda
 * @date 2021-11-15 15:11:49
 * @export
 * @class MosFileUtil
 */
export class MosFileUtil {
  /**
   * 是否为支持的扩展
   *
   * @author chitanda
   * @date 2021-11-15 15:11:09
   * @static
   * @type {RegExp}
   */
  static extensionReg: RegExp = new RegExp(`(${FileExtensionConst.MODEL}|${FileExtensionConst.MODEL_RUNTIME}|${FileExtensionConst.MODEL_UI})$`);

  /**
   * 删除文件后缀
   *
   * @author chitanda
   * @date 2021-11-15 15:11:24
   * @static
   * @param {string} path
   * @return {*}  {string}
   */
  static removePathExtension(path: string): string {
    return path.replace(this.extensionReg, '');
  }
}
