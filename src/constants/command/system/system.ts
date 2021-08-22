/* eslint-disable @typescript-eslint/naming-convention */
import { SystemPublishCommand } from '../../../commands/system/publish';
import { SystemTask } from './system-task';

/**
 * 系统相关命令
 *
 * @author chitanda
 * @date 2021-12-01 15:12:52
 * @export
 * @class SystemConst
 */
export class SystemConst {
  /**
   * 发布代码
   *
   * @author chitanda
   * @date 2021-12-01 15:12:53
   * @see 实现 {@link SystemPublishCommand.execute}
   */
  readonly PUBLISH = 'ibiz-modeling-studio.system.publish.code';
  /**
   * 系统任务
   *
   * @author chitanda
   * @date 2021-12-14 09:12:37
   * @type {SystemTask}
   */
  readonly TASK: SystemTask = new SystemTask();
}
