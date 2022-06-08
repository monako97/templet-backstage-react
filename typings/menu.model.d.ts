type MenuType = {
  /** 菜单id */
  key: string;
  /** 菜单名 */
  i18n: string;
  path: string;
  /** 菜单图标 */
  icon?: React.ReactNode;
  /** 菜单父id */
  parentId: string;
  /** 子菜单 */
  children: MenuType[];
};

interface MenuModelType {
  /** 登录用户可访问的菜单列表 */
  menu: MenuType[];
}
