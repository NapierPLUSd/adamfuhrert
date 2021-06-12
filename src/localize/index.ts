import { existsSync, readFileSync } from 'fs-extra';
import { resolve } from 'path';
import { extensions } from 'vscode';
import { GlobalConst } from '../constants';

/**
 * 多语言
 *
 * @author chitanda
 * @date 2021-11-28 02:11:46
 * @export
 * @class Localize
 */
export class Localize {
  private bundle = this.resolveLanguagePack();
  private options!: { locale: string };

  public localize(key: string, ...args: string[]): string {
    const message = this.bundle[key] || key;
    return this.format(message, args);
  }

  private init() {
    try {
      this.options = {
        ...this.options,
        ...JSON.parse(process.env.VSCODE_NLS_CONFIG || '{}'),
      };
    } catch (err) {
      throw err;
    }
  }

  private format(message: string, args: string[] = []): string {
    return args.length ? message.replace(/\{(\d+)\}/g, (match, rest: any[]) => args[rest[0]] || match) : message;
  }

  private resolveLanguagePack(): Record<string, string> {
    this.init();

    const languageFormat = 'package.nls{0}.json';
    const defaultLanguage = languageFormat.replace('{0}', '');

    const rootPath = extensions.getExtension(GlobalConst.AUTHORITY)!.extensionPath;

    const resolvedLanguage = this.recurseCandidates(rootPath, languageFormat, this.options.locale);

    const languageFilePath = resolve(rootPath, resolvedLanguage);

    try {
      const defaultLanguageBundle = JSON.parse(resolvedLanguage !== defaultLanguage ? readFileSync(resolve(rootPath, defaultLanguage), 'utf-8') : '{}');

      const resolvedLanguageBundle = JSON.parse(readFileSync(languageFilePath, 'utf-8'));

      return { ...defaultLanguageBundle, ...resolvedLanguageBundle };
    } catch (err) {
      throw err;
    }
  }

  private recurseCandidates(rootPath: string, format: string, candidate: string): string {
    const filename = format.replace('{0}', `.${candidate}`);
    const filepath = resolve(rootPath, filename);
    if (existsSync(filepath)) {
      return filename;
    }
    if (candidate.split('-')[0] !== candidate) {
      return this.recurseCandidates(rootPath, format, candidate.split('-')[0]);
    }
    return format.replace('{0}', '');
  }
}

export const localize = Localize.prototype.localize.bind(new Localize());
