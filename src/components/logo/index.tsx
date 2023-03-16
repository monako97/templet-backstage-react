import React, { FC } from 'react';
import { css } from '@emotion/css';
import { projectBasicInfo } from 'PackageNameByCore';
import { Typography } from 'antd';

const logo = css`
  display: flex;
  align-items: center;
`;

const title = css`
  margin: 0 !important;
  color: inherit !important;
`;

const Title: FC<{ show?: boolean }> = ({ show }) => {
  return show ? (
    <div className={logo}>
      <Typography.Title level={5} ellipsis className={title}>
        {projectBasicInfo.programInfo.description}
      </Typography.Title>
    </div>
  ) : null;
};

export default Title;
