/* eslint-disable @typescript-eslint/naming-convention */

import { UserLoginCommand } from "../../../commands/user/login";
import { UserLogoutCommand } from "../../../commands/user/logout";
import { LoginService } from "../../../service/login/login.service";

/**
 * 用户指令集
 *
 * @author chitanda
 * @date 2021-12-01 15:12:34
 * @export
 * @class UserConst
 */
export class UserConst {
  /**
   * 用户登录
   *
   * @author chitanda
   * @date 2021-12-01 15:12:23
   * @see 实现 {@link UserLoginCommand.execute}
   */
  readonly LOGIN = 'ibiz-modeling-studio.user.login';
  /**
   * 用户登出
   *
   * @author chitanda
   * @date 2021-12-08 15:12:42
   * @see 实现 {@link UserLogoutCommand.execute}
   */
  readonly LOGOUT = 'ibiz-modeling-studio.user.logout';
  /**
   * 登录回转地址处理
   *
   * @author chitanda
   * @date 2021-12-06 16:12:08
   * @see 实现 {@link LoginService.loginReplyPathHandle}
   */
  readonly LOGIN_REPLY_PATH_HANDLE = 'ibiz-modeling-studio.user.login-reply-path-handle';
}
