import React from 'react';
import { message, Tabs } from 'antd';
import LoginForm from '@/components/login-form';
import { useDispatch, useLocale } from 'plugin-runtime';
import styles from './index.less';
import { isFunction } from 'lodash';
import Icon from '@/components/icon';
import type { LoginByUserNameParams, LoginByEmailParams } from '@/services/user';

const { TabPane } = Tabs;

type LoginType = {
  label: string;
  type: 'username' | 'email';
  icon: string;
};

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const { getLanguage } = useLocale();
  const loginType: LoginType[] = [
    { label: getLanguage('sign-in-username'), type: 'username', icon: 'personal-nav' },
    { label: getLanguage('sign-in-email'), type: 'email', icon: 'email' },
  ];
  const handleLogin = (
    values: LoginByUserNameParams | LoginByEmailParams,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    logintype: LoginType['type']
  ) => {
    let funcLoad: boolean | null = isFunction(setLoading);

    if (funcLoad) {
      setLoading(true);
    }
    dispatch({
      type: logintype === 'username' ? 'account/fetchLoginByUserName' : 'account/fetchLoginByEmail',
      payload: {
        data: values,
        success() {
          if (funcLoad) {
            setLoading(false);
          }
          funcLoad = null;
        },
        failure(errMsg: string) {
          if (funcLoad) {
            setLoading(false);
          }
          message.error(errMsg);
          funcLoad = null;
        },
      },
    });
  };

  return (
    <div className={styles.login}>
      <p className={styles.title}>{getLanguage('route-login')}</p>
      <Tabs defaultActiveKey="username" centered animated={{ inkBar: true, tabPane: true }}>
        {loginType.map((item) => {
          return (
            <TabPane
              tab={
                <span>
                  <Icon type={item.icon} />
                  {item.label}
                </span>
              }
              key={item.type}
            >
              <LoginForm
                type={item.type}
                onSubmit={(values, setLoading) => handleLogin(values, setLoading, item.type)}
              />
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};

export default Login;
