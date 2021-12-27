import * as React from 'react';
import { Skeleton } from 'antd';
import { useOutlet } from 'react-router-dom';

const Fallback: React.FC = () => {
  const outlet = useOutlet();

  return outlet?.props.children ? outlet?.props.children : <Skeleton active />;
};

export default Fallback;
