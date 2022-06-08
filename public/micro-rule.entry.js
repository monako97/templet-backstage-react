let currentEnv = window.__MicroAppEntry__;

window.__MicroAppActiveRule__ = [
  {
    desc: '日志查询',
    name: 'log',
    url: `${currentEnv['log']}#/`,
    activeRule: ['/#/log/list'],
  },
];
