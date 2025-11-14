import React, { useCallback, useEffect, useState } from 'react';
import localizable, { template } from 'app:locales';
import { Button, Form, message, Typography } from 'antd';
import { CustomForm } from 'custom-form-ant';

import GoBack from '@/components/go-back';
import IconFont from '@/components/iconfont';
import { changePassword, type ForgotPassWordParams, getForgetVerifyCode } from '@/services/user';
import { account } from '@/store/account';
import { isEmail } from '@/utils';

import * as styles from './index.less';

const PASSWORD_RegExp = /^(\w){6,16}$/;
const ForgotPassword: React.FC = () => {
  const { t } = localizable;
  const [loading, setLoading] = useState(false);
  const [vcLoading, setVcLoading] = useState(false);
  const [vcSuccess, setVcSuccess] = useState(false);
  const [second, setSecond] = useState<number>(60);
  const [form] = Form.useForm();
  const email = Form.useWatch('email', form);

  const onFinish = useCallback(async (values: ForgotPassWordParams) => {
    setLoading(true);
    try {
      const resp = await changePassword(values);

      if (resp.status === 200) {
        message.success(resp.message);
        account.logout();
      }
    } catch {
      void 0;
    }
    setLoading(false);
    setVcSuccess(false);
  }, []);

  const getVerifyCode = useCallback(async () => {
    setVcLoading(true);

    try {
      const resp = await getForgetVerifyCode(email);

      if (resp.status === 200) {
        message.success(resp.message);
        setVcSuccess(true);
      }
    } catch {
      void 0;
    }
    setVcLoading(false);
  }, [email]);

  useEffect(() => {
    if (!vcSuccess) return;
    setSecond(60);
    const getVCTimer = window.setInterval(() => {
      setSecond((prev) => {
        if (prev <= 1) {
          setVcSuccess(false);
          window.clearInterval(getVCTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(getVCTimer);
  }, [vcSuccess]);

  return (
    <div className={styles.forgot}>
      <Typography.Title className={styles.title}>{t['forgot-password']}</Typography.Title>
      <CustomForm
        form={form}
        name="forgot"
        autoComplete="off"
        variant="filled"
        className={styles.forgotForm}
        disabled={loading}
        onFinish={onFinish}
        labelCol={{ span: 0 }}
        wrapperCol={{}}
        config={{
          email: {
            type: 'email',
            label: t.email,
            colProps: { span: 24 },
            rules: [
              {
                validator(_, str) {
                  return isEmail(str) ? Promise.resolve() : Promise.reject(t['ph:validator-email']);
                },
              },
            ],
            hasFeedback: true,
            props: {
              prefix: <IconFont type="icon-email" />,
              placeholder: t['ph:email'],
            },
          },
          verify_code: {
            type: 'search',
            label: t['verify-code'],
            rules: [{ required: true }],
            colProps: { span: 24 },
            hasFeedback: true,
            props: {
              prefix: <IconFont type="icon-verification" />,
              placeholder: t['verify-code'],
              disabled: !vcSuccess,
              enterButton: (
                <Button
                  onClick={getVerifyCode}
                  loading={vcLoading}
                  disabled={!isEmail(email) || vcSuccess}
                  type="text"
                >
                  {vcSuccess
                    ? template(t['get-verify-code-time'], { second })
                    : t['get-verify-code']}
                </Button>
              ),
            },
          },
          password: {
            type: 'password',
            label: t['new-password'],
            colProps: { span: 24 },
            rules: [{ required: true, pattern: PASSWORD_RegExp }],
            hasFeedback: true,
            props: {
              prefix: <IconFont type="icon-password" />,
              placeholder: t['new-password'],
              iconRender: (v: boolean) => <IconFont type={v ? 'icon-visible' : 'icon-invisible'} />,
            },
          },
        }}
        submitter={{
          submitText: t['route-password'],
          resetText: false,
          submitProps: {
            block: true,
            loading: loading,
          },
          extra: <GoBack className={styles.goBack} />,
        }}
      />
    </div>
  );
};

export default ForgotPassword;
