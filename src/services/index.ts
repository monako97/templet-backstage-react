import { extend, type ResponseBody } from 'PackageNameByRequest';
export { request, type ResponseBody } from 'PackageNameByRequest';

extend({
  interceptor: {
    response: (resp: ResponseBody) => resp,
  },
  prefixUrl: '/api',
});
