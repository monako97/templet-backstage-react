import React, { useEffect, useMemo, useCallback, useRef } from 'react';
import {
  type MenuItem,
  DashboardLayout,
  useOutlet,
  useLocation,
  redirect,
  projectBasicInfo,
  pathToRegexp,
} from 'PackageNameByCore';
import LoadMicro from '@/components/load-micro';
import { global, menu } from '@/store';

const appRule = window.__MicroAppActiveRule__.map((item) => {
  return {
    ...item,
    activeRule: item.activeRule.map((r) => `${item.basename}${r}`),
  };
});
const allMicrror: string[] = appRule.map((item) => item.activeRule).flat();
const useMicroApp = () => {
  const hash = projectBasicInfo.programInfo.routerMode === 'hash' ? '/#' : '';
  const location = useLocation();
  const isMicro = useCallback(() => {
    const pathname = location.pathname;
    const p = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
    const cp = allMicrror.find((e) => pathToRegexp(e).exec(hash + p));

    return cp;
  }, [hash, location.pathname]);
  const active = useMemo(() => isMicro(), [isMicro]);
  const currentMicro = useMemo(() => {
    return active ? appRule.find((m) => m.activeRule.includes(active)) : null;
  }, [active]);

  return {
    current: currentMicro,
    microView: (
      <LoadMicro
        name={currentMicro?.name}
        entry={currentMicro?.url}
        basename={currentMicro?.basename}
        active={active?.substring(hash.length + 1)}
      />
    ),
  };
};

const App = () => {
  const { kv, activeKey } = menu;
  const { isLogin } = global;
  const currentMenu = useMemo(() => (activeKey ? kv[activeKey] : null), [kv, activeKey]);
  const outlet = useOutlet();
  const location = useLocation();
  const { current, microView } = useMicroApp();
  const menuRef = useRef<MenuItem>(currentMenu);

  useEffect(() => {
    Object.assign(menuRef, {
      current: currentMenu,
    });
  }, [currentMenu]);
  useEffect(() => {
    document.getElementById('root')?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);
  useEffect(() => {
    if (isLogin) {
      // 请求初始数据
      global.fetchMenu(() => {
        // 在没有权限的路由时返回首页
        if (!menuRef.current) {
          redirect('/home?menuId=home');
        }
      });
    } else {
      menu.setMenu([]);
    }
  }, [isLogin]);
  const view = (
    <>
      {current ? null : outlet}
      {microView}
    </>
  );

  return isLogin ? <DashboardLayout>{view}</DashboardLayout> : view;
};

export default App;
