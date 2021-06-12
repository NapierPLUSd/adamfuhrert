/* eslint-disable @typescript-eslint/naming-convention */
/**
 * 在 vscode 中的配置参数
 *
 * @author chitanda
 * @date 2021-11-15 17:11:22
 * @export
 * @class ConfigConst
 */
export class ConfigConst {
  /**
   * 建模工场域
   *
   * @author chitanda
   * @date 2021-11-29 14:11:15
   * @static
   * @type {string}
   */
  static readonly IBIZ_MODELING_STUDIO_DOMAIN = 'ibiz-modeling-studio-domain';
  /**
   * 系统 console 日志输入配置
   *
   * @author chitanda
   * @date 2021-11-25 11:11:39
   * @static
   */
  static readonly CONSOLE = {
    // 控制台关闭时，收到消息是否自动弹出
    AUTO_DISPLAY: 'console.auto-display',
  };
  /**
   * 模型链接识别是否启用
   *
   * @author chitanda
   * @date 2021-12-03 15:12:24
   * @static
   */
  static readonly IBIZ_MODELING_LINK = {
    // 启用模型链接识别
    ENABLE: 'ibiz-modeling-link.enable',
  };
}
