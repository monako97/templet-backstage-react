import React from 'react';
import { Layout } from 'antd';
import styles from './index.less';
import { projectBasicInfo } from 'plugin-runtime';

const year = new Date().getFullYear();

const LayoutFooter: React.FC = () => {
  return (
    <Layout.Footer className={styles.layoutFooter}>
      <p>
        <a target="_blank" rel="noopener noreferrer">
          {projectBasicInfo.projectName}
        </a>
        &nbsp;&copy; {year} Created by&nbsp;
        <a target="_blank" rel="noopener noreferrer">
          {JSON.stringify(projectBasicInfo.programInfo.author)}
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
