import { isFunction } from 'PackageNameByCommon';
import { menu, sso, type MenuItem, router } from 'PackageNameByCore';

export const global = sso({
  /** 是否已登录用户 */
  isLogin: false,
  /** 请求菜单数据
   * @param {Void} callback 成功回调
   * @constructor
   */
  fetchMenu(callback: () => void) {
    if (!global.isLogin) return;

    const localMenus = (router[0].children || []).reduce((acc: MenuItem[], item) => {
      if (!item.key.includes('*')) {
        acc.push({
          alive: item.alive,
          hideMenu: item.hideMenu,
          hideTabs: item.hideTabs,
          i18n: item.i18n,
          key: item.key,
          path: item.path,
          icon: item.icon,
          dynamicTitle: item.dynamicTitle,
          closable: item.closable,
          children: item.children,
        });
      }
      return acc;
    }, []);

    menu.setMenu(localMenus);
    if (isFunction(callback)) {
      callback(localMenus);
      return;
    }
  },
});
