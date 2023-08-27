import React, { useCallback, useEffect, useState } from 'react';
import localizable from '@app/locales';
import { message } from 'antd';
import { type MicroApp, addGlobalUncaughtErrorHandler, loadMicroApp } from 'qiankun';

addGlobalUncaughtErrorHandler((event) => message.error(event.toString()));

type LoginAppProps = {
  name?: string;
  entry?: string;
  active?: string;
  basename?: string;
};

const microApps: Record<string, MicroApp> = {};

const LoadMicroApp: React.FC<LoginAppProps> = ({
  name,
  entry,
  basename = '/',
  active = '',
  ...other
}) => {
  const { lang } = localizable;
  const [apps, setApps] = useState(name ? [name] : []);

  useEffect(() => {
    if (name && !apps.includes(name)) {
      setApps([...apps, name]);
    }
  }, [name, apps]);

  const load = useCallback(async () => {
    if (!name || !entry) return;
    const loginContainer = document.getElementById(`${name}-micro-app`);

    if (!loginContainer) return;

    if (microApps[name]?.getStatus() === 'MOUNTED') {
      await microApps[name]?.unmount();
    }
    Object.assign(microApps, {
      [name]: loadMicroApp(
        {
          name: name,
          entry: entry + active,
          container: loginContainer,
          props: {
            basename,
            language: lang.language,
            ...other,
            PROJECTNAME: process.env.PROJECTNAME,
            __MicroAppEntry__: window.__MicroAppEntry__,
            currentTarget: window,
            getPopupContainer: () => document.querySelector('#root section') || document.body,
            getTargetContainer: () => document.querySelector('#root section') || document.body,
          },
        },
        {
          singular: false,
          prefetch: true,
          autoStart: true,
          fetch(url: RequestInfo | URL, init?: RequestInit) {
            return window.fetch(url, {
              ...init,
              mode: 'cors',
            });
          },
        },
      ),
    });
  }, [active, basename, entry, lang, name, other]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <React.Fragment>
      {apps.map((app) => {
        return (
          <div
            key={app}
            id={`${app}-micro-app`}
            style={{
              display: app === name ? 'block' : 'none',
            }}
          />
        );
      })}
    </React.Fragment>
  );
};

export default LoadMicroApp;
