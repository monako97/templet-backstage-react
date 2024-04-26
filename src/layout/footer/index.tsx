import React from 'react';
import app from '@app/info';
import { Layout } from 'antd';
import * as styles from './index.less';

const year = new Date().getFullYear();

const LayoutFooter: React.FC = () => {
  return (
    <Layout.Footer className={styles.footer}>
      <p>
        <a target="_blank" rel="noopener noreferrer">
          {app.name}
        </a>
        &nbsp;&copy; {year} Created by&nbsp;
        <a target="_blank" rel="noopener noreferrer">
          {app.author.name}
        </a>
      </p>
      <p>
        <a
          className={styles.beian}
          href="https://beian.miit.gov.cn/#/Integrated/recordQuery"
          target="_blank"
          rel="noopener noreferrer"
        >
          浙ICP备**********号-*
        </a>
      </p>
    </Layout.Footer>
  );
};

export default LayoutFooter;
