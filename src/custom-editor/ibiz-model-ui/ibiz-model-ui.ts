import { Disposable, ExtensionContext, TextDocument, Webview } from 'vscode';
import { DesignToolUrl } from '../../config';
import { ctx } from '../../context';
import { isNilOrEmpty, notNilEmpty } from '../../util';
import { CustomEditorBase } from '../custom-editor-base/custom-editor-base';

/**
 * 模型编辑器
 *
 * @author chitanda
 * @date 2021-11-10 15:11:47
 * @export
 * @class IBizModelUIEditorProvider
 * @implements {CustomTextEditorProvider}
 */
export class IBizModelUIEditorProvider extends CustomEditorBase {
  protected static readonly viewType = 'iBizCustomEditor.iBizModelUI';

  public static register(context: ExtensionContext): Disposable {
    return super.register(context, IBizModelUIEditorProvider);
  }

  protected getHtmlForWebview(document: TextDocument, webview: Webview): string {
    const data = document.getText();
    let json = {};
    if (notNilEmpty(data)) {
      try {
        json = JSON.parse(data);
      } catch (err) {
        console.log(err);
      }
    }
    const content = this.getModelContent(json);
    return this.getWebContainer(webview, content);
  }

  protected getWebContainer(_webview: Webview, content: string): string {
    const resetCssUri = this.getResourcesUri('css/custom-editor-reset.css');
    const cssUri = this.getResourcesUri('css/custom-iframe-editor.css');
    const jsUri = this.getResourcesUri('js/custom-iframe-editor.js');
    return `<!DOCTYPE html>
    <html lang='en'>
      <head>
        <meta charset='UTF-8'>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>设计工具</title>
        <link rel='stylesheet' href='${resetCssUri}'>
        <link rel='stylesheet' href='${cssUri}'>
      </head>
      <body>
        ${content}
        <script src='${jsUri}'></script>
      </body>
    </html>`;
  }

  protected getModelContent(data: Record<string, null>): string {
    const address = ctx.toolAddress;
    const type = data.psmodeltype!;
    const subType = data.psmodelsubtype!;
    let url: string | null = DesignToolUrl.getUrl(subType);
    if (isNilOrEmpty(url)) {
      url = DesignToolUrl.getUrl(type);
    }
    if (notNilEmpty(url)) {
      let iframeUrl = `${address}${url?.replace('___instance___', ctx.get('psdevslnsys')!).replace('___srfkey___', data.psmodelid!)}`;
      // 临时处理补充 query 参数
      {
        const urls = iframeUrl.split('#');
        let url = urls[0];
        if (url.indexOf('?') === -1) {
          url += '?';
        } else if (!url.endsWith('&')) {
          url += '&';
        }
        url += `platform=vscode`;
        urls[0] = url;
        iframeUrl = urls.join('#');
      }
      return this.getIframeElement(iframeUrl);
    }
    return `暂未支持的类型 ${type}` + (subType ? ` or 子类型 ${subType}` : '');
  }
}
