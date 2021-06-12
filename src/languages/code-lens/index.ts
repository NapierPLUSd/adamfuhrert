import { ExtensionContext } from 'vscode';
import { IBizModelingLinkCodeLensProvider } from './ibiz-modeling-link/ibiz-modeling-link';

/**
 * 安装 codelens 适配器
 *
 * @author chitanda
 * @date 2021-12-03 15:12:34
 * @export
 * @param {ExtensionContext} context
 */
export function installCodeLensProvider(context: ExtensionContext) {
  IBizModelingLinkCodeLensProvider.register(context);
}
