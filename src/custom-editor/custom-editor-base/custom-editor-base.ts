import { APIMessageItem } from '@ibiz/vscode-editor-api';
import { CancellationToken, CustomTextEditorProvider, Disposable, ExtensionContext, TextDocument, Uri, ViewColumn, Webview, WebviewPanel, window } from 'vscode';
import { ctx } from '../../context';
import { PSMosFile } from '../../entities';
import { notNilEmpty } from '../../util';

/**
 * 自定义文本编辑器基类
 *
 * @author chitanda
 * @date 2021-11-19 16:11:18
 * @export
 * @abstract
 * @class CustomEditorBase
 * @implements {CustomTextEditorProvider}
 */
export abstract class CustomEditorBase implements CustomTextEditorProvider {
  protected static readonly viewType: string = '';

  constructor(protected readonly context: ExtensionContext) {}

  public static register(context: ExtensionContext, customEditorClass: any): Disposable {
    const provider = new customEditorClass(context);
    const providerRegistration = window.registerCustomEditorProvider(customEditorClass.viewType, provider, { webviewOptions: { retainContextWhenHidden: true } });
    return providerRegistration;
  }

  async resolveCustomTextEditor(document: TextDocument, webviewPanel: WebviewPanel, token: CancellationToken): Promise<void> {
    const webview = webviewPanel.webview;
    webview.options = {
      enableScripts: true,
    };
    webview.html = this.getHtmlForWebview(document, webview);
    webview.onDidReceiveMessage((message: APIMessageItem) => {
      switch (message.type) {
        case 'init':
          // 发送上下文数据
          const context = {
            token: ctx.token,
            psdevslnsys: ctx.get('psdevslnsys'),
          };
          this.sendContext(webview, context);
          // 发送当前文件数据
          const data = document.getText();
          if (notNilEmpty(data)) {
            try {
              const json = JSON.parse(data);
              this.sendData(webview, json);
            } catch (err) {
              console.error('json格式转换错误，数据', data);
            }
          }
          break;
        case 'command':
          this.commandMessage(webview, message);
          break;
        case 'data': // 接收编辑器的数据变更
          break;
      }
    });
  }

  protected abstract getHtmlForWebview(_document: TextDocument, _webview: Webview): string;

  protected getIframeElement(href: string): string {
    return `<iframe id='iframe' src='${href}' frameborder='0' style='width:100%;height:100%;'></iframe>`;
  }

  /**
   * 向编辑器发送数据
   *
   * @author chitanda
   * @date 2021-11-16 17:11:45
   * @protected
   * @param {Webview} webview
   * @param {*} context
   */
  protected sendContext(webview: Webview, context: any) {
    const msg: APIMessageItem = {
      target: 'vscode',
      type: 'context',
      context,
    };
    webview.postMessage(msg);
  }

  /**
   * 向编辑器发送数据
   *
   * @author chitanda
   * @date 2021-11-16 17:11:45
   * @protected
   * @param {Webview} webview
   * @param {*} data
   */
  protected sendData(webview: Webview, data: any) {
    const msg: APIMessageItem = {
      target: 'vscode',
      type: 'data',
      data,
    };
    webview.postMessage(msg);
  }

  /**
   * 执行指令消息
   *
   * @author chitanda
   * @date 2021-11-16 17:11:51
   * @protected
   * @param {Webview} webview
   * @param {APIMessageItem} msg
   */
  protected commandMessage(webview: Webview, msg: APIMessageItem) {
    switch (msg.command) {
      case 'showTextDocument':
        const mosFile = new PSMosFile(msg.data);
        const uri = ctx.mosFS.getUri(mosFile.fullPath);
        window.showTextDocument(uri, { viewColumn: ViewColumn.Two });
        break;
    }
  }

  /**
   * 获取资源路径
   *
   * @author chitanda
   * @date 2021-11-19 16:11:47
   * @protected
   * @param {string} customEditorPath
   * @return {*}  {Uri}
   */
  protected getCustomEditorSourceUri(customEditorPath: string): Uri {
    const uri = Uri.joinPath(this.context.extensionUri, 'packages/custom-editor', customEditorPath);
    return uri.with({ scheme: 'vscode-resource' });
  }

  /**
   * 获取 resources 目录下资源文件
   *
   * @author chitanda
   * @date 2021-11-21 14:11:49
   * @protected
   * @param {string} resourcesPath
   * @return {*}  {Uri}
   */
  protected getResourcesUri(resourcesPath: string): Uri {
    const uri = Uri.joinPath(this.context.extensionUri, 'resources', resourcesPath);
    return uri.with({ scheme: 'vscode-resource' });
  }
}
