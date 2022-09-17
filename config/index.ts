import type { PartialConfigType } from 'PackageNameByCore';

const conf: PartialConfigType = {
  modifyVars: {},
  miniIdc: false,
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
    antd: ['[source]/es/[name:-]', '[source]/es/[name:-]/style'],
    lodash: '[source]/[name]',
    '@ant-design/icons': {
        transform: ({ name, source }) => {
            if (name === 'createFromIconfontCN') {
                return `${source}/es/components/IconFont`;
            }
            return `${source}/es/icons/${name}`;
        },
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
