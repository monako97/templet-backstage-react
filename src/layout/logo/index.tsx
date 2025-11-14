import React from 'react';
import { description } from 'app:info';
import { Typography } from 'antd';

import * as styles from './index.less';

const Logo = ({ collapsed }: { collapsed: boolean }) => {
  return collapsed ? null : (
    <div className={styles.logo}>
      <Typography.Title level={5} ellipsis className={styles.title}>
        {description}
      </Typography.Title>
    </div>
  );
};

export default Logo;
