import type { ConfigType } from 'PackageNameByCore';

const conf: Partial<ConfigType> = {
  copy: {
    dirs: ['public']
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
  proxy: [
    {
      context: ['/api/'],
      target: 'http://127.0.0.1:8001/',
      changeOrigin: true,
      pathRewrite: { '^/api/': '/' },
      secure: false,
    },
  ],
};

export default conf;
