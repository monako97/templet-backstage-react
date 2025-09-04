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
  /** 虚拟模块 */
  virtualModule: {
    /**
     * 创建一个安全模块
     * 可以用来存放一些需要加密处理的密钥
     * @example
     * import { PUBLIC_KEY } from '@app/security';
     * console.log(PUBLIC_KEY);
     */
    '@app/security': {
      /** 公钥 */
      PUBLIC_KEY: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCS701BrXHlWB9tDgZpJ',
      /** 私钥 */
      PRIVATE_KEY:
        'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAJLvTUGtceVYH20OBmkn601zRTD0cJlTaUQ4',
    },
  },
  // 路由懒加载发生时使用的 fallback
  fallbackCompPath: '@/components/fallback',
};

export default conf;
