import { createElement } from 'react';
import { Navigate, type RouterProps } from 'PackageNameByCore';
import Icon from '@/components/icon';

const routers = [
  {
    path: '*',
    root: true,
    children: [
      {
        path: 'login',
        onlyLogin: true,
      },
      {
        path: 'forgot-password',
        onlyLogin: true,
      },
      {
        path: '*',
        onlyLogin: true,
        element: Navigate,
        props: {
          to: '/login',
          replace: true,
        },
      },
      {
        path: 'home',
        closable: false,
        icon: createElement(Icon, { type: 'home-nav' }),
      },
      {
        path: 'app-one',
        icon: createElement(Icon, { type: 'about' }),
        children: [
          {
            path: 'home',
          },
          {
            path: 'dynamic/:id',
          },
        ],
      },
      {
        path: 'refresh',
        hideTabs: true,
        hideMenu: true,
        element: Navigate,
        props: {
          to: -1,
          replace: true,
        },
      },
      {
        path: 'login',
        hideTabs: true,
        hideMenu: true,
        element: Navigate,
        props: {
          to: '/home?menuId=home',
          replace: true,
        },
      },
    ],
  },
] as unknown as RouterProps;

export default routers;
