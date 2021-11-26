export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/admin/entities',
    name: 'تیبل ها',
    icon: 'crown',
    access: 'canAdmin',
    component: './nestUi/Entities',
  },
  {
    exact: true,
    path: '/admin/entities/records/:name',
    name: 'داده ها',
    component: './nestUi/EntityRecords',
    hideInMenu: true,
  },
  {
    component: './404',
  },
];
