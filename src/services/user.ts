import { type GenericResponse, request } from '@moneko/request';

import type { UserInfo } from '@/store/account';

export type LoginParams = {
  username?: string;
  email?: string;
  password: string;
};

// 用户名登录
export const loginByUserName = async (params: LoginParams) =>
  request<GenericResponse<UserInfo>>('/login_by_username', {
    data: params,
    method: 'POST',
  });
// email登录
export const loginByEmail = async (params: LoginParams) =>
  request<GenericResponse<UserInfo>>('/login_by_email', {
    data: params,
    method: 'POST',
  });

export type ForgotPassWordParams = LoginParams & {
  verify_code: string;
  email: string;
};

// 修改密码
export const changePassword = async (params: ForgotPassWordParams) =>
  request<GenericResponse<boolean>>('/forget_password', {
    data: params,
    method: 'POST',
  });
// 获取验证码
export const getForgetVerifyCode = async (email: string) =>
  request<GenericResponse<boolean>>('/forget_pwd_verify_code', { method: 'POST', data: { email } });
