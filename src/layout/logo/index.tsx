import React from 'react';
import app from '@app/info';
import { Typography } from 'antd';

import * as styles from './index.less';

const Logo = ({ collapsed }: { collapsed: boolean }) => {
  return collapsed ? null : (
    <div className={styles.logo}>
      <Typography.Title level={5} ellipsis className={styles.title}>
        {app.description}
      </Typography.Title>
    </div>
  );
};

export default Logo;
