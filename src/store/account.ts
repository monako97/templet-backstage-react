import { isFunction, persistence } from 'PackageNameByCommon';
import { sso } from 'PackageNameByCore';
import type { ResponseBody } from '@/services';
import {
  loginByEmail,
  loginByUserName,
  changePassword,
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
type Callback<V> = (resp: ResponseBody<V>) => void;
/** 数据持久化key */
export const accountPersistenceKey = 'account.info';
export const account = sso({
  /** 用户信息, 默认值：读取持久化数据 */
  info: persistence.load<UserInfo | null>(accountPersistenceKey, null),
  /** 登出账号
   * @constructor
   */
  logout() {
    localStorage.clear();
    account.info = null;
    global.isLogin = false;
  },
  async loginUsername(data: LoginByUserNameParams, callback: Callback<UserInfo>) {
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
  async loginEmail(data: LoginByEmailParams, callback: Callback<UserInfo>) {
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
  async forgetPassword(data: ForgotPassWordParams, callback: Callback<boolean>) {
    const resp = await changePassword(data);

    if (isFunction(callback)) {
      callback(resp);
      return;
    }
  },
  async fetchForgetVerifyCode(data: Record<string, string>, callback: Callback<boolean>) {
    const resp = await getForgetVerifyCode(data);

    if (isFunction(callback)) {
      callback(resp);
      return;
    }
  },
});
