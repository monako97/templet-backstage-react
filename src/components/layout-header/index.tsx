import React, { createElement, type FC, useMemo } from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined } from '@ant-design/icons';
import { isFunction } from 'PackageNameByCommon';
import { localizable } from 'PackageNameByCore';
import { Avatar, Badge, Dropdown, Layout, type MenuProps } from 'antd';
import styles from './index.less';
import SwitchLanguage from '@/components/switch-language';
import { account, logout } from '@/store';

interface HeaderProps {
  collapsed: boolean;
  // eslint-disable-next-line no-unused-vars
  onCollapsed?: (value?: boolean) => void;
}

const LayoutHeader: FC<HeaderProps> = ({ collapsed, onCollapsed }) => {
  const { t } = localizable;

  const items = useMemo<MenuProps['items']>(
    () => [
      {
        key: 'sign-out',
        label: t['sign-out'],
        icon: <LogoutOutlined />,
        onClick: logout,
      },
    ],
    [t]
  );

  return (
    <Layout.Header className={styles.header}>
      {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: styles.trigger,
        onClick: () => isFunction(onCollapsed) && onCollapsed(),
      })}
      <div className={styles.right}>
        <Dropdown menu={{ items }} placement="bottom">
          <div className={styles.user}>
            <Badge count={0}>
              <Avatar src={account.info?.avatar} />
            </Badge>
            <span className={styles.username}>{account.info?.username}</span>
          </div>
        </Dropdown>
        <SwitchLanguage className={styles.lang} />
      </div>
    </Layout.Header>
  );
};

export default LayoutHeader;
