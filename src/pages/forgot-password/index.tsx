import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import localizable, { interpolateString } from '@app/locales';
import { Button, Form, Input, message } from 'antd';
import * as styles from './index.less';
import type { ForgotPassWordParams } from '@/services/user';
import Email, { isEmail } from '@/components/email';
import IconFont from '@/components/iconfont';
import InputPassword from '@/components/input-password';
import { account } from '@/store/account';

const PASSWORD_RegExp = /^(\w){6,16}$/;
const { Item } = Form;

let getVCTimer: number | null,
  second = 60;
const ForgotPassword: React.FC = () => {
  const { t } = localizable;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [vcLoading, setVCLoading] = useState(false);
  const [getVC, setGetVC] = useState(false);
  const [percent, setPercent] = useState<number>(100);

  const onFinish = useCallback((values: ForgotPassWordParams) => {
    setLoading(true);
    account.forgetPassword(values, (resp) => {
      if (resp.success) {
        message.success(resp.message);
        setLoading(false);
        account.logout();
      } else {
        message.error(resp.message);
        setLoading(false);
        setGetVC(false);
      }
    });
  }, []);

  const getVerifyCode = useCallback(() => {
    setVCLoading(true);
    account.fetchForgetVerifyCode(form.getFieldsValue(), (resp) => {
      if (resp.success) {
        message.success(resp.message);
        setVCLoading(false);
        setGetVC(true);
      } else {
        message.error(resp.message);
        setVCLoading(false);
      }
    });
  }, [form]);

  useEffect(() => {
    second = 60;
    setPercent(100);
    if (getVC && typeof getVCTimer !== 'number') {
      getVCTimer = window.setInterval(() => {
        if (second > 0) {
          second--;
          setPercent((second / 60) * 100);
        } else {
          setGetVC(false);
          if (typeof getVCTimer === 'number') {
            window.clearInterval(getVCTimer);
            getVCTimer = null;
          }
        }
      }, 1000);
    }
  }, [getVC]);

  useEffect(() => {
    return () => {
      if (typeof getVCTimer === 'number') {
        window.clearInterval(getVCTimer);
        getVCTimer = null;
      }
    };
  }, []);

  const getVCText = useCallback(
    (num = 0): ReactNode => {
      return interpolateString(t['get-verify-code-time'], {
        val: Math.ceil((num / 100) * 60),
      });
    },
    [t],
  );

  return (
    <div className={styles.forgot}>
      <p className={styles.title}>{t['forgot-password']}</p>
      <Form
        name="forgot"
        form={form}
        className={styles.forgotForm}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
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
        <Item shouldUpdate={true}>
          {() => (
            <Item label={t['verify-code']} name="verify_code" rules={[{ required: true }]}>
              <Input
                prefix={<IconFont type="icon-verification" />}
                placeholder={t['verify-code']}
                disabled={!isEmail(form.getFieldValue('email'))}
                addonAfter={
                  <Button
                    onClick={getVerifyCode}
                    loading={vcLoading}
                    disabled={!isEmail(form.getFieldValue('email')) || getVC}
                  >
                    {getVC ? getVCText(percent) : t['get-verify-code']}
                  </Button>
                }
              />
            </Item>
          )}
        </Item>
        <Item
          label={t['new-password']}
          name="password"
          rules={[{ required: true, pattern: PASSWORD_RegExp }]}
        >
          <InputPassword placeholder={t['new-password']} />
        </Item>
        <Item>
          <Button type="primary" htmlType="submit" className={styles.submit} loading={loading}>
            {t['password']}
          </Button>
        </Item>
      </Form>
    </div>
  );
};

export default ForgotPassword;
