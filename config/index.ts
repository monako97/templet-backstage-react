import type { ConfigType } from 'PackageNameByCore';

const conf: Partial<ConfigType> = {
  htmlPluginOption: {
    meta: {
      'theme-color': '#001529',
    },
    tags: [
      { tag: 'script', src: 'micro.entry.js', defer: false },
      { tag: 'script', src: 'micro-rule.entry.js', defer: false },
    ],
  },
  copy: {
    dirs: ['public'],
  },
  fallbackCompPath: '@/components/fallback',
  importOnDemand: {
    '@moneko/common': {
      transform: 'lib/${member}',
    },
    lodash: {
      transform: '${member}',
    },
  },
};

export default conf;
