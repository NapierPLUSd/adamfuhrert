import { ResourcesFileUtil } from './resources-file-util/resources-file-util';

/**
 * 文件操作辅助工具类
 *
 * @author chitanda
 * @date 2021-11-14 14:11:59
 * @export
 * @class FileUtil
 */
export class FileUtil {
  /**
   * 资源文件
   *
   * @author chitanda
   * @date 2021-11-14 14:11:19
   * @static
   * @type {ResourcesFileUtil}
   */
  static readonly resources: ResourcesFileUtil = new ResourcesFileUtil();
}
