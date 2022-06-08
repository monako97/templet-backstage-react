import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector, useLocale } from 'plugin-runtime';
import { Avatar, Badge, Dropdown, Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined } from '@ant-design/icons';
import SwitchLanguage from '@/components/switch-language';
import { isEqual, isFunction } from 'lodash';
import type { UserModelType } from '@/models/account';
import styles from './index.less';
import { ItemType } from 'antd/es/menu/hooks/useItems';

interface HeaderProps {
  collapsed: boolean;
  // eslint-disable-next-line no-unused-vars
  onCollapsed?: (value?: boolean | undefined) => void;
}

const LayoutHeader: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { collapsed, onCollapsed } = props;
  const userInfo = useSelector((state: { account: UserModelType }) => state.account.info, isEqual);
  const dispatch = useDispatch();
  const { getLanguage } = useLocale();
  const handleLogout = useCallback(() => {
    dispatch({
      type: 'account/logout',
    });
  }, [dispatch]);
  const items = useMemo(
    () =>
      [
        {
          label: getLanguage('sign-out'),
          icon: <LogoutOutlined />,
          onClick: handleLogout,
        },
      ] as unknown as ItemType[],
    [getLanguage, handleLogout]
  );

  return (
    <Layout.Header className={styles.bgWhite}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: styles.trigger,
        onClick: () => isFunction(onCollapsed) && onCollapsed(),
      })}
      <div className={styles.right}>
        <Dropdown overlay={<Menu items={items} />} placement="bottom">
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
