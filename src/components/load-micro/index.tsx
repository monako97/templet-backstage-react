import React, { useCallback, useEffect, useState } from 'react';
import { addGlobalUncaughtErrorHandler, loadMicroApp } from 'qiankun';
import type { MicroApp } from 'qiankun';

// eslint-disable-next-line no-console
addGlobalUncaughtErrorHandler((event) => console.log(event));

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
  const [apps, setApps] = useState<string[]>(name ? [name] : []);

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
        }
      ),
    });
  }, [active, basename, entry, name, other]);

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
