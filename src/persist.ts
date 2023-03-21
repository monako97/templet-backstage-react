import { localizable, menu, persistentKey } from 'PackageNameByCore';
import { account, accountPersistenceKey, global, globalPersistenceKey } from '@/store';

/**
 * 数据持久化
 */
export default {
  // 持久化数据的key: 持久化的数据
  [persistentKey.menuActiveKey]: menu.activeKey,
  [persistentKey.menuExpandKey]: menu.expandKey,
  [persistentKey.menuMenus]: menu.menus,
  [persistentKey.menuKv]: menu.kv,
  [persistentKey.menuTabs]: menu.tabs,
  [persistentKey.language]: localizable.language,
  [accountPersistenceKey]: account.info,
  [globalPersistenceKey]: global.isLogin,
};
