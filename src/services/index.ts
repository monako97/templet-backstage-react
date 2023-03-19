import { extend, type ResponseBody } from 'PackageNameByRequest';
export { request, type ResponseBody } from 'PackageNameByRequest';

extend({
  interceptor: {
    response: (resp: ResponseBody) => {
      // 假定 401 表示的是用户登录状态失效, 那么在这里执行登出账号操作, 或者开启登录弹窗
      if (resp.status === 401) {
        // logout();
      }
      return resp;
    },
  },
  prefixUrl: '/api',
});
