import { ExtensionContext } from 'vscode';
import { installCodeLensProvider } from './code-lens';

/**
 * 安装语言相关适配器
 *
 * @author chitanda
 * @date 2021-12-03 15:12:47
 * @export
 * @param {ExtensionContext} context
 */
export function installLanguages(context: ExtensionContext) {
  installCodeLensProvider(context);
}
