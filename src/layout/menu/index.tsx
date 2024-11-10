import React, { isValidElement, useCallback, useEffect, useMemo } from 'react';
import localizable from '@app/locales';
import { Link, useSearchParams } from '@moneko/react';
import { Menu, type MenuProps } from 'antd';
import IconFont from '@/components/iconfont';
import menu, { type MenuItem, expandMenu } from '@/store/menu';

export interface LayoutMenuProps extends MenuProps {
  collapsed?: boolean;
}

const LayoutMenu: React.FC<LayoutMenuProps> = (prop) => {
  const { collapsed, ...menuProps } = prop;
  const { menus, kv, activeKey, expandKey } = menu;
  const { t } = localizable;
  const [search] = useSearchParams();
  const filterMenu = useCallback(
    (list: MenuItem[], parentId?: string): MenuProps['items'] => {
      return list.map((item) => {
        const { icon, itemIcon, disabled, type, key, path, label, children } = item;
        const id = [parentId, key].filter(Boolean).join('/');

        const text = t[id] || label || id;
        const childrens = Array.isArray(children) ? filterMenu(children, id) : children;

        return Object.assign(
          {
            path,
            type,
            disabled,
            key: id,
            itemIcon: isValidElement(itemIcon) ? (
              itemIcon
            ) : itemIcon ? (
              <IconFont type={itemIcon} />
            ) : null,
            icon: isValidElement(icon) ? icon : icon ? <IconFont type={icon} /> : null,
            label:
              path && !childrens?.length ? (
                <Link preventScrollReset to={`${id}?menuId=${id}`}>
                  {text}
                </Link>
              ) : (
                text
              ),
          },
          childrens?.length && {
            children: childrens,
          },
        );
      });
    },
    [t],
  );

  const menuId = useMemo(() => search.get('menuId'), [search]);
  const items = useMemo<MenuProps['items']>(
    () => filterMenu(menus.filter((m) => !m.hideMenu)),
    [filterMenu, menus],
  );
  const selectedKeys = useMemo(() => (activeKey ? [activeKey] : []), [activeKey]);

  useEffect(() => {
    const current = menuId && kv[menuId];

    if (current && !collapsed && menu.expandKey) {
      const opk = [...menu.expandKey];

      if (!opk.includes(menuId as string)) opk.push(menuId as string);
      if (current.parentId && !opk.includes(current.parentId)) opk.push(current.parentId);
      expandMenu(opk);
    }
  }, [collapsed, menuId, kv]);
  useEffect(() => {
    if (menuId !== activeKey && menuId) {
      menu.activeKey = menuId;
    }
  }, [activeKey, menuId]);

  return (
    <Menu
      mode="inline"
      subMenuCloseDelay={0}
      triggerSubMenuAction="click"
      defaultSelectedKeys={selectedKeys}
      selectedKeys={selectedKeys}
      defaultOpenKeys={expandKey}
      openKeys={collapsed ? void 0 : expandKey}
      onOpenChange={expandMenu}
      items={items}
      {...menuProps}
    />
  );
};

export default LayoutMenu;
