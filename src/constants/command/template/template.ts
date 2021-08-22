/* eslint-disable @typescript-eslint/naming-convention */

import { TemplatePublishCommand } from '../../../commands/template/publish';

/**
 * 模板相关指令集
 *
 * @author chitanda
 * @date 2021-12-01 15:12:51
 * @export
 * @class TemplateConst
 */
export class TemplateConst {
  /**
   * 发布模板
   *
   * @author chitanda
   * @date 2021-12-01 15:12:54
   * @see 实现 {@link TemplatePublishCommand.execute}
   */
  readonly PUBLISH = 'ibiz-modeling-studio.template.publish';
}
