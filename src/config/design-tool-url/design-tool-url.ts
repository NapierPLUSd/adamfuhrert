/* eslint-disable @typescript-eslint/naming-convention */
export class DesignToolUrl {
  /**
   * 所有支持设计界面的模型设计界面地址
   *
   * @author chitanda
   * @date 2021-11-28 15:11:05
   * @static
   */
  static readonly urls = {
    // 编辑表单
    EDITFORM: `/form-design/#/home/___instance___/psdeforms/___srfkey___/views/design`,
    // 搜索表单
    SEARCHFORM: `/form-design/#/home/___instance___/psdeforms/___srfkey___/views/design`,
    // 表格
    PSDEGRID: `/grid-design/#/home/___instance___/psdegrids/___srfkey___/views/design`,
    // 应用视图
    PSAPPVIEW: `/view-design/#/dynainst/___instance___/psdeviewbases/___srfkey___/views/design`,
    // 实体视图
    PSDEVIEWBASE: `/view-design/#/dynainst/___instance___/psdeviewbases/___srfkey___/views/design`,
    // 首页
    APPINDEXVIEW: '/index-design/#/indexdesign/___instance___/psappindexviews/___srfkey___/views/design',
    // 首页
    PSAPPINDEXVIEW: `/index-design/#/indexdesign/___instance___/psappindexviews/___srfkey___/views/design`,
    // 系统数据看板
    PSSYSDASHBOARD: `/sysportal-design/#/sysportaldesign/___instance___/pssysdashboards/___srfkey___/views/design`,
    // 系统面板
    PSSYSVIEWPANEL: `/panel-design/#/paneldesign/___instance___/pssysviewpanels/___srfkey___/views/design`,
    // 应用看板视图
    PSAPPPORTALVIEW: `/form-design/portaldesign.html#/portaldesign/___instance___/psappportalviews/___srfkey___/views/design`,
    // 工作流
    PSWFVERSION: `/wf-design/#/home/___instance___/pswfversions/___srfkey___/views/design`,
    // 树
    PSDETREEVIEW: `/tree-design/#/home/___instance___/psdetreeviews/___srfkey___/views/design`,
    // 列表
    PSDELIST: `/md-design/#/home/___instance___/psdelists/___srfkey___/views/design`,
    // 数据视图
    PSDEDATAVIEW: `/card-design/#/carddesign/___instance___/psdedataviews/___srfkey___/views/design`,
    // 工具栏
    PSDETOOLBAR: `/toolbar-design/#/toolbardesign/___instance___/psdetoolbars/___srfkey___/views/design`,
    // 图表设计
    PSDECHART: `/chart-design/#/dynainst/___instance___/psdecharts/___srfkey___/views/design`,
    // 实体处理逻辑
    DELOGIC: `/logic-design/#/home/___instance___/psdelogics/___srfkey___/views/design`,
    // 界面逻辑
    UILOGIC: `/logic-design/design.html#/design/___instance___/psdelogics/___srfkey___/views/uldesign`,
    // 实体属性值规则
    PSDEFVALUERULE: `/rule-design/#/valueruledesign/___instance___/psdefvaluerules/___srfkey___/views/design`,
    // er 图
    PSSYSERMAP: `/er-design/#/home/___instance___/pssysermaps/___srfkey___/views/design`,
    // 用例图
    PSSYSUCMAP: `/usecase-design/#/home/___instance___/pssysucmaps/___srfkey___/views/design`,
    // 查询设计
    PSDEDATAQUERY: '/dataquery-design/#/home/___instance___/psdedataqueries/___srfkey___/views/design',
    // 应用菜单
    PSAPPMENU: `/appmenu-design/#/appmenudesign/___instance___/psappmenus/___srfkey___/views/design`,
    // 画布
    PSSYSCANVAS: `/canvas-design/#/home/___instance___/pssyscanvas/___srfkey___/views/design`,
  };

  /**
   * 根据类型获取url
   *
   * @author chitanda
   * @date 2021-11-28 15:11:15
   * @static
   * @param {string} type
   * @return {*}  {(string | null)}
   */
  static getUrl(type: string): string | null {
    if ((this.urls as any)[type]) {
      return (this.urls as any)[type];
    }
    return null;
  }

  /**
   * 类型是否支持
   *
   * @author chitanda
   * @date 2021-11-28 15:11:50
   * @static
   * @param {string} type
   * @return {*}  {boolean}
   */
  static has(type: string): boolean {
    if ((this.urls as any)[type]) {
      return true;
    }
    return false;
  }
}
