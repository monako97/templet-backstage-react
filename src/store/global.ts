import routes from '@app/routes';
import { isFunction, persistence } from '@moneko/common';
import sso from 'shared-store-object';

import { type MenuItem, setMenu } from './menu';

import '@/services';

/** 持久化数据key */
const isLoginPersistenceKey = 'isLogin';
const themePersistenceKey = 'theme';

export const global = sso({
  /** 是否已登录用户, 默认值：读取持久化数据 */
  isLogin: persistence.load(isLoginPersistenceKey, false),
  theme: persistence.load<'light' | 'dark'>(themePersistenceKey, 'dark'),
  /** 请求菜单数据
   * @param {Void} callback 成功回调
   * @constructor
   */
  async fetchMenu(callback: (menus: MenuItem[]) => void) {
    if (!global.isLogin) return;

    const localMenus = (routes[0].children || []).reduce((acc: MenuItem[], item) => {
      if (!item.key?.includes('/')) {
        acc.push({
          hideMenu: item.hideMenu,
          hideTabs: item.hideTabs,
          key: item.key!,
          path: item.path,
          icon: item.icon,
          dynamicTitle: item.dynamicTitle,
          closable: item.closable,
          children: item.children as MenuItem[],
        });
      }
      return acc;
    }, []);

    setMenu(localMenus);
    if (isFunction(callback)) {
      callback(localMenus);
      return;
    }
  },
});

// 持久化存储
type GlobalShared = typeof global;
// 拦截变更进行持久化存储
global(() => {
  return {
    next(iteration: VoidFunction, key: keyof GlobalShared, data: GlobalShared) {
      if (key === 'isLogin') {
        persistence.set(isLoginPersistenceKey, data[key]);
      }
      if (key === 'theme') {
        persistence.set(themePersistenceKey, data[key]);
      }
      iteration();
    },
  };
});
