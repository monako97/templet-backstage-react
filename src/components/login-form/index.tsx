/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import styles from './index.less';
import { useNavigate, useLocale, translatFunction } from 'plugin-runtime';
import { isFunction } from 'lodash';
import { isEmail } from '@/utils';
import Icon from '@/components/icon';
import Email from '@/components/email';
import InputPassword from '@/components/input-password';
import type { LoginByEmailParams, LoginByUserNameParams } from '@/services/user';

const USERNAME_RegExp = /^([a-zA-Z0-9\\_\\-\\.]|[\u4E00-\u9FA5]){2,10}$/;

interface LoginFormProps {
  type: 'email' | 'username';
  onSubmit: (
    values: LoginByUserNameParams | LoginByEmailParams,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
}
const { Item } = Form;

const LoginForm: React.FC<LoginFormProps> = ({ type, onSubmit }: LoginFormProps) => {
  const { getLanguage } = useLocale();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onFinish = (values: LoginByUserNameParams | LoginByEmailParams) => {
    if (isFunction(onSubmit)) {
      onSubmit(values, setLoading);
    }
  };

  return (
    <Form
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      layout="vertical"
      autoComplete="off"
      requiredMark={false}
    >
      {type === 'username' && (
        <Item
          name="username"
          label={getLanguage('username')}
          rules={[
            { required: true },
            () => ({
              validator(_rule, value) {
                if (USERNAME_RegExp.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(translatFunction(getLanguage('ph:len-range'), '4-10'));
              }
            })
          ]}
          hasFeedback
        >
          <Input prefix={<Icon type="username" />} placeholder={getLanguage('ph:username')} />
        </Item>
      )}
      {type === 'email' && (
        <Item
          name="email"
          label={getLanguage('email')}
          rules={[
            { required: true },
            () => ({
              validator(_rule, value) {
                if (isEmail(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(getLanguage('ph:validator-email'));
              }
            })
          ]}
          hasFeedback
        >
          <Email placeholder={getLanguage('ph:email')} />
        </Item>
      )}
      <Item
        name="password"
        label={getLanguage('password')}
        rules={[{ required: true }]}
        hasFeedback
      >
        <InputPassword />
      </Item>
      <Item>
        <Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>{getLanguage('remember')}</Checkbox>
        </Item>
        <Button
          className={styles.loginFormForgot}
          type="link"
          onClick={() => {
            navigate('/forgot-password');
          }}
        >
          {getLanguage('route-forgot-password')}
        </Button>
      </Item>

      <Item>
        <Button
          type="primary"
          htmlType="submit"
          className={styles.loginFormButton}
          loading={loading}
          icon={<Icon type="login" />}
        >
          {getLanguage('sign-in')}
        </Button>
      </Item>
    </Form>
  );
};

export default LoginForm;
