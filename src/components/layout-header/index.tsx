import React, { useCallback } from 'react';
import { useDispatch, useSelector, useLocale } from 'plugin-runtime';
import { Avatar, Badge, Dropdown, Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined } from '@ant-design/icons';
import SwitchLanguage from '@/components/switch-language';
import { isEqual, isFunction } from 'lodash';
import type { UserModelType } from '@/models/user';
import styles from './index.less';

interface HeaderProps {
  collapsed: boolean;
  // eslint-disable-next-line no-unused-vars
  onCollapsed?: (value?: boolean | undefined) => void;
}

const LayoutHeader: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { collapsed, onCollapsed } = props;
  const userInfo = useSelector((state: { user: UserModelType }) => state.user.info, isEqual);
  const dispatch = useDispatch();
  const { getLanguage } = useLocale();
  const handleLogout = useCallback(() => {
    dispatch({
      type: 'user/logout'
    });
  }, [dispatch]);

  const menu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        {getLanguage('sign-out')}
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout.Header className={styles['bg-white']}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: styles.trigger,
        onClick: () => isFunction(onCollapsed) && onCollapsed()
      })}
      <div className={styles.right}>
        <Dropdown overlay={menu} placement="bottomRight">
          <div className={styles.user}>
            <Badge count={0}>
              <Avatar src={userInfo?.avatar} />
            </Badge>
            <span className={styles.username}>{userInfo?.username}</span>
          </div>
        </Dropdown>
        <SwitchLanguage />
      </div>
    </Layout.Header>
  );
};

export default LayoutHeader;
