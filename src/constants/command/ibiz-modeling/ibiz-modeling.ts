/* eslint-disable @typescript-eslint/naming-convention */

import { OpenIBizModelingCommand } from "../../../commands/ibiz-modeling/open-ibiz-modeling";

/**
 * iBizModeling 命令集
 *
 * @author chitanda
 * @date 2021-12-07 17:12:57
 * @export
 * @class IBizModeling
 */
export class IBizModeling {
  /**
   * 打开 iBizModeling 工具
   *
   * @author chitanda
   * @date 2021-12-07 17:12:12
   * @see 实现 {@link OpenIBizModelingCommand.execute}
   */
  readonly OPEN = 'ibiz-modeling-studio.open-ibiz-modeling';
}
