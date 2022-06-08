import * as React from 'react';
import { ConfigProvider, Skeleton } from 'antd';
import { projectBasicInfo, useOutlet } from 'plugin-runtime';

const Fallback = () => {
  const outlet = useOutlet();

  return outlet?.props.children ? (
    outlet?.props.children
  ) : (
    <ConfigProvider {...projectBasicInfo.providerConfig}>
      <Skeleton active />
    </ConfigProvider>
  );
};

export default Fallback;
