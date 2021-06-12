import { ctx } from '../../../context';
import { readFileSync } from 'fs-extra';
import { join } from 'path';

/**
 * 资源目录文件帮助类
 *
 * @author chitanda
 * @date 2021-11-14 14:11:22
 * @export
 * @class ResourcesFileUtil
 */
export class ResourcesFileUtil {
  /**
   * 读取放在 resources/config 目录下的 json 配置文件
   *
   * @author chitanda
   * @date 2021-11-14 15:11:16
   * @param {string} fileName 配置文件名称
   * @return {*}  {Record<string, unknown>}
   */
  readJsonConfig(fileName: string): Record<string, unknown> {
    const str = join('config', fileName + '.json');
    return this.readJson(str);
  }

  /**
   * 读取 JSON 文件
   *
   * @author chitanda
   * @date 2021-11-14 15:11:07
   * @param {string} path
   * @return {*}  {Record<string, unknown>}
   */
  readJson(path: string): Record<string, unknown> {
    const data = this.read(path);
    return JSON.parse(data);
  }

  /**
   * 读取资源目录文件
   *
   * @author chitanda
   * @date 2021-11-14 14:11:04
   * @param {string} path 基于项目的 resources 后的目录，例如要读取 resources/config/dr.json 则填写 config/dr.json
   * @return {*}  {string}
   */
  read(path: string): string {
    const uri = ctx.extensionContext.extensionUri;
    path = join(uri.fsPath, 'resources', path);
    return readFileSync(path, 'utf-8');
  }
}
