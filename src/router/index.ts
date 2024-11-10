import { lazy, type RouteConfig } from '@app/routes';
import { Navigate } from '@moneko/react';

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
        hideMenu: true,
      },
      {
        path: 'home',
        closable: false,
        icon: 'icon-home-nav',
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
        hideTabs: true,
        hideMenu: true,
      },
      ...Array.from({ length: 20 }, (_, i) => ({
        path: `forgot-${i + 1}`,
        icon: 'icon-password',
      })),
      {
        path: '',
        hideTabs: true,
        hideMenu: true,
        element: Navigate,
        metadata: {
          to: '/home?menuId=home',
          replace: true,
        },
      },
    ],
  },
];

export default routers;
