/* eslint-disable @typescript-eslint/naming-convention */

import { SystemTaskProvider } from '../../../explorer/system-task/provider/system-task';
import { SystemRunTaskCommand } from '../../../commands/system-task/run';
import { SystemRunMultipleTaskCommand } from '../../../commands/system-task/multiple';

/**
 * 系统任务
 *
 * @author chitanda
 * @date 2021-12-14 09:12:14
 * @export
 * @class SystemTask
 */
export class SystemTask {
  /**
   * 执行所有任务
   *
   * @author chitanda
   * @date 2021-12-22 10:12:54
   * @see 实现 {@link SystemRunTaskCommand.execute}
   */
  readonly RUN = 'ibiz-modeling-studio.system.run-task.run';
  /**
   * 执行所有任务
   *
   * @author chitanda
   * @date 2021-12-22 10:12:54
   * @see 实现 {@link SystemRunMultipleTaskCommand.execute}
   */
  readonly MULTIPLE = 'ibiz-modeling-studio.system.run-task.multiple';
  /**
   * 刷新系统任务
   *
   * @author chitanda
   * @date 2021-12-14 09:12:25
   * @see 实现 {@link SystemTaskProvider.refresh}
   */
  readonly REFRESH = 'ibiz-modeling-studio.system.run-task.refresh';
  /**
   * 运行系统任务
   *
   * @author chitanda
   * @date 2021-12-14 09:12:30
   * @see 实现 {@link SystemTaskProvider.cancel}
   */
  readonly CANCEL = 'ibiz-modeling-studio.system.run-task.cancel';
}
