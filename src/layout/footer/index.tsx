import React from 'react';
import { author, projectName, repository } from '@app/info';
import { Layout, Typography } from 'antd';

import * as styles from './index.less';

const year = new Date().getFullYear();

const LayoutFooter: React.FC = () => {
  return (
    <Layout.Footer className={styles.footer}>
      <Typography.Text type="secondary">
        <Typography.Link href={repository.url} target="_blank" rel="noopener noreferrer">
          {projectName}
        </Typography.Link>
        {` © ${year} Created by `}
        <Typography.Link href={author.url} target="_blank" rel="noopener noreferrer">
          {author.name}
        </Typography.Link>
      </Typography.Text>
      <Typography.Text type="secondary">
        <Typography.Link href="https://www.moneko.club" target="_blank" rel="noopener noreferrer">
          前往主站
        </Typography.Link>
        <Typography.Link
          href="https://beian.miit.gov.cn/#/Integrated/recordQuery"
          target="_blank"
          rel="noopener noreferrer"
        >
          浙ICP备**********号-1
        </Typography.Link>
      </Typography.Text>
    </Layout.Footer>
  );
};

export default LayoutFooter;
