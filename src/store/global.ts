import { isFunction, persistence } from "PackageNameByCommon";
import { sso, type MenuItem, router, setMenu } from "PackageNameByCore";

/** 持久化数据key */
export const globalPersistenceKey = 'global.isLogin';
export const global = sso({
  /** 是否已登录用户, 默认值：读取持久化数据 */
  isLogin: persistence.load(globalPersistenceKey, false),
  /** 请求菜单数据
   * @param {Void} callback 成功回调
   * @constructor
   */
  async fetchMenu(callback: () => void) {
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

    setMenu(localMenus);
    if (isFunction(callback)) {
      callback(localMenus);
      return;
    }
  },
});
