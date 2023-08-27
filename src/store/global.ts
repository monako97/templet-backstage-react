import routes from '@app/routes';
import { isFunction, persistence } from '@moneko/common';
import sso from 'shared-store-object';
import { type MenuItem, setMenu } from './menu';

/** 持久化数据key */
export const globalPersistenceKey = 'global.isLogin';
export const global = sso({
  /** 是否已登录用户, 默认值：读取持久化数据 */
  isLogin: persistence.load(globalPersistenceKey, false),
  /** 请求菜单数据
   * @param {Void} callback 成功回调
   * @constructor
   */
  async fetchMenu(callback: (menus: MenuItem[]) => void) {
    if (!global.isLogin) return;

    const localMenus = (routes[0].children || []).reduce((acc: MenuItem[], item) => {
      if (!item.key?.includes('/')) {
        acc.push({
          alive: item.alive,
          hideMenu: item.hideMenu,
          hideTabs: item.hideTabs,
          i18n: item.i18n,
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
