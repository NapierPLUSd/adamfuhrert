import { commands, Event, EventEmitter, ExtensionContext, StatusBarAlignment, StatusBarItem, TreeDataProvider, window } from 'vscode';
import { CommandConst } from '../../../constants';
import { ctx } from '../../../context';
import { IPSData } from '../../../interface';
import { serviceApi } from '../../../service';
import { SystemTaskItem } from '../system-task-item/system-task-item';

/**
 * 模型导航树
 *
 * @author chitanda
 * @date 2021-11-30 10:11:47
 * @export
 * @class SystemTaskProvider
 * @implements {TreeDataProvider<IPSData>}
 */
export class SystemTaskProvider implements TreeDataProvider<IPSData> {
  private evt: EventEmitter<any> = new EventEmitter<any>();
  onDidChangeTreeData: Event<void | IPSData | null | undefined> = this.evt.event;

  protected items: IPSData[] = [];

  protected statusBar: StatusBarItem;

  constructor(protected context: ExtensionContext) {
    this.init();
    this.statusBar = window.createStatusBarItem(StatusBarAlignment.Right, 10);
    this.statusBar.text = '任务';
  }

  protected init(): void {
    this.listenWSMessage();
    this.initCommand();
  }

  protected listenWSMessage(): void {
    ctx.ws.command(
      () => {
        this.refresh();
      },
      'all',
      'PSSYSDEVBKTASK',
    );
  }

  protected initCommand(): void {
    commands.registerCommand(CommandConst.SYSTEM.TASK.REFRESH, this.refresh, this);
    commands.registerCommand(CommandConst.SYSTEM.TASK.CANCEL, this.cancel, this);
  }

  protected changeStatusBar(): void {
    const bar = this.statusBar;
    if (this.items.length > 0) {
      const runs = this.items.filter(item => item.taskstate === 20);
      bar.text = `$(loading~spin) 执行中：${runs.map(run => run.pssysdevbktaskname).join(' > ')}`;
      bar.tooltip = `点击打开任务信息栏`;
      bar.show();
    } else {
      bar.text = '';
      bar.hide();
    }
  }

  /**
   * 刷新任务
   *
   * @author chitanda
   * @date 2021-12-14 10:12:13
   * @protected
   * @return {*}  {Promise<void>}
   */
  protected async refresh(): Promise<void> {
    await this.loadTasks();
    this.changeStatusBar();
    this.evt.fire(undefined);
  }

  /**
   * 取消任务
   *
   * @author chitanda
   * @date 2021-12-14 10:12:18
   * @protected
   * @return {*}  {Promise<void>}
   */
  protected async cancel(): Promise<void> {
    const keys: string[] = this.items.map(item => item.pssysdevbktaskid);
    const bol = await serviceApi.cancelSystemRun(keys);
    if (bol) {
      this.refresh();
    } else {
      window.showErrorMessage('取消任务失败');
    }
  }

  /**
   * 加载任务信息
   *
   * @author chitanda
   * @date 2021-12-14 10:12:41
   * @protected
   * @return {*}  {Promise<IPSData[]>}
   */
  protected async loadTasks(): Promise<IPSData[]> {
    const items = await serviceApi.getSystemRun();
    this.items = items.sort((a, b) => {
      if (a.ordervalue > b.ordervalue) {
        return 1;
      }
      return -1;
    });
    return this.items;
  }

  async getTreeItem(data: IPSData): Promise<SystemTaskItem> {
    const treeItem = new SystemTaskItem(data);
    return treeItem;
  }

  async getChildren(): Promise<IPSData[]> {
    return this.items;
  }
}
