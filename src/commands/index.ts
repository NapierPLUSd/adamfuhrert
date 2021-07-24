import { ExtensionContext } from 'vscode';
import { OpenProjectCommand } from './gitlab/open-project';
import { OpenIBizModelingCommand } from './ibiz-modeling/open-ibiz-modeling';
import { CopyPathCommand } from './mos-fs/copy-path';
import { OpenFileCommand } from './mos-fs/open-file';
import { OpenRuntimeCommand } from './mos-fs/open-runtime';
import { OpenWikiCommand } from './mos-fs/open-wiki';
import { SearchEntityCommand } from './mos-fs/search-entity';
import { SearchEntityViewCommand } from './mos-fs/search-entity-view';
import { OpenModelByPathCommand } from './mos-fs/search-model';
import { SystemInfoTerminalShowCommand } from './system-info-terminal/show';
import { SystemPublishCommand } from './system/publish';
import { TemplatePublishCommand } from './template/publish';
import { UserLoginCommand } from './user/login';
import { UserLogoutCommand } from './user/logout';

/**
 * 安装命令处理程序
 *
 * @author chitanda
 * @date 2021-11-30 11:11:08
 * @export
 * @param {ExtensionContext} _context
 */
export function installCommands(_context: ExtensionContext): void {
  new OpenProjectCommand();
  new OpenIBizModelingCommand();
  // mos-fs 相关
  {
    new CopyPathCommand();
    new OpenFileCommand();
    new OpenRuntimeCommand();
    new OpenWikiCommand();
    new OpenModelByPathCommand();
    new SearchEntityCommand();
    new SearchEntityViewCommand();
  }
  // 系统相关
  {
    new SystemPublishCommand();
    new SystemInfoTerminalShowCommand();
  }
  // 模板相关
  {
    new TemplatePublishCommand();
  }
  // 用户相关
  {
    new UserLoginCommand();
    new UserLogoutCommand();
  }
}
