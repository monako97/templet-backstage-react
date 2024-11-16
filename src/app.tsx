import React, { Fragment, useCallback, useEffect, useMemo, useRef } from 'react';
import app from '@app/info';
import localizable from '@app/locales';
import { printBanner, watermark } from '@moneko/common';
import { Navigate, useLocation, useNavigate, useOutlet } from '@moneko/react';
import { ConfigProvider } from 'antd';

import LoadMicro from '@/components/load-micro';
import Dashboard from '@/layout';
import LayoutFooter from '@/layout/footer';
import { account } from '@/store/account';
import { global } from '@/store/global';
import menu, { type MenuItem, setMenu } from '@/store/menu';

import SwitchLanguage from './components/switch-language';

import '@/global.less';

const appRule =
  window.__MicroAppActiveRule__?.map((item) => {
    return {
      ...item,
      activeRule: item.activeRule.map((r) => `${item.basename}${r}`),
    };
  }) || [];
const allMicrror: string[] = appRule.map((item) => item.activeRule).flat();

function pathToRegexp(path: string) {
  const keys: string[] = [];
  const pattern = path
    .replace(/:[^\s/]+/g, (match) => {
      keys.push(match.substring(1));
      return '([^\\s/]+)';
    })
    .replace(/\//g, '\\/');

  return new RegExp(`^${pattern}$`);
}
const useMicroApp = () => {
  const hash = app.routerMode === 'hash' ? '/#' : '';
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

printBanner(app.projectName, app.version, app.author.name, app.author.url);

const App = () => {
  const { t } = localizable;
  const { kv, activeKey } = menu;
  const { isLogin } = global;
  const { info } = account;
  const navigate = useNavigate();
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
          // navigate('/home?menuId=home');
        }
      });
    } else {
      setMenu([]);
    }
  }, [isLogin, navigate]);

  useEffect(() => {
    // 更新水印
    watermark.update(info?.username || app.name);
  }, [info?.username]);

  const view = (
    <Fragment>
      {current ? null : outlet}
      {microView}
    </Fragment>
  );

  return (
    <ConfigProvider
      prefixCls={app.prefixCls}
      iconPrefixCls={`${app.prefixCls}-icon`}
      form={{
        validateMessages: {
          required: `${t['ph:please-fill']}\${label}!`,
          types: {
            email: `\${label}${t['wrong-format']}`,
          },
          pattern: {
            mismatch: `${t['ph:fill-correct']}\${label}!`,
          },
        },
      }}
      theme={{
        cssVar: true,
        token: {
          colorBgLayout: '#f0f2f5',
          borderRadius: 16,
          /* 这里是你的全局 token */
          colorPrimary: '#5996ff',
          colorWarning: '#f9a913',
          colorSuccess: '#52c11b',
          colorError: '#ff4f51',
          fontFamily:
            "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji',Helvetica,Oxygen,Ubuntu,Cantarell,'Fira Sans','Droid Sans'",
        },
        components: {
          Form: {
            /* 这里是你的组件 token */
          },
        },
      }}
    >
      {isLogin ? (
        <Dashboard>{view}</Dashboard>
      ) : (
        <React.Fragment>
          <Navigate to="/login?menuId=login" replace />
          <div className="toolbox">
            <SwitchLanguage />
          </div>
          {view}
          <LayoutFooter />
        </React.Fragment>
      )}
    </ConfigProvider>
  );
};

export default App;
