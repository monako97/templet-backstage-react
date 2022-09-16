import React from 'react';
import { Navigate } from 'PackageNameByCore';
import type { RouterProps } from 'PackageNameByCore';
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
        element: React.createElement(Navigate, {
          to: '/login',
          replace: true,
        }),
      },
      {
        path: 'home',
        icon: React.createElement(Icon, { type: 'home-nav' }),
      },
      {
        path: 'dynamic',
        hideMenu: true,
      },
      {
        path: 'micro',
        icon: React.createElement(Icon, { type: 'about' }),
        children: [
          {
            path: 'home',
            children: [
              {
                path: 'dynamic',
                hideMenu: true,
                children: [
                  {
                    path: ':id',
                    children: [
                      {
                        path: ':name',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            path: 'dynamic',
            hideMenu: true,
            children: [
              {
                path: ':id',
                children: [
                  {
                    path: ':name',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: '*',
        element: React.createElement(Navigate, {
          to: '/home',
          replace: true,
        }),
      },
    ],
  },
] as unknown as RouterProps;

export default routers;
