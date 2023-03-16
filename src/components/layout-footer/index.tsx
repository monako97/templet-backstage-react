import React from 'react';
import { css } from '@emotion/css';
import { projectBasicInfo } from 'PackageNameByCore';
import { Layout } from 'antd';

const footer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 73px;
  font-size: 12px;
  text-align: center;
  color: var(--disabled-color);
  background-color: transparent;
  flex-direction: column;

  a {
    color: var(--disabled-color);
  }
`;
const beian = css`
  padding: 0 12px;
`;
const year = new Date().getFullYear();

const LayoutFooter: React.FC = () => {
  return (
    <Layout.Footer className={footer}>
      <p>
        <a target="_blank" rel="noopener noreferrer">
          {projectBasicInfo.projectName}
        </a>
        &nbsp;&copy; {year} Created by&nbsp;
        <a target="_blank" rel="noopener noreferrer">
          {projectBasicInfo.programInfo.author.name}
        </a>
      </p>
      <p>
        <a
          className={beian}
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
