/* eslint-disable @typescript-eslint/naming-convention */
import { SystemInfoTerminalShowCommand } from '../../../commands/system-info-terminal/show';

/**
 * 系统信息终端指令集
 *
 * @author chitanda
 * @date 2021-12-01 15:12:39
 * @export
 * @class SystemInfoTerminalConst
 */
export class SystemInfoTerminalConst {
  /**
   * 显示终端
   *
   * @author chitanda
   * @date 2021-12-01 15:12:51
   * @see 实现 {@link SystemInfoTerminalShowCommand.execute}
   */
  readonly SHOW = 'ibiz-modeling-studio.system-info-terminal.show';
}
