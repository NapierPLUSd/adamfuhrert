/* eslint-disable @typescript-eslint/naming-convention */

import { SystemTaskProvider } from "../../../explorer/system-task/provider/system-task";

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
   * 刷新系统任务
   *
   * @author chitanda
   * @date 2021-12-14 09:12:25
   * @see 实现 {@link SystemTaskProvider.refresh}
   */
  readonly REFRESH = 'command.ibiz-modeling-studio.system.run-task.refresh';
  /**
   * 运行系统任务
   *
   * @author chitanda
   * @date 2021-12-14 09:12:30
   * @see 实现 {@link SystemTaskProvider.cancel}
   */
  readonly CANCEL = 'command.ibiz-modeling-studio.system.run-task.cancel';
}
