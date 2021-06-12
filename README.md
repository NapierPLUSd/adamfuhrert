# iBiz建模工场（iBizModelingStudio）

辅助 iBizSys 系统进行模型开发，不需要脱离你的生产力工具即可完成需要的模型操作。

yaml 格式的文本编辑，友好的提示和便捷的修改，更拥有友好的图形化界面方便进行复杂模型编辑。良好的索引界面，帮助你更快的定位到需要修改的模型。无本地文件，无需占用本地空间。

## 功能预览

<img src='https://cdn.ibizlab.cn/ibizsys-vscode-plugin/tool-preview.gif' style='width: 100%'></img>

## vscode 基本设置

##### 1. 配置基本服务域地址

```json
// 配置说明
{
  "ibiz-modeling-studio.iBizModelingStudioDomain": "基本服务提供域地址"
}
// 正式环境配置 <插件默认配置>
{
  "ibiz-modeling-studio.iBizModelingStudioDomain": "http://studio.ibizmodeling.cn"
}
// 开发环境配置
{
  "ibiz-modeling-studio.iBizModelingStudioDomain": "http://172.16.170.145"
}
```

##### 2. 系统消息终端

1. 在关闭后收到消息时会自动弹出，可以配置 `ibiz-modeling-studio.console.autoDisplay=false` 关闭弹出

## 前置要求

1. 拥有 iBizLab 账户

2. 本地有 iBizSys 项目，并且账户对项目拥有修改权限

3. 项目根目录有 .ibizproject 文件

## 快速开始

1. 请确认项目 .ibizproject 文件中有如下几个属性

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
```

2. 在 vscode 新建窗口，快捷键：`Ctrl+Shift+N`

3. 将项目添加到工作区，按钮路径：`文件 => 将文件夹添加到工作区`

<img src='https://cdn.ibizlab.cn/ibizsys-vscode-plugin/add-folder-to-workspace.gif' style='width: 100%'></img>

4. 添加成功识并别到 .ibizproject 文件后会弹出登录框，请使用 iBizLab 账号登录

<img src='https://cdn.ibizlab.cn/ibizsys-vscode-plugin/login-user.gif' style='width: 100%'></img>

5. 登录成功后重新加载工作区，使插件初始化文件系统

<img src='https://cdn.ibizlab.cn/ibizsys-vscode-plugin/reload-workspace.gif' style='width: 100%'></img>

6. 初始化完毕，将工作区保存

7. 以后直接打开工作区即可使用啦~

## 命令(Command)&nbsp;&ensp;快捷键：`Ctrl+Shift+P`

1. 打开系统消息终端

2. 发布系统

3. 发布模板

## Issues

在使用过程中遇见问题，可以来 [issues](http://172.16.180.230/vscode-plugin/ibiz-modeling-studio/issues) 提交

### 0.0.1

初始版本

---

<!-- ## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

**Note:** You can author your README using Visual Studio Code.  Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
* Toggle preview (`Shift+CMD+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
* Press `Ctrl+Space` (Windows, Linux) or `Cmd+Space` (macOS) to see a list of Markdown snippets -->

### 了解更多

- [iBizSys 官网](http://www.ibizsys.cn)

- [iBiz 开发平台](https://www.ibizlab.cn/)

- [应用中心管理](http://www.ibizmodeling.cn/#/appcenter/appportalview)

## 常见问题

1. 出现 <font color=#eb445a>read ECONNRESET</font> 错误提示，请检查是否使用了翻墙软件。一般为翻墙软件导致的无法发送请求。
