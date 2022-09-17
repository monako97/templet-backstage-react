import React, { useEffect, useMemo, useCallback, useRef } from 'react';
import {
  useOutlet,
  projectBasicInfo,
  useLocation,
  useDispatch,
  useSelector,
  shallowEqual,
} from 'PackageNameByCore';
import { ConfigProvider } from 'antd';
import { pathToRegexp } from 'path-to-regexp';
import LoadMicro from '@/components/load-micro';
import type { ConfigProviderProps } from 'antd/es/config-provider';
import 'PackageNameByCore/lib/styles/ant.variables.global.less';

type CurrentMicroType =
  | {
      name: string;
      url: string;
    }
  | undefined;

const providerConfig: ConfigProviderProps = {
  ...projectBasicInfo.providerConfig,
  form: {
    validateMessages: {
      required: '${label}是必填字段',
    },
  },
};
const appRule = window.__MicroAppActiveRule__;
const allMicrror: string[] = appRule.map((item) => item.activeRule).flat();

ConfigProvider.config(providerConfig);

const App = () => {
  const dispatch = useDispatch();
  const outlet = useOutlet();
  const location = useLocation();
  const isLogin = useSelector((store: AppStore) => !!store.account.info, shallowEqual);

  const tab = useSelector(
    ({ appProgram }: AppStore) =>
      appProgram.activeKey ? appProgram.menuKV[appProgram.activeKey] : null,
    shallowEqual
  );
  const currentTab = useRef<ItemTypes>(tab);

  useEffect(() => {
    Object.assign(currentTab, {
      current: tab,
    });
  }, [tab]);
  useEffect(() => {
    document.getElementById('root')?.scrollTo({ top: 0 });
  }, [location.pathname]);

  const isMicro = useCallback(() => {
    const pathname = location.pathname;
    const p = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
    const cp = allMicrror.find((e) => pathToRegexp(e).exec('/#' + p));

    return cp;
  }, [location.pathname]);

  const active = useMemo(() => isMicro(), [isMicro]);

  const currentMicro: CurrentMicroType = useMemo(() => {
    return active ? appRule.find((m) => m.activeRule.includes(active)) : ({} as CurrentMicroType);
  }, [active]);

  useEffect(() => {
    if (isLogin) {
      // 请求初始数据
      dispatch({
        type: 'menu/fetch',
        payload: {
          callback: () => {
            // if (!currentTab.current) {
            //   navigate('/home?menuId=home');
            // }
          },
        },
      });
    } else {
      dispatch({
        type: 'menu/init',
      });
    }
  }, [dispatch, isLogin]);

  return (
    <React.Fragment>
      {outlet}
      <LoadMicro
        name={currentMicro?.name}
        entry={currentMicro?.url}
        active={active?.substring(3)}
      />
    </React.Fragment>
  );
};

export default App;
