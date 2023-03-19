// import { persistence } from 'PackageNameByCommon';
// import { localizable, menu, persistentKey } from 'PackageNameByCore';
// import { account, accountPersistenceKey, global, globalPersistenceKey } from '@/store';

// /** 数据持久化 */
// window.addEventListener('unload', function () {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const obj: Record<string, any> = {
//     [persistentKey.menuActiveKey]: menu.activeKey,
//     [persistentKey.menuExpandKey]: menu.expandKey,
//     [persistentKey.menuMenus]: menu.menus,
//     [persistentKey.menuKv]: menu.kv,
//     [persistentKey.menuTabs]: menu.tabs,
//     [persistentKey.language]: localizable.language,
//     [accountPersistenceKey]: account.info,
//     [globalPersistenceKey]: global.isLogin,
//   };

//   for (const key in obj) {
//     if (Object.prototype.hasOwnProperty.call(obj, key)) {
//       persistence.set(key, obj[key]);
//     }
//   }
// });
