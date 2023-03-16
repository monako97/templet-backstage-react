import { isFunction } from 'PackageNameByCommon';
import { sso } from 'PackageNameByCore';
import type { ResponseBody } from '@/services';
import {
  loginByEmail,
  loginByUserName,
  forgetPassword,
  getForgetVerifyCode,
  type ForgotPassWordParams,
  type LoginByEmailParams,
  type LoginByUserNameParams,
} from '@/services/user';
import { global } from '@/store';

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

// eslint-disable-next-line no-unused-vars
export type Callback<V> = (resp: ResponseBody<V>) => void;

export const account = sso({
  /** 用户信息 */
  info: null as UserInfo | null,
  /** 登出账号
   * @constructor
   */
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    account.info = null;
    global.isLogin = false;
  },
  loginUsername: async (data: LoginByUserNameParams, callback: Callback<UserInfo>) => {
    const resp = await loginByUserName(data);

    if (resp.success) {
      account.info = resp.result;
      global.isLogin = true;
    }
    if (isFunction(callback)) {
      callback(resp);
      return;
    }
  },
  loginEmail: async (data: LoginByEmailParams, callback: Callback<UserInfo>) => {
    const resp = await loginByEmail(data);

    if (resp.success) {
      account.info = resp.result;
      global.isLogin = true;
    }
    if (isFunction(callback)) {
      callback(resp);
      return;
    }
  },
  forgetPassword: async (data: ForgotPassWordParams, callback: Callback<boolean>) => {
    const resp = await forgetPassword(data);

    if (isFunction(callback)) {
      callback(resp);
      return;
    }
  },
  fetchForgetVerifyCode: async (data: Record<string, string>, callback: Callback<boolean>) => {
    const resp = await getForgetVerifyCode(data);

    if (isFunction(callback)) {
      callback(resp);
      return;
    }
  },
});
