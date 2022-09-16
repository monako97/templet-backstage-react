import { loginByUserName } from '@/services/user';
import { isFunction } from 'lodash';
import type { ModelType, ModelActionType, ModelEffectMap } from 'PackageNameByCore';
import type { ResponseBody } from 'PackageNameByRequest';

export interface UserInfo {
  address?: string;
  avatar?: string;
  birthday?: number;
  code?: string;
  comment?: string;
  create_time?: number;
  email?: string;
  id: number;
  last_active_ip?: string;
  last_active_time?: number;
  password?: string;
  phone?: string;
  status?: number;
  update_time?: number;
  description?: string;
  username: string;
}

export type UserModelType = {
  info?: UserInfo;
};

const model: ModelType<UserModelType> = {
  namespace: 'account',
  state: {},
  effects: {
    // 用户登录
    *login(
      { payload }: Partial<ModelActionType>,
      { call, put }: ModelEffectMap
    ): Generator<unknown, void, ResponseBody> {
      const { type, data } = payload;
      const api = type === 'email' ? loginByUserName : loginByUserName;
      const resp: ResponseBody = yield call(() => api(data));

      if (isFunction(payload.callback)) {
        payload.callback(resp);
      }
      yield put({
        type: 'account/saveUserInfo',
        payload: resp.result,
      });
    },
    *logout(
      _: Partial<ModelActionType>,
      { put }: ModelEffectMap
    ): Generator<unknown, void, ResponseBody> {
      sessionStorage.clear();
      localStorage.clear();
      yield put({
        type: 'account/reset',
      });
    },
  },
  reducers: {
    saveUserInfo(state: UserModelType, action: ModelActionType): UserModelType {
      return { ...state, info: action.payload };
    },
    change(state: UserModelType, action: ModelActionType): UserModelType {
      return { ...state, ...action.payload };
    },
    reset(): UserModelType {
      return {};
    },
  },
};

export default model;
