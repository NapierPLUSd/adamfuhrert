/* eslint-disable @typescript-eslint/naming-convention */

import { CopyPathCommand } from '../../../commands/mos-fs/copy-path';
import { OpenFileCommand } from '../../../commands/mos-fs/open-file';
import { OpenModelByPathCommand } from '../../../commands/mos-fs/open-model-by-path';
import { OpenRuntimeCommand } from '../../../commands/mos-fs/open-runtime';
import { SearchEntityCommand } from '../../../commands/mos-fs/search-entity';
import { SearchEntityViewCommand } from '../../../commands/mos-fs/search-entity-view';

/**
 * MosFS 虚拟文件系统指令集
 *
 * @author chitanda
 * @date 2021-12-01 15:12:05
 * @export
 * @class MosFSConst
 */
export class MosFSConst {
  /**
   * 拷贝路径
   *
   * @author chitanda
   * @date 2021-12-07 16:12:41
   * @see 实现 {@link CopyPathCommand.execute}
   */
  readonly COPY_PATH = 'ibiz-modeling-studio.mos-fs.copy-path';
  /**
   * 打开文件
   *
   * @description 支持打开 PSMosFile、Directory、File、path 类型参数
   * @author chitanda
   * @date 2021-12-01 15:12:06
   * @see 实现 {@link OpenFileCommand.execute}
   */
  readonly OPEN_FILE = 'ibiz-modeling-studio.mos-fs.open-file';
  /**
   * 打开运行时
   *
   * @author chitanda
   * @date 2021-12-07 14:12:45
   * @see 实现 {@link OpenRuntimeCommand.execute}
   */
  readonly OPEN_RUNTIME = 'ibiz-modeling-studio.mos-fs.open-runtime';
  /**
   * 搜索模型
   *
   * @author chitanda
   * @date 2021-12-05 18:12:31
   * @see 实现 {@link OpenModelByPathCommand.execute}
   */
  readonly OPEN_MODEL_BY_PATH = 'ibiz-modeling-studio.mos-fs.open-model-by-path';
  /**
   * 搜索实体
   *
   * @author chitanda
   * @date 2021-12-06 19:12:02
   * @see 实现 {@link SearchEntityCommand.execute}
   */
  readonly SEARCH_ENTITY = 'ibiz-modeling-studio.mos-fs.search-entity';
  /**
   * 搜索实体视图
   *
   * @author chitanda
   * @date 2021-12-06 19:12:07
   * @see 实现 {@link SearchEntityViewCommand.execute}
   */
  readonly SEARCH_ENTITY_VIEW = 'ibiz-modeling-studio.mos-fs.search-entity-view';
}
