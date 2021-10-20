import { commands, Event, EventEmitter, ExtensionContext, ProviderResult, TreeDataProvider, window } from 'vscode';
import { CommandConst, RTContextConst } from '../../../constants';
import { ctx } from '../../../context';
import { IPSData } from '../../../interface';
import { serviceApi } from '../../../service';
import { taskBar } from '../../../status-bar';
import { notNilEmpty } from '../../../util';
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
  readonly evt: EventEmitter<any> = new EventEmitter<any>();

  onDidChangeTreeData: Event<void | IPSData | null | undefined> = this.evt.event;

  /**
   * 是否为第一次，第一次的时候默认预加载一次。其余按照事件触发，加载数据
   *
   * @author chitanda
   * @date 2021-12-15 14:12:44
   * @protected
   */
  protected first = true;

  protected items: IPSData[] = [];

  constructor(protected context: ExtensionContext) {
    this.init();
  }

  protected init(): void {
    this.listenWSMessage();
    this.initCommand();
  }

  protected listenWSMessage(): void {
    ctx.ws.command(() => this.refresh(), 'all', 'PSSYSDEVBKTASK');
  }

  protected initCommand(): void {
    commands.registerCommand(CommandConst.SYSTEM.TASK.REFRESH, this.refresh, this);
    commands.registerCommand(CommandConst.SYSTEM.TASK.CANCEL, this.cancel, this);
  }

  protected changeStatusBar(): void {
    if (this.items.length > 0) {
      ctx.setContext(RTContextConst.PUBLISH_CODE, true);
      const runs = this.items.filter(item => {
        return item.taskstate === 20;
      });
      if (runs.length > 0) {
        taskBar.info({
          text: `$(loading~spin) 执行中：${runs.map(run => run.pssysdevbktaskname).join(' > ')}`,
          tooltip: `请在系统后台任务中查看详情`,
        });
        return;
      } else {
        const item = this.items[0];
        const info: string = item.queueinfo;
        if (notNilEmpty(info) && info.startsWith('正在等待调度,')) {
          taskBar.warn({
            text: `$(loading~spin) 后台任务：${item.pssysdevbktaskname} - ${info}`,
          });
          return;
        }
      }
      taskBar.info({
        text: `$(loading~spin) 后台任务：等待中`,
      });
    } else {
      ctx.setContext(RTContextConst.PUBLISH_CODE, false);
      taskBar.hide();
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

  timer?: NodeJS.Timeout;

  /**
   * 加载任务信息
   *
   * @author chitanda
   * @date 2021-12-14 10:12:41
   * @protected
   * @return {*}  {Promise<IPSData[]>}
   */
  protected async loadTasks(): Promise<IPSData[]> {
    return new Promise(resolve => {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = undefined;
      }
      this.timer = setTimeout(async () => {
        this.first = false;
        const items = await serviceApi.getSystemRun();
        this.items = items.sort((a, b) => {
          if (a.ordervalue > b.ordervalue) {
            return 1;
          }
          return -1;
        });
        resolve(this.items);
      }, 200);
    });
  }

  async getTreeItem(data: IPSData): Promise<SystemTaskItem> {
    const treeItem = new SystemTaskItem(data);
    return treeItem;
  }

  async getChildren(): Promise<IPSData[]> {
    if (this.first) {
      await this.refresh();
    }
    return this.items;
  }

  getParent(_element: IPSData): ProviderResult<IPSData> {
    return undefined;
  }
}
