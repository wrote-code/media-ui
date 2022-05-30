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
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/welcome',
          },
          {
            path: '/welcome',
            name: 'welcome',
            icon: 'smile',
            component: './Welcome',
          },
          {
            path: '/resource',
            name: '资源管理',
            icon: 'smile',
            component: './Resource',
            routes: [
              {
                path: '/resource/index',
                name: '资源管理',
                icon: 'smile',
                component: './Resource',
              },
            ],
          },
          {
            path: '/site',
            name: '站点管理',
            icon: 'smile',
            component: './Site',
            routes: [
              {
                path: '/site/index',
                name: '站点管理',
                icon: 'smile',
                component: './Site',
              },
            ],
          },
          {
            path: '/author',
            name: '创作人员',
            icon: 'smile',
            component: './Author',
            routes: [
              {
                path: '/author/index',
                name: '作者管理',
                component: './Author',
                icon: 'simle',
              },
            ],
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
            name: 'list.table-list',
            icon: 'table',
            path: '/list',
            component: './ListTableList',
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
