import { PUBLIC_KEY, PRIVATE_KEY } from '@app/security'; // 密钥使用虚拟模块
import { extend } from '@moneko/request';
import { message } from 'antd';
// RSA 加密
import { Encrypt } from 'rsa-encrypt-long';

import { account } from '@/store/account';

const encrypt = new Encrypt({
  publicKey: PUBLIC_KEY,
  privateKey: PRIVATE_KEY,
});

/** 数据解密 */
export const decrypt = (string: string): string | false => {
  const decryptString = encrypt.decryptLong(string);

  return decryptString ? decodeURIComponent(decryptString) : false;
};

extend({
  // 配置拦截器
  interceptor: {
    request(req) {
      if (req.method === 'POST') {
        // 在请求发送前对请求数据统一拦截进行RSA加密(视业务情况调整)
        const encryptString = encrypt.encryptLong(JSON.stringify(req.data));

        req.data = encryptString ? encodeURIComponent(encryptString) : false;
      }
      return req;
    },
    httpError(xhr) {
      // 请求失败时进行统一处理
      message.error(xhr.response?.message || `${xhr.status}: ${xhr.statusText}`);
      if (xhr.response?.status === 401) {
        account.logout();
      }
      return;
    },
  },
  // 添加公共前缀
  prefixUrl: '/api',
});
