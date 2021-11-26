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
    component: './404',
  },
];
