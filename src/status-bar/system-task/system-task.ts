import { Command, StatusBarAlignment, StatusBarItem, ThemeColor, window } from 'vscode';

/**
 * 信息项
 *
 * @author chitanda
 * @date 2021-12-15 10:12:46
 * @export
 * @interface TaskBarInfo
 */
export interface TaskBarInfo {
  text: string;
  tooltip?: string;
  color?: string | ThemeColor;
  backgroundColor?: ThemeColor;
  command?: string | Command;
}

/**
 * 系统任务运行状态栏
 *
 * @author chitanda
 * @date 2021-12-15 09:12:13
 * @export
 * @class SystemTaskStatusBar
 */
export class SystemTaskStatusBar {
  protected readonly bar: StatusBarItem;

  get id(): string {
    return this.bar.id;
  }

  /**
   * Creates an instance of SystemTaskStatusBar.
   *
   * @author chitanda
   * @date 2021-12-15 10:12:35
   */
  constructor() {
    this.bar = window.createStatusBarItem(StatusBarAlignment.Right, 10);
  }

  /**
   * 信息
   *
   * @author chitanda
   * @date 2021-12-15 10:12:22
   * @param {TaskBarInfo} data
   */
  info(data: TaskBarInfo): void {
    data.color = '#3880ff';
    this.show(data);
  }

  /**
   * 警告
   *
   * @author chitanda
   * @date 2021-12-15 10:12:32
   * @param {TaskBarInfo} data
   */
  warn(data: TaskBarInfo): void {
    data.color = '#ffc409';
    this.show(data);
  }

  /**
   * 成功
   *
   * @author chitanda
   * @date 2021-12-15 10:12:37
   * @param {TaskBarInfo} data
   */
  success(data: TaskBarInfo): void {
    data.color = '#2dd36f';
    this.show(data);
  }

  /**
   * 异常
   *
   * @author chitanda
   * @date 2021-12-15 10:12:26
   * @param {TaskBarInfo} data
   */
  error(data: TaskBarInfo): void {
    data.color = '#eb445a';
    this.show(data);
  }

  /**
   * 显示状态栏
   *
   * @author chitanda
   * @date 2021-12-15 10:12:21
   * @param {TaskBarInfo} { text, tooltip, color, backgroundColor, command }
   */
  show({ text, tooltip, color, backgroundColor, command }: TaskBarInfo): void {
    this.bar.text = text;
    this.bar.tooltip = tooltip;
    this.bar.backgroundColor = backgroundColor;
    this.bar.color = color;
    this.bar.command = command;
    this.bar.show();
  }

  /**
   * 隐藏信息栏
   *
   * @author chitanda
   * @date 2021-12-15 10:12:16
   */
  hide(): void {
    this.bar.text = '';
    this.bar.hide();
  }
}
// 唯一 taskBar
export const taskBar = new SystemTaskStatusBar();
