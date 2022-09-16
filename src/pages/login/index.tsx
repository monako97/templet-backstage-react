import React, { useCallback, useState } from 'react';
import { Tabs } from 'antd';
import LoginForm from '@/components/login-form';
import { useLocale } from 'PackageNameByCore';
import styles from './index.less';
import Icon from '@/components/icon';

const { TabPane } = Tabs;

type TabType = {
  label: string;
  type: 'username' | 'email';
  icon: string;
};
type LoginType = 'username' | 'email';

const Login: React.FC = () => {
  const { getLanguage } = useLocale();
  const tabs: TabType[] = [
    { label: getLanguage('sign-in-username'), type: 'username', icon: 'personal-nav' },
    { label: getLanguage('sign-in-email'), type: 'email', icon: 'email' },
  ];
  const [type, setType] = useState<LoginType>('username');
  const handleTypeChange = useCallback((key: string) => {
    setType(key as LoginType);
  }, []);

  return (
    <div className={styles.login}>
      <p className={styles.title}>{getLanguage('route-login')}</p>
      <Tabs activeKey={type} onChange={handleTypeChange} centered>
        {tabs.map((item) => {
          return (
            <TabPane
              tab={
                <span>
                  <Icon type={item.icon} />
                  {item.label}
                </span>
              }
              destroyInactiveTabPane
              key={item.type}
            />
          );
        })}
      </Tabs>
      <LoginForm type={type} />
    </div>
  );
};

export default Login;
