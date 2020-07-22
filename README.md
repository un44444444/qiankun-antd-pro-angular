# qiankun-antd-pro-angular
[qiankun](https://qiankun.umijs.org/) projects, Ant Design Pro and Angular integration

# 概述
## main-antd-pro
main-antd-pro是基于[Ant Design Pro](https://pro.ant.design/)项目改造而来的qiankun基座。
* 执行以下命令，可运行工程查看效果：
 > cd main-antd-pro  
 > yarn install  
 > yarn start
* 目前还存在路由问题尚未解决

## subapp-ng-alain
subapp-ng-alain是基于[NG-ALAIN](https://ng-alain.com/zh)项目改造而来的qiankun子应用。
* 执行以下命令，可运行子应用查看效果：
 > cd subapp-ng-alain  
 > yarn install  
 > yarn serve:qiankun

# 从零开始：改造qiankun基座以及子应用
## 改造Ant Design Pro项目为qiankun基座
* 参考[Ant Design Pro开始使用](https://pro.ant.design/docs/getting-started-cn)，创建一个完整的项目框架
* 修改package.json添加@umijs/plugin-qiankun插件[为项目增加qiankun特性](https://github.com/un44444444/qiankun-antd-pro-angular/commit/94ec89c187a91c27d8c9d20f1f3ee4f5dcb30066#r40809151)
* 修改配置文件config/config.ts, [将项目配置为乾坤基座，并注册子应用信息](https://github.com/un44444444/qiankun-antd-pro-angular/commit/94ec89c187a91c27d8c9d20f1f3ee4f5dcb30066#r40809151)
* 修改文件src/pages/document.ejs, [改为 div id="<%= context.config.mountElementId %>"](https://github.com/un44444444/qiankun-antd-pro-angular/commit/94ec89c187a91c27d8c9d20f1f3ee4f5dcb30066#r40809515)

## 改造NG-ALAIN项目为qiankun子应用
* 参考[NG-ALAIN开始使用](https://ng-alain.com/docs/getting-started/zh)，创建一个完整的项目框架
* yarn add single-spa single-spa-angular [增加single-spa依赖](https://github.com/un44444444/qiankun-antd-pro-angular/commit/32d3c7fa5060c70fd77427673bdc8e600fe1c783#r40809912)
* 修改src/main.ts文件, [增加导出single-spa需要的生命周期钩子](https://github.com/un44444444/qiankun-antd-pro-angular/commit/32d3c7fa5060c70fd77427673bdc8e600fe1c783#r40809959)
* 将zone.js修改为外部依赖
  * yarn add @angular-builders/custom-webpack -D
  * 新增配置extra-webpack.config.js文件: externals: { 'zone.js': 'Zone' }
  * 修改angular.json文件builder配置: "builder": "@angular-builders/custom-webpack:browser"
  * 修改src/index.html文件，[以外部依赖的方式引入zone.js](https://github.com/un44444444/qiankun-antd-pro-angular/commit/32d3c7fa5060c70fd77427673bdc8e600fe1c783#r40810178)
* 修改框架布局，兼容支持独立运行以及子应用在qiankun环境下隐藏头部以及侧边栏
  * 修改src/app/layout/default/default.component.ts, [增加条件变量来标识是否作为qiankuan环境子应用](https://github.com/un44444444/qiankun-antd-pro-angular/commit/cdf6c71e4e15d73e1e2cd2cb5a8efd8c450c7ced#r40810355)
  * 修改src/app/layout/default/default.component.html, [通过条件变量来控制头部以及侧边栏的显示和隐藏](https://github.com/un44444444/qiankun-antd-pro-angular/commit/cdf6c71e4e15d73e1e2cd2cb5a8efd8c450c7ced#r40810396)
  * 以上方法比较简易。除此之外，还可以通过“动态组件”方式来控制布局上展示哪些组件内容。
