# 版本变更日志

这个项目的所有关键变化都将记录在此文件中.

此日志格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/),
并且此项目遵循 [Semantic Versioning](https://semver.org/lang/zh-CN/).

## [Unreleased]

### Added

- 模型树导航：
  - 项：打开对应路径的 wiki 界面
- 命令(Command)
  - 搜索实体视图（Search Entity View）：ibiz-modeling-studio.mos-fs.search-entity-view
  - 打开 wiki（Open Wiki）：command.ibiz-modeling-studio.mos-fs.open-wiki
  - 打开项目（Open Project GitLab）：ibiz-modeling-studio.gitlab.open-project
- .ibizproject 文件
  - 新增：git-remote 参数

## [0.0.1] - 2021-12-10

### Added

- 登录
- 系统信息终端
- 识别文件中的 iBizModeling 路径
- 模型树导航：
  - 打开 iBizModeling 工具
  - 根据路径打开模型
  - 查找实体
  - 显示信息终端
  - 代码发布
  - 模板发布
  - 右键菜单：复制模型路径
- 内置图形编辑
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
- 命令(Command)
  - 登录（Login）：ibiz-modeling-studio.user.login
  - 登出（Logout）：ibiz-modeling-studio.user.logout
  - 打开 iBizModeling 工具（Open iBizModeling Tool）：ibiz-modeling-studio.open-ibiz-modeling
  - 显示信息终端（Open Information Terminal）：ibiz-modeling-studio.system-info-terminal.show
  - 发布代码（Publish Code）：ibiz-modeling-studio.system.publish.code
  - 发布模板（Publish Template）：ibiz-modeling-studio.template.publish
  - 拷贝路径（Copy Path）：ibiz-modeling-studio.mos-fs.copy-path
  - 打开模型（Open Model）：ibiz-modeling-studio.mos-fs.open-file
  - 打开运行时（Open Model Runtime）：ibiz-modeling-studio.mos-fs.open-runtime
  - 根据路径打开模型（Open Model By Path）：ibiz-modeling-studio.mos-fs.open-model-by-path
  - 搜索实体（Search Entity）：ibiz-modeling-studio.mos-fs.search-entity
