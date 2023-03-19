import { Navigate, type RouterProps } from 'PackageNameByCore';

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
      {
        path: '',
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
