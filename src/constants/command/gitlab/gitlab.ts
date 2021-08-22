/* eslint-disable @typescript-eslint/naming-convention */

import { OpenProjectCommand } from '../../../commands/gitlab/open-project';
import { OpenWikiCommand } from '../../../commands/gitlab/open-wiki';

/**
 * gitlab 相关指令集
 *
 * @author chitanda
 * @date 2021-12-13 11:12:37
 * @export
 * @class GitLabConst
 */
export class GitLabConst {
  /**
   * 打开当前项目的 gitlab
   *
   * @author chitanda
   * @date 2021-12-13 11:12:47
   * @see 实现 {@link OpenProjectCommand.execute}
   */
  readonly OPEN_PROJECT = 'ibiz-modeling-studio.gitlab.open-project';
  /**
   * 打开 wiki 界面
   *
   * @author chitanda
   * @date 2021-12-12 13:12:06
   * @see 实现 {@link OpenWikiCommand.execute}
   */
  readonly OPEN_WIKI = 'ibiz-modeling-studio.gitlab.open-wiki';
}
