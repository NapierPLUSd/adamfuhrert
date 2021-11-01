import { IBizModelFSCustomChildConfigItem, IBizModelFSCustomConfigItem } from './interface/ibiz-model-fs-custom-config-item';

/**
 * 模型导航树配置
 *
 * @author chitanda
 * @date 2021-11-30 17:11:47
 * @export
 * @class IBizModelFSCustomConfig
 */
export class IBizModelFSCustomConfig {
  protected static readonly regStr = '[^\n\r/]+';

  static readonly configs: IBizModelFSCustomConfigItem[] = [
    {
      path: '/',
      children: [
        {
          path: '/pssysucmaps',
          name: 'pssysucmaps',
          logicName: '系统用例看板',
        },
        {
          path: '/pssysermaps',
          name: 'pssysermaps',
          logicName: '实体模型看板',
        },
        {
          path: '/pssyscanvases',
          name: 'pssyscanvases',
          logicName: '画布',
        },
        // {
        //   path: '/pssyssfpubs',
        //   name: 'pssyssfpubs',
        //   logicName: '后台体系',
        // },
        // {
        //   path: '/pssysdbschemes',
        //   name: 'pssysdbschemes',
        //   logicName: '数据库架构',
        // },
        // {
        //   path: '/pssysserviceapis',
        //   name: 'pssysserviceapis',
        //   logicName: '服务接口',
        // },
        // {
        //   path: '/pssubsysserviceapis',
        //   name: 'pssubsysserviceapis',
        //   logicName: '外部接口',
        // },
        {
          path: '/pssysapps',
          name: 'pssysapps',
          logicName: '前端应用',
        },
        {
          path: '/psmodules',
          name: 'psmodules',
          logicName: '系统',
        },
      ],
    },
    {
      path: '/psmodules/*',
      children: [
        {
          path: '/psmodules/*/psdataentities',
          name: 'psdataentities',
          logicName: '实体',
        },
      ],
    },
    {
      path: '/psmodules/*/psdataentities/*',
      children: [
        {
          path: '/psmodules/*/psdataentities/*/psdeforms',
          name: 'psdeforms',
          logicName: '表单',
        },
        {
          path: '/psmodules/*/psdataentities/*/psdegrids',
          name: 'psdegrids',
          logicName: '数据表格',
        },
        {
          path: '/psmodules/*/psdataentities/*/psdetreeviews',
          name: 'psdetreeviews',
          logicName: '树视图',
        },
        {
          path: '/psmodules/*/psdataentities/*/psdecharts',
          name: 'psdecharts',
          logicName: '数据图表',
        },
        {
          path: '/psmodules/*/psdataentities/*/psdelists',
          name: 'psdelists',
          logicName: '数据列表',
        },
        {
          path: '/psmodules/*/psdataentities/*/psdedataviews',
          name: 'psdedataviews',
          logicName: '卡片视图',
        },
        {
          path: '/psmodules/*/psdataentities/*/psdetoolbars',
          name: 'psdetoolbars',
          logicName: '工具栏',
        },
        {
          path: '/psmodules/*/psdataentities/*/pssysviewpanels',
          name: 'pssysviewpanels',
          logicName: '面板',
        },
        {
          path: '/psmodules/*/psdataentities/*/pssysdashboards',
          name: 'pssysdashboards',
          logicName: '数据看板',
        },
        {
          path: '/psmodules/*/psdataentities/*/pssysportlets',
          name: 'pssysportlets',
          logicName: '数据看板部件',
        },
        {
          path: '/psmodules/*/psdataentities/*/pssyscalendars',
          name: 'pssyscalendars',
          logicName: '日历',
        },
        {
          path: '/psmodules/*/psdataentities/*/psdeviewbases',
          name: 'psdeviewbases',
          logicName: '实体视图',
        },
        {
          path: '/psmodules/*/psdataentities/*/psdedataqueries',
          name: 'psdedataqueries',
          logicName: '数据查询',
        },
      ],
    },
    {
      path: '/pssysapps/*',
      children: [
        {
          path: '/pssysapps/*/psappmenus',
          name: 'psappmenus',
          logicName: '应用菜单',
        },
        {
          path: '/pssysapps/*/psappviews',
          name: 'psappviews',
          logicName: '应用视图',
        },
        // {
        //   path: '/pssysapps/*/psappmodules',
        //   name: 'psappmodules',
        //   logicName: '应用模块',
        // },
      ],
    },
    {
      path: '/pssysapps/*/psappmodules/*',
      children: [
        {
          path: '/pssysapps/*/psappmodules/*/psapplocaldes',
          name: 'psapplocaldes',
          logicName: '应用实体',
        },
        {
          path: '/pssysapps/*/psappmodules/*/psappviews',
          name: 'psappviews',
          logicName: '应用视图',
        },
      ],
    },
  ];

  /**
   * 特殊转为叶子节点
   *
   * @author chitanda
   * @date 2021-12-01 11:12:23
   * @static
   * @type {string[]}
   */
  static leafConfigs: string[] = ['/pssysapps/*/psappmodules/*/psapplocaldes/*', '/pssysapps/*/psappmodules/*/psapplocaldes/*'];

  /**
   * 索引型模型对象
   *
   * @author chitanda
   * @date 2021-12-05 13:12:58
   * @static
   * @type {string[]}
   */
  static indexConfigs: RegExp[] = [new RegExp(`^/psmodules/${this.regStr}/psdataentities/${this.regStr}$`)];

  /**
   * 根据路径获取子目录
   *
   * @author chitanda
   * @date 2021-11-30 19:11:13
   * @static
   * @param {string} path
   * @return {*}  {IBizModelFSCustomChildConfigItem[]}
   */
  static getItems(path: string): IBizModelFSCustomChildConfigItem[] | null {
    if (path === '/' || path === '') {
      return this.configs.find(item => item.path === '/')!.children;
    }
    const config = this.configs.find(c => {
      if (!c.reg) {
        c.reg = new RegExp(`^${c.path.replace(/\*/g, this.regStr)}$`);
      }
      return c.reg.test(path);
    });
    if (config) {
      return config.children;
    }
    return null;
  }

  /**
   * 计算是否为索引型模型
   *
   * @author chitanda
   * @date 2021-12-05 13:12:33
   * @static
   * @param {string} path
   * @return {*}  {boolean}
   */
  static ownIndex(path: string): boolean {
    return this.indexConfigs.some(reg => reg.test(path));
  }
}
