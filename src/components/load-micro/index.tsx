import React, { useCallback, useEffect, useRef } from 'react';
import { loadMicroApp, MicroApp } from 'qiankun';
import { isEqual } from 'lodash';
import { useNavigate, rootStore } from 'PackageNameByCore';

const microApps: Record<string, MicroApp> = {};

const MirrorPage: React.FC<{
  name: string;
  entry: string;
  basename?: string;
}> = ({ name, entry, basename = '/', ...other }) => {
  const el = useRef(null);
  const navigate = useNavigate();
  const targetTabs = useCallback(
    (args: Record<string, string>) => {
      const menuKV = rootStore.getState().appProgram.menuKV;
      let menuId;

      Object.keys(menuKV).forEach((k) => {
        if (menuKV[k].menuCode === args.menuCode) {
          menuId = menuKV[k].key;
        }
      });
      navigate(`${args.url}${menuId ? '?menuId=' + menuId : ''}`);
    },
    [navigate]
  );
  const load = useCallback(async () => {
    if (microApps[name]?.getStatus() === 'MOUNTED') {
      await microApps[name]?.unmount();
    }
    microApps[name] = loadMicroApp(
      {
        name: name,
        entry: entry,
        container: el.current as unknown as HTMLElement,
        props: {
          basename,
          ...other,
          PROJECTNAME: process.env.PROJECTNAME,
          __MicroAppEntry__: window.__MicroAppEntry__,
          currentTarget: window,
          targetTabs: targetTabs,
        },
      },
      {
        singular: false,
        prefetch: true,
        autoStart: true,
        fetch(url: RequestInfo, init?: RequestInit) {
          return window.fetch(url, {
            ...init,
            mode: 'cors',
          });
        },
      }
    );
  }, [basename, entry, name, other, targetTabs]);

  useEffect(() => {
    load();
  }, [load]);

  return <div ref={el} />;
};

const LoadMicro = React.memo(MirrorPage, isEqual);

export default LoadMicro;
