import React, { useCallback, useState } from 'react';
import { Link, localizable, translatFunction } 'PackageNameByCore';
import { Form, Input, Button, Checkbox } from 'antd';
import styles from './index.less';
import type { LoginByEmailParams, LoginByUserNameParams } from '@/services/user';
import Email, { isEmail } from '@/components/email';
import Icon from '@/components/icon';
import InputPassword from '@/components/input-password';
import { account } from '@/store';

const USERNAME_RegExp = /^([a-zA-Z0-9\\_\\-\\.]|[\u4E00-\u9FA5]){2,10}$/;

export type LoginType = 'email' | 'username';

export interface LoginFormProps {
  type: LoginType;
}

const { Item } = Form;

const LoginForm: React.FC<LoginFormProps> = ({ type }: LoginFormProps) => {
  const { t } = localizable;
  const [loading, setLoading] = useState(false);
  const onFinish = useCallback(
    (data: LoginByUserNameParams | LoginByEmailParams) => {
      setLoading(true);
      if (type === 'email') {
        account.loginEmail(data as LoginByEmailParams, () => setLoading(false));
      } else {
        account.loginUsername(data as LoginByUserNameParams, () => setLoading(false));
      }
    },
    [type]
  );

  return (
    <Form
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      layout="vertical"
      autoComplete="off"
      requiredMark={false}
      className={styles.form}
    >
      {type === 'username' && (
        <Item
          name="username"
          label={t.username}
          rules={[
            { required: true },
            () => ({
              validator(_rule, value) {
                if (USERNAME_RegExp.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(translatFunction(t['ph:len-range'], '4-10'));
              },
            }),
          ]}
          hasFeedback
        >
          <Input prefix={<Icon type="username" />} placeholder={t['ph:username']} />
        </Item>
      )}
      {type === 'email' && (
        <Item
          name="email"
          label={t.email}
          rules={[
            { required: true },
            () => ({
              validator(_rule, value) {
                if (isEmail(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(t['ph:validator-email']);
              },
            }),
          ]}
          hasFeedback
        >
          <Email placeholder={t['ph:email']} />
        </Item>
      )}
      <Item name="password" label={t.password} rules={[{ required: true }]} hasFeedback>
        <InputPassword />
      </Item>
      <Item>
        <Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>{t.remember}</Checkbox>
        </Item>
        <Link className={styles.loginFormForgot} to="/forgot-password">
          {t['route-forgot-password']}
        </Link>
      </Item>
      <Button
        type="primary"
        htmlType="submit"
        className={styles.loginFormButton}
        loading={loading}
        icon={<Icon type="login" />}
      >
        {t['sign-in']}
      </Button>
    </Form>
  );
};

export default LoginForm;
