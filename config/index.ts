import type { PartialConfigType } from 'plugin-runtime';
import { packageJson } from 'plugin-runtime/build/common';

const conf: PartialConfigType = {
  compiler: 'tsc',
  prefixCls: packageJson.name,
  modifyVars: {},
  miniIdc: false,
  layoutSider: {
    theme: 'dark',
  },
  importOnDemand: [],
  proxy: [],
  assetHtml: [
    {
      // 自动加入 public 文件夹下 满足 *.entry.js 的文件
      glob: './public/*.entry.js',
    },
  ],
  fallbackCompPath: '@/components/fallback',
};

export default conf;
