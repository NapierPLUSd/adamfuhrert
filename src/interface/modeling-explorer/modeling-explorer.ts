import { TreeDataProvider, TreeView } from "vscode";

/**
 * 建模工具资源管理器
 *
 * @author chitanda
 * @date 2021-12-22 15:12:14
 * @export
 * @interface ModelingExplorer
 * @template T
 */
export interface ModelingExplorer<T> {
  /**
   * 适配器
   *
   * @author chitanda
   * @date 2021-12-22 15:12:49
   * @type {TreeDataProvider<T>}
   */
  readonly treeDataProvider:TreeDataProvider<T>;
  /**
   * vscode 树
   *
   * @author chitanda
   * @date 2021-12-22 15:12:54
   * @type {TreeView<T>}
   */
  readonly treeView: TreeView<T>;
}
