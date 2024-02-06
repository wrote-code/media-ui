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
        component: './Welcome',
        hideInMenu: true,
      },
      {
        path: '/resource',
        name: '资源',
        component: './Resource',
      },
      {
        path: '/site',
        name: '站点',
        component: './Site',
      },
      {
        path: '/author',
        name: '创作人员',
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
        component: './Admin',
        authority: ['admin'],
        routes: [
          {
            path: '/admin/sub-page',
            name: 'sub-page',
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
