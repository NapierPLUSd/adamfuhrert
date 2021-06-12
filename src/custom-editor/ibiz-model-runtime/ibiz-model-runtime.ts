import { Disposable, ExtensionContext } from 'vscode';
import { ctx } from '../../context';
import { CustomEditorBase } from '../custom-editor-base/custom-editor-base';

/**
 * 索引模型编辑器
 *
 * @author chitanda
 * @date 2021-11-19 16:11:34
 * @export
 * @class IBizModelRuntimeEditorProvider
 * @extends {CustomEditorBase}
 */
export class IBizModelRuntimeEditorProvider extends CustomEditorBase {
  protected static readonly viewType = 'iBizCustomEditor.iBizModelRuntime';

  public static register(context: ExtensionContext): Disposable {
    return super.register(context, IBizModelRuntimeEditorProvider);
  }

  protected getHtmlForWebview(): string {
    const address = ctx.toolAddress;
    const resetCssUri = this.getResourcesUri('css/custom-editor-reset.css');
    const cssUri = this.getResourcesUri('css/custom-iframe-editor.css');
    const jsUri = this.getResourcesUri('js/custom-iframe-editor.js');
    const iframe = this.getIframeElement(`${address}/model-runtime/`);
    return `<!DOCTYPE html>
			<html lang='en'>
			  <head>
          <meta charset='UTF-8'>
          <meta name='viewport' content='width=device-width, initial-scale=1.0'>
          <title>模型运行时</title>
          <link rel='stylesheet' href='${resetCssUri}'>
          <link rel='stylesheet' href='${cssUri}'>
        </head>
        <body>
          ${iframe}
          <script src='${jsUri}'></script>
        </body>
			</html>`;
  }
}
