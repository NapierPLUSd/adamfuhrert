# iBiz 建模工场（iBizModelingStudio）

## 简介

iBizModelingStudio 是 iBizSys 系统模型开发辅助工具，实现高效便捷的开发过程。
复杂模型下友好的图形化设计界面、模型树快速打开需要修改的模型、系统信息终端详尽的知道系统的每一个变化、等等。快开始体验吧！

## 插件使用

#### 前置要求

1. 拥有 iBizModeling 账户。[注册账户](https://www.ibizlab.cn/register.html)

2. 本地有 iBizSys 项目，并且账户对项目拥有修改权限

3. 需要打开的项目根目录有`.ibizproject`文件

#### 快速开始

1. 请确认项目`.ibizproject`文件中有如下几个属性，此文件一般为模板发布

   ```yaml
   # .ibizproject 文件

   # 打开类型设置。当前支持系统，后续将支持直接从应用开始。
   type: PSSYSTEM
   # 方案标识
   psdevsln: 22A4AD93-6A7C-4380-B912-6B2CA9C3DCDF
   # 系统标识
   psdevslnsys: 913D11CB-B368-4589-845C-9B47308A02B4
   # 系统名称
   psdevslnsysname: iBiz产品生产管理系统
   # 项目 git 地址
   git-remote: https://gitee.com/iBizModeling/ibiz-modeling-studio.git
   ```

2. 新建 vscode 窗口，快捷键：`Ctrl+Shift+N`

3. 打开项目并登陆此项目的 iBizModeling 账户

   `插件在未登录时会默认提示登录，也可以通过 命令(Ctrl+P) => Login 登录`

   <img src='https://cdn.ibizlab.cn/ibizsys-vscode-plugin/OpenProjectAndLogin.gif' style='width: 100%'></img>

4. 登陆成功后会提示`重新加载项目`，请重新加载

5. 可以开始使用啦~

## 支持功能

1. 登录

2. 系统信息终端

3. 识别`iBizModeling:/`域的模型路径跳转

4. 模型导航

   - 打开 iBizModeling 工具
   - 打开项目所在 GitLab
   - 根据路径打开模型
   - 查找实体
   - 项：打开 wiki、打开运行时、编辑
   - 右键菜单：复制模型路径

5. 系统后台任务

   - 刷新系统后台任务
   - 取消正在执行的系统后台任务
   - 显示信息终端
   - 代码发布 - 选择发布任务执行，可点击按钮新建任务配置
   - 模板发布

6. 内置设计界面

   - 用例图
   - ER 图
   - 应用菜单
   - 实体视图
   - 模型运行时
   - 表单
   - 表格
   - 树
   - 图表
   - 列表
   - 卡片
   - 工具栏
   - 面板
   - 数据看板

7. 命令(Command)&nbsp;&ensp;快捷键：`Ctrl+Shift+P`

   | 命令                                   | 描述                       |
   | :------------------------------------- | :------------------------- |
   | Login                                  | 登陆 iBizModeling 账户     |
   | Logout                                 | 登出 iBizModeling 账户     |
   | Open iBizModeling Tool                 | 打开 iBizModeling 工具     |
   | Open Information Terminal              | 显示系统信息终端           |
   | Open Model By Path                     | 根据路径打开模型配置界面   |
   | Search Entity                          | 搜索实体                   |
   | Publish Code                           | 发布代码                   |
   | Open Wiki                              | 打开 wiki                  |
   | Open Project GitLab                    | 打开项目 GitLab            |
   | Refresh System Background Tasks        | 刷新系统后台任务           |
   | Cancel Ongoing System Background Tasks | 取消正在执行的系统后台任务 |

## vscode 设置

```json
// 配置说明
{
  "ibiz-modeling-studio.iBizModelingStudioDomain": "基本服务提供域地址",
  "ibiz-modeling-studio.console.auto-display": "是否在有消息时自动显示信息终端",
  "ibiz-modeling-studio.ibiz-modeling-link.enable": "是否启用识别文件中 iBizModeling:/ 模型路径跳转",
}
// 默认配置
{
  "ibiz-modeling-studio.iBizModelingStudioDomain": "http://studio.ibizmodeling.cn",
  "ibiz-modeling-studio.console.auto-display": true,
  "ibiz-modeling-studio.ibiz-modeling-link.enable": true,
}
// 开发环境配置
{
  "ibiz-modeling-studio.iBizModelingStudioDomain": "http://172.16.170.145",
}
```

## 功能概览

#### 1. 模型导航区基本功能

打开 iBizModeling 工具

<img src='https://cdn.ibizlab.cn/ibizsys-vscode-plugin/OpenIBizModelingTool.gif' style='width: 100%'></img>

根据模型路径，快速打开配置界面

<img src='https://cdn.ibizlab.cn/ibizsys-vscode-plugin/QuickOpenModelByPath.gif' style='width: 100%'></img>

根据名称快速查找实体

<img src='https://cdn.ibizlab.cn/ibizsys-vscode-plugin/QuickSearchEntity.gif' style='width: 100%'></img>

#### 2. 系统后台任务基本功能

代码发布

<img src='https://cdn.ibizlab.cn/ibizsys-vscode-plugin/PublishCode.gif' style='width: 100%'></img>

模板发布

<img src='https://cdn.ibizlab.cn/ibizsys-vscode-plugin/PublishTemplate.gif' style='width: 100%'></img>

系统日志信息终端

<img src='https://cdn.ibizlab.cn/ibizsys-vscode-plugin/SystemInfoTerminal.gif' style='width: 100%'></img>

#### 3. 模型运行时查看

<img src='https://cdn.ibizlab.cn/ibizsys-vscode-plugin/SystemModelRuntime.gif' style='width: 100%'></img>

#### 4. 内置设计界面

<img src='https://cdn.ibizlab.cn/ibizsys-vscode-plugin/ModelDesignTool.gif' style='width: 100%'></img>

#### 6. 打开项目中的模型链接

<img src='https://cdn.ibizlab.cn/ibizsys-vscode-plugin/OpenModelPathInProject.gif' style='width: 100%'></img>

## 帮助

#### 如何在模板中使用 iBizModeling 模型路径

1. 找到需要发布对象的运行时，搜索 getMOSFilePath 即可找到模型路径

   <img src='https://cdn.ibizlab.cn/ibizsys-vscode-plugin/ModelRuntimeSearchModelingPath.png' style='width: 100%'></img>

2. 模板输出路径时，加上域`iBizModeling:/`

   例：iBizModeling:/psmodules/AppDesign/psdataentities/PSAPPVIEW

## Issues

在使用过程中遇见问题，可以来 [issues](https://gitee.com/iBizModeling/ibiz-modeling-studio/issues) 交流

### [版本日志](https://gitee.com/iBizModeling/ibiz-modeling-studio/blob/master/CHANGELOG.md)

---

## 了解更多

- [iBizSys 官网](http://www.ibizsys.cn)

- [iBiz 开发平台](https://www.ibizlab.cn/)

- [应用中心管理](http://www.ibizmodeling.cn/#/appcenter/appportalview)

## 常见问题

1. 出现 <font color=#eb445a>read ECONNRESET</font> 错误提示，请检查是否使用了翻墙软件。一般为 DNS 解析异常导致的。

2. 无法弹出登录窗口，请检查 vscode 是否能够正常打开网页链接。
