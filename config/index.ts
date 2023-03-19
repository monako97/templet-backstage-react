import type { PartialConfigType } from 'PackageNameByCore';

const conf: PartialConfigType = {
  publicPath: '/',
  layoutSider: {
    theme: 'dark',
  },
  iconfont: {
    scriptUrl: [
      '//at.alicdn.com/t/font_2632005_n3kt9cjpzn.js', // lang icon
      '//at.alicdn.com/t/font_2446726_525dowa25vp.js', // icon
    ],
  },
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
    'neko-ui': {
      transform: 'es/${member}',
      memberTransformers: ['dashed_case'],
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
    }
  ] as unknown as PartialConfigType['proxy'],
};

export default conf;
