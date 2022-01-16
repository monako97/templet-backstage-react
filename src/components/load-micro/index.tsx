import React, { useEffect, useState, useRef } from 'react';
import { loadMicroApp, MicroApp } from 'qiankun';
import { isEqual } from 'lodash';

const MirrorPage: React.FC<{
  name: string;
  entry: string;
  basename?: string;
}> = ({ name, entry, basename = '/micro' }) => {
  const [, setMicroApp] = useState<MicroApp>();
  const el = useRef(null);

  useEffect(() => {
    const _microApp = loadMicroApp(
      {
        name: name,
        entry: entry,
        container: el.current as unknown as HTMLElement,
        props: {
          basename: basename,
        },
      },
      {
        fetch(url, ...args) {
          return window.fetch(url, {
            ...args,
            mode: 'cors',
          });
        },
      }
    );

    setMicroApp(_microApp);
    return () => {
      _microApp?.unmount();
    };
  }, [basename, entry, name]);

  return <div ref={el} />;
};

const LoadMicro = React.memo(MirrorPage, isEqual);

export default LoadMicro;
