import type { ReactNode } from 'react';
import type { RouteConfig } from 'app:routes';
import { isEqual, isFunction, persistence } from '@moneko/common';
import sso from 'shared-store-object';

export type CloseTab = 'left' | 'right' | 'other' | 'self';
export interface TabItem extends Omit<RouteConfig, 'path'> {
  key: string;
  path?: string;
  url?: string;
  closable?: boolean;
  label?: ReactNode;
  dynamicTitle?: string;
}
export interface MenuItem extends RouteConfig {
  key: string;
  type?: string;
  disabled?: boolean;
  itemIcon?: ReactNode;
  children?: MenuItem[];
}

type ClosedCallback = (closes?: TabItem[], next?: TabItem) => void;

const activeKeyPersistenceKey = 'menu.activeKey';
const expandKeyPersistenceKey = 'menu.expandKey';

/** Menu Store */
export const menu = sso({
  /** 当前菜单 */
  activeKey: persistence.load(activeKeyPersistenceKey, 'home'),
  /** 展开菜单的key[] */
  expandKey: persistence.load(expandKeyPersistenceKey, [] as string[]),
  getExpandKey() {
    return this.expandKey;
  },
  /** 当前用户可访问的菜单列表 */
  menus: persistence.load('menu.menus', [] as MenuItem[]),
  /** 菜单列表的kv数据, 根据menus自动生成 */
  kv: persistence.load('menu.kv', {} as Record<string, MenuItem>),
  /** 选项卡数据 */
  tabs: persistence.load('menu.tabs', [
    { key: 'home', path: '/home', closable: false, icon: 'icon-home-nav' },
  ] as TabItem[]),
});

// 持久化存储
type MenuShared = typeof menu;
// 拦截变更进行持久化存储
menu(() => {
  return {
    next(iteration: VoidFunction, key: keyof MenuShared, data: MenuShared) {
      switch (key) {
        case 'activeKey':
          persistence.set(activeKeyPersistenceKey, data[key]);
          break;
        case 'expandKey':
          persistence.set(expandKeyPersistenceKey, data[key]);
          break;
        default:
          break;
      }
      iteration();
    },
  };
});

const getItems = (arr: MenuItem[], result: MenuItem[] = []): MenuItem[] => {
  if (arr.length === 0) {
    return result;
  }
  const { children = [], label, hideMenu, ...args } = arr[0];
  const item: MenuItem = Object.create(null);

  // eslint-disable-next-line no-undefined
  Object.assign(item, args, { label: label, props: undefined, element: undefined });
  if (children.length) {
    item.children = getItems(children);
  }
  if (!hideMenu) {
    result.push(item);
  }
  return getItems(arr.slice(1), result);
};
const getMenuKV = (arr: MenuItem[], obj: Record<string, MenuItem>, pid?: string): void => {
  for (const item of arr) {
    const { children, ...args } = item;
    const id = [pid, item.path].filter(Boolean).join('/');

    obj[id] = {
      label: id,
      ...args,
      key: id,
    };
    if (children?.length) {
      getMenuKV(children, obj, id);
    }
  }
};

/** 设置菜单列表
 * @param {MenuItem[]} data 菜单数据
 * @constructor
 */
export function setMenu(data: MenuItem[]) {
  const items = getItems(data),
    kv: Record<string, MenuItem> = {};

  getMenuKV(items, kv);
  menu.menus = items;
  menu.kv = kv;
}
/** 添加工作台选项卡
 * @param {TabItem} tab 选项卡
 * @constructor
 */
export function addTab(tab: TabItem) {
  const current = menu.kv[tab.key];

  if (current && !menu.tabs.find((item) => item.key === tab.key)) {
    const ntabs: TabItem[] = [
      ...menu.tabs,
      {
        ...current,
        ...tab,
      },
    ];

    if (!isEqual(ntabs, menu.tabs)) {
      menu.tabs = ntabs;
    }
  }
}
/** 打开工作台选项卡
 * @param {TabItem} tab 选项卡
 * @constructor
 */
export function openTab(tab: TabItem) {
  menu.activeKey = tab.key;
  addTab(tab);
}
/** 关闭工作台选项卡
 * @param {string} key 选项卡key
 * @param {CloseTab} type 操作类型，如何关闭
 * @param {ClosedCallback} callback 回调函数
 * @constructor
 */
export function closeTab(key: string, type: CloseTab = 'self', callback: ClosedCallback) {
  if (!key) return;
  const { tabs, activeKey } = menu;
  let nActiveKey = activeKey;
  const closeTabs: TabItem[] = [];
  const nTabs: TabItem[] = [];
  let nextTab: TabItem | undefined;
  // 关闭当前tab
  const isCloseSelf = type === 'self';
  const idx = tabs.findIndex((tab) => tab.key === key);
  const isNotClose = (item: TabItem, i: number) => {
    return (
      item.closable === false ||
      {
        left: i >= idx,
        right: i <= idx,
        other: i === idx,
        self: key !== item.key,
      }[type]
    );
  };

  for (let i = 0, len = tabs.length; i < len; i++) {
    const item = tabs[i];
    const notClose = isNotClose(item, i);

    if (isCloseSelf) {
      if (!notClose) {
        if (key === nActiveKey) {
          const adx: number | null = i ? i - 1 : i + 1;

          if (tabs[adx]) {
            nActiveKey = tabs[adx].key;
            nextTab = tabs[adx];
          }
        }
      }
    } else if (notClose && item.key === key && nActiveKey !== key) {
      nActiveKey = key;
      nextTab = item;
    }
    if (!notClose) {
      closeTabs.push(item);
    }
    if (notClose) {
      nTabs.push(item);
    }
  }

  menu.tabs = nTabs;
  menu.activeKey = nActiveKey;
  if (isFunction(callback)) {
    callback(closeTabs, nextTab);
    return;
  }
}
/** 展开菜单
 * @param {string} keys 展开菜单的key[]
 * @returns {void}
 */
export function expandMenu(keys: string[]): void {
  if (!isEqual(keys, menu.expandKey)) {
    menu.expandKey = keys;
  }
}
export default menu;
