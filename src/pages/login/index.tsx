import React, { useCallback, useState } from 'react';
import localizable, { template } from '@app/locales';
import { Link } from '@moneko/react';
import { Tabs, Typography } from 'antd';
import type { RuleObject } from 'antd/es/form';
import CustomForm from 'custom-form-ant';

import IconFont from '@/components/iconfont';
import { account } from '@/store/account';
import { isEmail } from '@/utils';

import * as styles from './index.less';

const USERNAME_RegExp = /^([a-zA-Z0-9\\_\\-\\.]|[\u4E00-\u9FA5]){2,10}$/;

const Login: React.FC = () => {
  const { t } = localizable;
  const { logining } = account;
  const [type, setType] = useState('username');

  const validator = useCallback(
    (_rule: RuleObject, value: string) => {
      if (type === 'username') {
        if (USERNAME_RegExp.test(value)) {
          return Promise.resolve();
        }
        return Promise.reject(
          template(t['ph:len-range'], {
            size: '4-10',
          }),
        );
      }
      if (isEmail(value)) {
        return Promise.resolve();
      }
      return Promise.reject(t['ph:validator-email']);
    },
    [t, type],
  );

  return (
    <>
      <div className={styles.page}>
        <Typography.Title className={styles.title}>{t.login}</Typography.Title>
        <div className={styles.box}>
          <Tabs
            className={styles.tabs}
            activeKey={type}
            centered
            destroyInactiveTabPane
            onChange={setType}
            items={[
              {
                label: t['sign-in-username'],
                icon: <IconFont type="icon-personal-nav" />,
                key: 'username',
              },
              {
                label: t['sign-in-email'],
                icon: <IconFont type="icon-email" />,
                key: 'email',
              },
            ]}
          />
          <CustomForm
            className={styles.form}
            variant="filled"
            disabled={logining}
            autoComplete="off"
            requiredMark={false}
            labelCol={{ span: 0 }}
            wrapperCol={{ span: 24 }}
            config={{
              [type]: {
                type: type === 'email' ? 'email' : 'string',
                label: t[type],
                colProps: { span: 24 },
                rules: [{ required: true }, { validator }],
                hasFeedback: true,
                props: {
                  prefix: <IconFont type={`icon-${type}`} />,
                  placeholder: t[`ph:${type}`],
                },
              },
              password: {
                type: 'password',
                label: t.password,
                colProps: { span: 24 },
                rules: [{ required: true }],
                hasFeedback: true,
                props: {
                  placeholder: t['ph:password'],
                  prefix: <IconFont type="icon-password" />,
                  iconRender: (v: boolean) => (
                    <IconFont type={v ? 'icon-visible' : 'icon-invisible'} />
                  ),
                },
              },
              remember: {
                type: 'checkbox',
                initialValue: true,
                colProps: { span: 24 },
                props: {
                  children: t.remember,
                },
              },
            }}
            onFinish={account.login}
            submitter={{
              submitText: t.login,
              resetText: false,
              submitProps: {
                block: true,
                loading: logining,
                icon: <IconFont type="icon-login" />,
              },
              extra: (
                <Link className={styles.forgotPassword} to="/forgot-password">
                  {t['forgot-password']}
                </Link>
              ),
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Login;
