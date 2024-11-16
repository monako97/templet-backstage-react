import React, { isValidElement, useCallback, useEffect, useMemo } from 'react';
import { CloseOutlined, DeleteRowOutlined, ReloadOutlined } from '@ant-design/icons';
import localizable from '@app/locales';
import { useNavigate, useSearchParams } from '@moneko/react';
import { Dropdown, Tabs } from 'antd';
import type { MenuItemType } from 'antd/es/menu/interface';

import IconFont from '@/components/iconfont';
import { type CloseTab, closeTab, menu, openTab, type TabItem } from '@/store/menu';

import * as styles from './index.less';

const closeTabs: ({ key: CloseTab | 'refresh' } & Omit<MenuItemType, 'key'>)[] = [
  {
    label: '关闭左侧标签',
    icon: <DeleteRowOutlined style={{ transform: 'scaleX(-1)' }} />,
    key: 'left',
  },
  {
    label: '关闭右侧标签',
    icon: <DeleteRowOutlined />,
    key: 'right',
  },
  {
    label: '关闭其他标签',
    icon: <CloseOutlined />,
    key: 'other',
  },
  {
    label: '刷新标签页',
    icon: <ReloadOutlined />,
    key: 'refresh',
  },
];

function LayoutTabs() {
  const { activeKey, tabs, kv } = menu;
  const { t } = localizable;
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const closedTab = useCallback(
    (tabKey?: string, type?: CloseTab | 'refresh') => {
      if (type === 'refresh') {
        navigate('/refresh?menuId=refresh');
        return;
      }
      if (tabKey) {
        closeTab(tabKey, type, function (_?: TabItem[], next?: TabItem) {
          if (next) {
            navigate(`${next.key}?menuId=${next.key}`);
          }
        });
      }
    },
    [navigate],
  );
  const getItems = useCallback(
    (key: string) =>
      key === activeKey ? closeTabs : closeTabs.filter((i) => i?.key !== 'refresh'),
    [activeKey],
  );
  const handleTabEdit = useCallback(
    (
      targetKey: string | React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>,
      action: 'add' | 'remove',
    ) => {
      if (action === 'remove' && typeof targetKey === 'string') {
        closedTab(targetKey);
      }
    },
    [closedTab],
  );
  const handleClick = useCallback(
    (key: string) => {
      navigate(`${kv[key].key}?menuId=${kv[key].key}`);
    },
    [kv, navigate],
  );
  const tabPanel = useMemo(() => {
    return tabs.map(({ key, icon, label, dynamicTitle, closable }: TabItem) => {
      return {
        key,
        label: (
          <Dropdown
            menu={{
              items: getItems(key),
              onClick: (info) => {
                info.domEvent.stopPropagation();
                closedTab(key, info.key as CloseTab);
              },
            }}
            trigger={['contextMenu']}
            destroyPopupOnHide
          >
            <div>
              {isValidElement(icon) ? icon : icon ? <IconFont type={icon} /> : null}
              {(t[key] || label || key) + (dynamicTitle || '')}
            </div>
          </Dropdown>
        ),
        closable,
      };
    });
  }, [closedTab, getItems, t, tabs]);

  const { menuId, dynamicLabel } = useMemo(
    () => ({
      menuId: search.get('menuId'),
      dynamicLabel: search.get('dynamicTitle') || '',
    }),
    [search],
  );

  useEffect(() => {
    if (menuId && kv[menuId]) {
      openTab({
        key: menuId,
        dynamicTitle: dynamicLabel,
      });
    }
  }, [dynamicLabel, kv, menuId]);
  return (
    <Tabs
      className={styles.tabs}
      hideAdd
      onTabClick={handleClick}
      activeKey={activeKey}
      type="editable-card"
      onEdit={handleTabEdit}
      items={tabPanel}
    />
  );
}

export default LayoutTabs;
