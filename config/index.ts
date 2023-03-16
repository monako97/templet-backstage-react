import type { PartialConfigType } from 'PackageNameByCore';

const conf: PartialConfigType = {
  publicPath: '/',
  layoutSider: {
    theme: 'dark',
  },
  assetHtml: [
    {
      // 自动加入 public 文件夹下 满足 *.entry.js 的文件
      glob: './public/*.entry.js',
    },
  ],
  fallbackCompPath: '@/components/fallback',
  importOnDemand: {
    'neko-ui': {
      transform: 'neko-ui/es/${member}',
      memberTransformers: ['dashed_case'],
    },
    lodash: {
      transform: 'lodash/${member}',
    },
  },
  proxy: [
    {
      context: ['/api/'],
      target: 'http://127.0.0.1:8001/',
      changeOrigin: true,
      pathRewrite: { '^/api/': '/' },
      secure: false,
    }
  ] as unknown as PartialConfigType['proxy'],
};

export default conf;
