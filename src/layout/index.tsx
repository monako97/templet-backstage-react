import React, { type FC, type ReactNode, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { name } from 'app:info';
import { Outlet } from '@moneko/react';
import { Layout } from 'antd';

import { global } from '@/store/global';

import LayoutFooter from './footer';
import LayoutHeader from './header';
import Logo from './logo';
import LayoutMenu from './menu';

import * as styles from './index.less';

const DashboardLayout: FC<{ children?: ReactNode }> = ({ children }) => {
  const { theme } = global;
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <Layout className={styles.layout}>
      <Layout.Sider
        className={styles.sider}
        trigger={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        collapsible
        collapsed={collapsed}
        onBreakpoint={setCollapsed}
        onCollapse={setCollapsed}
        theme={theme}
        breakpoint="md"
      >
        <div className={styles.logo} data-title={name}>
          <Logo collapsed={collapsed} />
        </div>
        <LayoutMenu collapsed={collapsed} theme={theme} />
      </Layout.Sider>
      <Layout className={styles.section}>
        <LayoutHeader />
        <Layout.Content className={styles.content}>
          <div className={styles.view}>{children ?? <Outlet />}</div>
          <LayoutFooter />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
