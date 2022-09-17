import React from 'react';
import LoadMicro from '@/components/load-micro';
import './index.global.less';

const MirrorPage = () => {
  return (
    <LoadMicro
      entry={`//localhost:3001/#/`}
      name="topic-ui"
      active="/home"
    />
  );
};

export default MirrorPage;
