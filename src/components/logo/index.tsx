import React from 'react';
import { projectBasicInfo } from 'PackageNameByCore';
import styles from './index.less';

const Title: React.FC<{ show?: boolean }> = ({ show }) => {
  return show ? (
    <div className={styles.logo}>
      <div className={styles.icon} />
      <div className={`${styles.title} text-ellipsis`}>{projectBasicInfo.programInfo.description}</div>
    </div>
  ) : null;
};

export default Title;
