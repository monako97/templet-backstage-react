import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { useNavigate, useDispatch, useLocale, translatFunction } from 'plugin-runtime';
import type { ResponseBody } from 'plugin-runtime';
import { Button, Form, Input, message } from 'antd';
import Email from '@/components/email';
import Icon from '@/components/icon';
import InputPassword from '@/components/input-password';
import styles from './index.less';
import { PASSWORD_RegExp, isEmail } from '@/utils';
import { ForgotPassWordParams } from '@/services/user';
const { Item } = Form;

let getVCTimer: number | null,
  second = 60;
const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch();
  const { getLanguage } = useLocale();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [vcLoading, setVCLoading] = useState(false);
  const [getVC, setGetVC] = useState(false);
  const [percent, setPercent] = useState<number>(100);

  const onFinish = useCallback(
    (values: ForgotPassWordParams) => {
      setLoading(true);
      dispatch({
        type: 'account/fetchForgetPassword',
        payload: {
          data: values,
          success(resp: ResponseBody) {
            message.success(resp.message);
            setLoading(false);
            dispatch({
              type: 'account/fetchLogout',
            });
            navigate('/login');
          },
          failure(errMsg: string) {
            message.error(errMsg);
            setLoading(false);
            setGetVC(false);
          },
        },
      });
    },
    [dispatch, navigate]
  );

  const getVerifyCode = useCallback(() => {
    setVCLoading(true);
    dispatch({
      type: 'account/fetchForgetVerifyCode',
      payload: {
        data: form.getFieldsValue(),
        success(resp: ResponseBody) {
          message.success(resp.message);
          setVCLoading(false);
          setGetVC(true);
        },
        failure(errMsg: string) {
          message.error(errMsg);
          setVCLoading(false);
        },
      },
    });
  }, [dispatch, form]);

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
      return translatFunction(getLanguage('get-verify-code-time'), Math.ceil((num / 100) * 60));
    },
    [getLanguage]
  );

  return (
    <div className={styles.forgot}>
      <p className={styles.title}>{getLanguage('route-forgot-password')}</p>
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
          label={getLanguage('email')}
          rules={[
            { required: true },
            () => ({
              validator(_rule, value) {
                if (isEmail(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(getLanguage('ph:validator-email'));
              },
            }),
          ]}
          hasFeedback
        >
          <Email placeholder={getLanguage('ph:email')} />
        </Item>
        <Item shouldUpdate={true}>
          {() => (
            <Item
              label={getLanguage('verify-code')}
              name="verify_code"
              rules={[{ required: true }]}
            >
              <Input
                prefix={<Icon type="verification" />}
                placeholder={getLanguage('verify-code')}
                disabled={!isEmail(form.getFieldValue('email'))}
                addonAfter={
                  <Button
                    onClick={getVerifyCode}
                    loading={vcLoading}
                    disabled={!isEmail(form.getFieldValue('email')) || getVC}
                  >
                    {getVC ? getVCText(percent) : getLanguage('get-verify-code')}
                  </Button>
                }
              />
            </Item>
          )}
        </Item>
        <Item
          label={getLanguage('new-password')}
          name="password"
          rules={[{ required: true, pattern: PASSWORD_RegExp }]}
        >
          <InputPassword placeholder={getLanguage('new-password')} />
        </Item>
        <Item>
          <Button type="primary" htmlType="submit" className={styles.submit} loading={loading}>
            {getLanguage('route-password')}
          </Button>
        </Item>
      </Form>
    </div>
  );
};

export default ForgotPassword;
