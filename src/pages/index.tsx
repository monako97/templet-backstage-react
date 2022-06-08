import React, { useEffect, useMemo } from 'react';
import {
  useOutlet,
  projectBasicInfo,
  useLocation,
  useDispatch,
  useSelector,
  shallowEqual,
} from 'plugin-runtime';
import { ConfigProvider } from 'antd';
import { pathToRegexp } from 'path-to-regexp';
import MirrorPage from '@/components/load-micro';

const allMicrror: string[] = window.__MicroAppActiveRule__.map((item) => item.activeRule).flat();

ConfigProvider.config(projectBasicInfo.providerConfig);

const App = () => {
  const dispatch = useDispatch();
  const outlet = useOutlet();
  const location = useLocation();
  const isLogin = useSelector((store: AppStore) => !!store.account.info, shallowEqual);

  useEffect(() => {
    document.getElementById('root')?.scrollTo({ top: 0 });
  }, [location.pathname]);

  const isMicro = useMemo(() => {
    const pathname = location.pathname;
    const p = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
    const cp = allMicrror.find((e) => pathToRegexp(e).exec('/#' + p));

    return Boolean(cp) && cp;
  }, [location.pathname]);

  const currentMicro = useMemo(() => {
    return (
      typeof isMicro === 'string' &&
      window.__MicroAppActiveRule__.find((m) => m.activeRule.includes(isMicro))
    );
  }, [isMicro]);

  useEffect(() => {
    dispatch({
      type: 'menu/init',
    });
    if (isLogin) {
      // 请求初始数据
    } else {
      dispatch({
        type: 'menu/init',
      });
    }
  }, [dispatch, isLogin]);

  return (
    <React.Fragment>
      {outlet ||
        (currentMicro ? (
          <MirrorPage
            name={currentMicro?.name}
            entry={currentMicro?.url + (isMicro as string).substring(3)}
          />
        ) : null)}
    </React.Fragment>
  );
};

export default App;
