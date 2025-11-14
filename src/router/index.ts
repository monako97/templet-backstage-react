import { lazy, type RouteConfig } from 'app:routes';

const routers: RouteConfig[] = [
  {
    path: '/',
    root: true,
    element: lazy(() => import('@/app')),
    children: [
      {
        path: 'login',
        hideMenu: true,
      },
      {
        path: 'forgot-password',
        // 不显示在菜单中
        hideMenu: true,
      },
      {
        path: 'home',
        // 不允许关闭
        icon: 'icon-home-nav',
        closable: false,
      },
      {
        path: 'about',
        icon: 'icon-zh_CN',
      },
      {
        path: 'app-one',
        icon: 'icon-about',
        children: [
          {
            path: 'home',
            icon: 'icon-home-nav',
          },
          {
            path: 'dynamic/:id',
            icon: 'icon-about',
          },
        ],
      },
      {
        path: 'refresh',
        // 不显示在tabs中
        hideTabs: true,
        hideMenu: true,
      },
    ],
  },
];

export default routers;
