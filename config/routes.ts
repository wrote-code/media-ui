export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    authority: ['admin', 'user'],
    routes: [
      {
        path: '/',
        redirect: '/resource',
      },
      {
        path: '/welcome',
        name: 'welcome',
        icon: 'smile',
        component: './Welcome',
        hideInMenu: true,
      },
      {
        path: '/resource',
        name: '资源管理',
        icon: 'smile',
        component: './Resource',
      },
      {
        path: '/site',
        name: '站点管理',
        icon: 'smile',
        component: './Site',
      },
      {
        path: '/author',
        name: '创作人员',
        icon: 'smile',
        component: './Author',
      },
      {
        path: '/album',
        name: '专辑',
        component: './album',
      },
      {
        path: '/admin',
        name: 'admin',
        icon: 'crown',
        component: './Admin',
        authority: ['admin'],
        routes: [
          {
            path: '/admin/sub-page',
            name: 'sub-page',
            icon: 'smile',
            component: './Welcome',
            authority: ['admin'],
          },
        ],
      },
      {
        path: '/release-note',
        component: './ReleaseNote',
      },
      {
        path: '/demo',
        component: './demo',
        hideInMenu: true,
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
  {
    component: './404',
  },
];
