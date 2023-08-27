import React from 'react';
import { useOutlet } from '@moneko/react';
import { Skeleton } from 'antd';

const Fallback = () => {
  const outlet = useOutlet();

  return outlet?.props.children ? outlet?.props.children : <Skeleton title active />;
};

export default Fallback;
