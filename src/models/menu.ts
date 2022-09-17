import React from 'react';
import { router } from 'PackageNameByCore';
import { isFunction } from 'lodash';
import Icon from '@/components/icon';
import type { ModelActionType, ModelEffectMap, ModelType } from 'PackageNameByCore';
import type { ResponseBody } from 'PackageNameByRequest';

const getMenu = (list: ItemTypes[] = [], pid?: string): ItemTypes[] => {
  return list
    .map((item) => {
      const _item: ItemTypes = {
        id: item.id,
        parentId: pid,
        alive: item.alive,
        hideMenu: item.hideMenu,
        hideTabs: item.hideTabs,
        i18n: item.i18n,
        key: item.key,
        path: item.path,
        icon: item.icon,
        dynamicTitle: item.dynamicTitle,
        closable: item.closable,
        isEnable: item.isEnable,
      };

      if (item.icon) {
        Object.assign(_item, {
          icon: React.createElement(Icon, {
            type: item.icon,
          }),
        });
      }
      if (Array.isArray(item.children)) {
        Object.assign(_item, {
          children: getMenu(item.children, _item.key),
        });
      }

      return _item;
    })
    .filter((item) => item.isEnable);
};

const defaultMenu = getMenu([
  {
    key: 'home',
    path: '/home',
    i18n: '首页',
    icon: 'home-nav',
    hideMenu: true,
    isEnable: true,
    closable: false,
  },
]);

const model: ModelType<Record<string, string>> = {
  namespace: 'menu',
  state: {},
  reducers: {},
  effects: {
    *init(_: Partial<ModelActionType>, { put }: ModelEffectMap): Generator<unknown, void> {
      yield put({
        type: 'appProgram/setMenu',
        payload: [...defaultMenu],
      });
    },
    *fetch(
      { payload }: Partial<ModelActionType>,
      { put, select }: ModelEffectMap
    ): Generator<unknown, void, ResponseBody<MenuType[]>> {
      const isLogin = yield select((store: AppStore) => !!store.account.info);

      if (!isLogin) return;
      const localMenus = getMenu(router[0].children?.filter((item) => !item.key.includes('*')) || []);

      yield put({
        type: 'appProgram/setMenu',
        payload: [...defaultMenu, ...localMenus],
      });
      if (isFunction(payload?.callback)) {
        payload.callback();
      }
    },
  },
};

export default model;
