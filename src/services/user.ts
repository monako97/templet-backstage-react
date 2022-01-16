import { request } from 'plugin-runtime';
import type { UserInfo } from '@/models/user';

interface LoginResponse {
  status: number;
  message: string;
  result: UserInfo;
}

export type LoginByUserNameParams = {
  username: string;
  password: string;
};
export type LoginByEmailParams = {
  email: string;
  password: string;
};

export type ForgotPassWordParams = {
  email: string;
  password: string;
  verify_code: string;
};

// 用户名登录
export const loginByUserName = async ({
  username,
  password,
}: LoginByUserNameParams): Promise<LoginResponse> => {
  return request('/api/login_by_username', {
    data: {
      username,
      password,
    },
    method: 'POST',
  });
};
