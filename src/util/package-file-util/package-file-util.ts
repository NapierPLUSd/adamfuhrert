import { debug } from 'debug';
import { readFileSync } from 'fs-extra';
import { join } from 'path';
import { ctx } from '../../context';

/**
 * 获取 package.json 文件内容
 *
 * @author chitanda
 * @date 2021-12-08 20:12:51
 * @export
 * @return {*}  {Record<string, unknown>}
 */
export function getPackageJson(): Record<string, unknown> {
  const uri = ctx.extensionContext.extensionUri;
  const path = join(uri.fsPath, 'package.json');
  const str = readFileSync(path, 'utf-8');
  try {
    return JSON.parse(str);
  } catch (err) {
    debug.log(err);
  }
  return {};
}
