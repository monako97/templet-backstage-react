import { extend } from 'PackageNameByRequest';
import type { ResponseBody } from 'PackageNameByRequest';
export { request, ResponseBody } from 'PackageNameByRequest';

extend({
  interceptor: {
    response: (resp: ResponseBody) => resp,
  },
  prefixUrl: '/api',
});
