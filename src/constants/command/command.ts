/* eslint-disable @typescript-eslint/naming-convention */

import { GitLabConst } from './gitlab/gitlab';
import { IBizModeling } from './ibiz-modeling/ibiz-modeling';
import { MosFSConst } from './mos-fs/mos-fs';
import { SystemInfoTerminalConst } from './system-info-terminal/system-info-terminal';
import { SystemConst } from './system/system';
import { TemplateConst } from './template/template';
import { UserConst } from './user/user';
import { VSCodeConst } from './vs-code/vs-code';
import { WorkbenchConst } from './workbench/workbench';

/**
 * 文件后缀
 *
 * @author chitanda
 * @date 2021-11-11 10:11:19
 * @export
 * @class CommandConst
 */
export class CommandConst {
  static readonly IBIZ_MODELING: IBizModeling = new IBizModeling();

  static readonly WORKBENCH: WorkbenchConst = new WorkbenchConst();

  static readonly VSCODE: VSCodeConst = new VSCodeConst();

  static readonly SYSTEM_INFO_TERMINAL: SystemInfoTerminalConst = new SystemInfoTerminalConst();

  static readonly SYSTEM: SystemConst = new SystemConst();

  static readonly TEMPLATE: TemplateConst = new TemplateConst();

  static readonly USER: UserConst = new UserConst();

  static readonly MOS_FS: MosFSConst = new MosFSConst();

  static readonly GITLAB: GitLabConst = new GitLabConst();
}
