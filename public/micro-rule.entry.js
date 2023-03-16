let currentEnv = window.__MicroAppEntry__;

window.__MicroAppActiveRule__ = [
  {
    desc: '日志查询',
    name: 'log',
    url: `${currentEnv['app-one']}`,
    basename: '/app-one',
    activeRule: [
      '/home',
      '/home/dynamic/:id',
      '/home/dynamic/:id/:name',
      '/dynamic',
      '/dynamic/:id',
      '/dynamic/:id/:name',
    ],
  },
];
