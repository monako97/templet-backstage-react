import LoadMicro from '@/components/load-micro';
import React from 'react';
import './index.global.less';

const MirrorPage = () => {
  return (
    <LoadMicro
      entry={`${window.__MicroAppEntry__['topic-ui']}#/topic/list`}
      name="topic-ui"
    />
  );
};

export default MirrorPage;
