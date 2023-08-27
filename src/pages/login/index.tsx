import React, { useCallback, useMemo, useState } from 'react';
import localizable from '@app/locales';
import { Tabs } from 'antd';
import styles from './index.less';
import IconFont from '@/components/iconfont';
import LoginForm, { type LoginType } from '@/components/login-form';
import SwitchLanguage from '@/components/switch-language';
import LayoutFooter from '@/layout/footer';

const tabs = [
  { label: 'sign-in-username', type: 'username', icon: 'icon-personal-nav' },
  { label: 'sign-in-email', type: 'email', icon: 'icon-email' },
];
const Login: React.FC = () => {
  const { t } = localizable;
  const [type, setType] = useState<LoginType>('username');
  const items = useMemo(
    () =>
      tabs.map((item) => ({
        label: (
          <span>
            <IconFont type={item.icon} />
            {t[item.label]}
          </span>
        ),
        destroyInactiveTabPane: true,
        key: item.type,
      })),
    [t],
  );
  const handleTypeChange = useCallback((key: string) => {
    setType(key as LoginType);
  }, []);

  return (
    <>
      <div className={styles.toolbox}>
        <SwitchLanguage />
      </div>
      <div className={styles.page}>
        <p className={styles.title}>{t['login']}</p>
        <div className={styles.box}>
          <Tabs
            className={styles.tabs}
            activeKey={type}
            centered
            items={items}
            onChange={handleTypeChange}
          />
          <LoginForm type={type} />
        </div>
      </div>
      <LayoutFooter />
    </>
  );
};

export default Login;
