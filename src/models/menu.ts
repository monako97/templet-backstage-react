import { router } from 'PackageNameByCore';
import { isFunction } from 'lodash';
import type { ModelActionType, ModelEffectMap, ModelType } from 'PackageNameByCore';
import type { ResponseBody } from 'PackageNameByRequest';

const localMenus =
  router[0].children
    ?.filter((item) => !item.key.includes('*'))
    .map((item) => {
      return {
        id: item.id,
        parentId: item.parentId,
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
    }) || [];

const model: ModelType<Record<string, string>> = {
  namespace: 'menu',
  state: {},
  reducers: {},
  effects: {
    *init(_: Partial<ModelActionType>, { put }: ModelEffectMap): Generator<unknown, void> {
      yield put({
        type: 'appProgram/setMenu',
        payload: [],
      });
    },
    *fetch(
      { payload }: Partial<ModelActionType>,
      { put, select }: ModelEffectMap
    ): Generator<unknown, void, ResponseBody<MenuType[]>> {
      const isLogin = yield select((store: AppStore) => !!store.account.info);

      if (!isLogin) return;
      yield put({
        type: 'appProgram/setMenu',
        payload: [...localMenus],
      });
      if (isFunction(payload?.callback)) {
        payload.callback();
      }
    },
  },
};

export default model;
