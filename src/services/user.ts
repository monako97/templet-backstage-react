import { type ResponseBody, request } from '@/services';
import { type UserInfo } from '@/store/account';

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
export const loginByUserName = async (params: LoginByUserNameParams) =>
  request<ResponseBody<UserInfo>>('/login_by_username', {
    data: params,
    method: 'POST',
  });
// email登录
export const loginByEmail = async (params: LoginByEmailParams) =>
  request<ResponseBody<UserInfo>>('/login_by_email', {
    data: params,
    method: 'POST',
  });
// 修改密码
export const changePassword = async (params: LoginByEmailParams) =>
  request<ResponseBody<boolean>>('/change-password', {
    data: params,
    method: 'POST',
  });
// 获取验证码
export const getForgetVerifyCode = async (data: Record<string, string>) =>
  request<ResponseBody<boolean>>('/forget-verify-code', { data });
