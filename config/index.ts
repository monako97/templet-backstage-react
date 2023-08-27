import type { ConfigType } from 'PackageNameByCore';

const conf: Partial<ConfigType> = {
  assetHtml: [
    {
      // 自动加入 public 文件夹下 满足 *.entry.js 的文件
      glob: './public/*.entry.js',
    },
  ],
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
