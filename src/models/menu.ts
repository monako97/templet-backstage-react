import { router } from 'plugin-runtime';
import type { ModelActionType, ModelEffectMap, ModelType } from 'plugin-runtime';

const defaultMenu = [
  {
    key: 'home',
    path: '/home',
    i18n: '首页',
    hideMenu: true,
    closable: false,
  },
];

const localMenus =
  router[0].children
    ?.filter((item) => !item.key.includes('*'))
    .map((item) => {
      return {
        alive: item.alive,
        hideMenu: item.hideMenu,
        i18n: item.i18n,
        key: item.key,
        path: item.path,
        icon: item.icon,
        closable: item.closable,
      };
    }) || [];

const model: ModelType<Record<string, string>> = {
  namespace: 'menu',
  state: {},
  reducers: {},
  effects: {
    *init(_: Partial<ModelActionType>, { put }: ModelEffectMap): Generator<unknown, void> {
      yield put({
        type: 'appProgram/setMenu',
        payload: [...defaultMenu, ...localMenus],
      });
    },
  },
};

export default model;
