import {
  CancellationToken,
  CodeLens,
  CodeLensProvider,
  DocumentLink,
  DocumentLinkProvider,
  Event,
  EventEmitter,
  ExtensionContext,
  languages,
  ProviderResult,
  TextDocument,
  Uri,
  workspace,
} from 'vscode';
import { CommandConst, ConfigConst, GlobalConst } from '../../../constants';
import { ctx } from '../../../context';

/**
 * iBiz Modeling 路径跳转识别
 *
 * @author chitanda
 * @date 2021-12-03 15:12:33
 * @description 目前支持识别 java、javascript、typescript、markdown 中的路径
 * @export
 * @class IBizModelingLinkCodeLensProvider
 * @implements {CodeLensProvider}
 */
export class IBizModelingLinkCodeLensProvider implements CodeLensProvider, DocumentLinkProvider {
  /**
   * 路径匹配正则
   *
   * @author chitanda
   * @date 2021-12-04 22:12:14
   * @private
   * @type {RegExp}
   */
  private regex: RegExp = /iBizModeling:\/[^\\:*<>|"?\n\r\s]+/g;
  private _onDidChangeCodeLenses: EventEmitter<void> = new EventEmitter<void>();

  onDidChangeCodeLenses: Event<void> = this._onDidChangeCodeLenses.event;

  constructor() {
    workspace.onDidChangeConfiguration(_ => {
      this._onDidChangeCodeLenses.fire();
    });
  }

  static register(_context: ExtensionContext) {
    languages.registerCodeLensProvider('*', new IBizModelingLinkCodeLensProvider());
    // languages.registerDocumentLinkProvider({ language: 'markdown' }, new IBizModelingLinkCodeLensProvider());
  }

  provideCodeLenses(document: TextDocument, _token: CancellationToken): ProviderResult<CodeLens[]> {
    if (ctx.config.get(ConfigConst.IBIZ_MODELING_LINK.ENABLE, true)) {
      const regArr = this.regExpExecArray(document);
      return regArr.map(match => this.createCodeLens(document, match));
    }
    return [];
  }

  /**
   * 创建 CodeLens
   *
   * @author chitanda
   * @date 2021-12-03 18:12:18
   * @protected
   * @param {TextDocument} document
   * @param {RegExpExecArray} matches
   * @return {*}  {(CodeLens)}
   */
  protected createCodeLens(document: TextDocument, matches: RegExpExecArray): CodeLens {
    // 获取匹配字符串所在的 行 和 列 信息
    const position = document.positionAt(matches.index);
    const range = document.getWordRangeAtPosition(position, new RegExp(this.regex));
    const codeLens = new CodeLens(range!);
    const path = matches[0].replace(GlobalConst.MODELING_PATH_PROTOCOL, '');
    codeLens.command = {
      title: '打开模型链接',
      tooltip: '打开 iBizModeling 链接',
      command: CommandConst.MOS_FS.OPEN_FILE,
      arguments: [path],
    };
    return codeLens;
  }

  provideDocumentLinks(document: TextDocument, _token: CancellationToken): ProviderResult<DocumentLink[]> {
    if (ctx.config.get(ConfigConst.IBIZ_MODELING_LINK.ENABLE, true)) {
      const regArr = this.regExpExecArray(document);
      return regArr.map(match => this.createDocumentLink(document, match));
    }
    return [];
  }

  /**
   * 创建路径文本链接
   *
   * @author chitanda
   * @date 2021-12-04 22:12:53
   * @protected
   * @param {TextDocument} document
   * @param {RegExpExecArray} matches
   * @return {*}  {DocumentLink}
   */
  protected createDocumentLink(document: TextDocument, matches: RegExpExecArray): DocumentLink {
    // 获取匹配字符串所在的 行 和 列 信息
    const position = document.positionAt(matches.index);
    const range = document.getWordRangeAtPosition(position, new RegExp(this.regex));
    const path = matches[0].replace(GlobalConst.MODELING_PATH_PROTOCOL, GlobalConst.MOS_FS_PROTOCOL);
    const link = new DocumentLink(range!, Uri.parse(path));
    return link;
  }

  /**
   * 获取匹配的正则数据
   *
   * @author chitanda
   * @date 2021-12-04 22:12:53
   * @protected
   * @param {TextDocument} document
   * @return {*}  {RegExpExecArray[]}
   */
  protected regExpExecArray(document: TextDocument): RegExpExecArray[] {
    const reg = new RegExp(this.regex);
    const text = document.getText();
    const matches: RegExpExecArray[] = [];
    let match: RegExpExecArray | null;
    while ((match = reg.exec(text)) !== null) {
      matches.push(match);
    }
    return matches;
  }
}
