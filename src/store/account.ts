import { persistence } from '@moneko/common';
import sso from 'shared-store-object';

import { loginByEmail, loginByUserName, type LoginParams } from '@/services/user';
import { global } from '@/store/global';

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

/** 数据持久化key */
export const accountPersistenceKey = 'account.info';
export const account = sso({
  /** 用户信息, 默认值：读取持久化数据 */
  info: persistence.load<UserInfo | undefined>(accountPersistenceKey, {} as UserInfo),
  /** 是否正在登录 */
  logining: false,
  /** 登出账号
   * @constructor
   */
  logout() {
    localStorage.clear();
    account.info = void 0;
    global.isLogin = false;
  },
  async login(data: LoginParams) {
    account.logining = true;
    const isEmail = !!data.email;

    try {
      const resp = await (isEmail ? loginByEmail : loginByUserName)(data);

      if (resp.status === 200) {
        account.info = resp.result;
        global.isLogin = true;
      }
    } catch {
      return void 0;
    }
    account.logining = false;
  },
});

// 持久化存储
type AccountShared = typeof account;
// 拦截变更进行持久化存储
account(() => {
  return {
    next(iteration: VoidFunction, key: keyof AccountShared, data: AccountShared) {
      if (key === 'info') {
        persistence.set(accountPersistenceKey, data[key]);
      }
      iteration();
    },
  };
});
