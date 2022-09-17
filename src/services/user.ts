import { request } from '@/services';
import type { ResponseBody } from '@/services';
import type { UserInfo } from '@/models/account';

export type LoginByUserNameParams = {
  username: string;
  password: string;
};
export type LoginByEmailParams = {
  email: string;
  password: string;
};

export type ForgotPassWordParams = LoginByEmailParams & {
  verify_code: string;
};

// 用户名登录
export const loginByUserName = async (
  params: LoginByUserNameParams
): Promise<ResponseBody<UserInfo>> =>
  request('/api/login_by_username', {
    data: params,
    method: 'POST',
  });
