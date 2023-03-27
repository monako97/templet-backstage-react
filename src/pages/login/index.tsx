import React, { useCallback, useMemo, useState } from 'react';
import { css, injectGlobal } from '@emotion/css';
import { IconFont, localizable } from 'PackageNameByCore';
import { Tabs } from 'antd';
import LayoutFooter from '@/components/layout-footer';
import LoginForm, { type LoginType } from '@/components/login-form';
import SwitchLanguage from '@/components/switch-language';

const styles = css`
  #root {
    min-height: 100vh;
    flex-direction: column;
  }

  .login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex: 1;
    flex-direction: column;
  }

  .login-tabs {
    width: 100%;
  }

  .login-box {
    min-width: 288px;
  }

  .login-title {
    margin-bottom: 32px;
    font-size: 24px;
    font-weight: 600;
  }

  .login-toolbox {
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
    padding: 8px 16px;
  }
`;

injectGlobal([styles]);

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
    [t]
  );
  const handleTypeChange = useCallback((key: string) => {
    setType(key as LoginType);
  }, []);

  return (
    <>
      <div className="login-toolbox">
        <SwitchLanguage />
      </div>
      <div className="login-page">
        <p className="login-title">{t['route-login']}</p>
        <div className="login-box">
          <Tabs
            className="login-tabs"
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
