const Router = [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },

  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './ListTableList',
  },

  // 配置微应用 app1 关联的路由
  {
    name: 'subapp1',
    icon: 'notification',
    path: '/app-esl',
    routes: [
      {
        name: 'page1',
        icon: 'notification',
        path: '/app-esl/welcome',
        microApp: 'app-esl',
      },
      {
        name: 'page2',
        icon: 'area-chart',
        // path: '/app-esl/admin/sub-page',
        path: '/app-esl/list',
        microApp: 'app-esl',
      },
    ],
  },
  // 配置微应用 app2 关联的路由
  {
    name: 'subapp2',
    icon: 'gift',
    path: '/angular9',
    microApp: 'app-angular',
  },

  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
export default Router;
