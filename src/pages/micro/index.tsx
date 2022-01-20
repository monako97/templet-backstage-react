import React, { useEffect, useState, useRef } from 'react';
import { loadMicroApp, MicroApp } from 'qiankun';
import './index.global.less';

const MirrorPage = () => {
  const [, setMicroApp] = useState<MicroApp>();
  const el = useRef(null);

  useEffect(() => {
    const _microApp = loadMicroApp(
      {
        name: 'micro',
        entry: `//localhost:3000/`,
        container: el.current as unknown as HTMLElement,
        props: {
          basename: '/micro',
        },
      },
      {
        fetch(url, ...args) {
          if (/^\/\/localhost:3000/.test(url as string)) {
            return window.fetch(url, {
              ...args,
              mode: 'cors',
              // credentials: "include",
            });
          }

          return window.fetch(url, ...args);
        },
      }
    );

    setMicroApp(_microApp);
    return () => {
      _microApp?.unmount();
    };
  }, []);

  return <div ref={el} />;
};

export default MirrorPage;
