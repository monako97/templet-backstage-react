import React, { useMemo } from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import localizable from 'app:locales';
import { Avatar, Badge, Dropdown, Layout, type MenuProps } from 'antd';

import SwitchLanguage from '@/components/switch-language';
import { account } from '@/store/account';

import LayoutTabs from '../tabs';

import * as styles from './index.less';

const LayoutHeader = () => {
  const { t } = localizable;
  const { info } = account;

  const items = useMemo<MenuProps['items']>(
    () => [
      {
        key: 'sign-out',
        label: t['sign-out'],
        icon: <LogoutOutlined />,
        onClick: account.logout,
      },
    ],
    [t],
  );

  return (
    <Layout.Header className={styles.header}>
      <div className={styles.tabs}>
        <LayoutTabs />
      </div>
      <div className={styles.right}>
        <Dropdown menu={{ items }} placement="bottom">
          <div className={styles.user}>
            <Badge count={0}>
              <Avatar src={info?.avatar}>{info?.username}</Avatar>
            </Badge>
            <span className={styles.username}>{info?.username}</span>
          </div>
        </Dropdown>
        <SwitchLanguage className={styles.lang} />
      </div>
    </Layout.Header>
  );
};

export default LayoutHeader;
