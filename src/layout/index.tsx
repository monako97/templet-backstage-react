import React, { type FC, type ReactNode, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import app from '@app/info';
import localizable from '@app/locales';
import { Layout } from 'antd';
import { useOutlet } from 'react-router-dom';
import LayoutFooter from './footer';
import LayoutHeader from './header';
import styles from './index.less';
import Logo from './logo';
import LayoutMenu from './menu';

const DashboardLayout: FC<{ children?: ReactNode }> = ({ children }) => {
  const { t } = localizable;
  const outlet = useOutlet();
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <Layout className={styles.layout}>
      <Layout.Sider
        className={styles.sider}
        trigger={
          collapsed ? (
            <div className={styles.trigger}>
              <MenuUnfoldOutlined />
              {t.open}
            </div>
          ) : (
            <div className={styles.trigger}>
              <MenuFoldOutlined />
              {t.collapse}
            </div>
          )
        }
        collapsible
        collapsed={collapsed}
        onBreakpoint={setCollapsed}
        onCollapse={setCollapsed}
        theme="dark"
        breakpoint="md"
      >
        <div className={styles.logo} data-title={app.name}>
          <Logo collapsed={collapsed} />
        </div>
        <LayoutMenu collapsed={collapsed} theme="dark" />
      </Layout.Sider>
      <Layout className={styles.section}>
        <LayoutHeader />
        <Layout.Content className={styles.content}>
          <div className={styles.view}>{children || outlet}</div>
          <LayoutFooter />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
