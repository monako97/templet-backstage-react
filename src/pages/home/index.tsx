import React from 'react';
import { localizable } from 'PackageNameByCore';
import styles from './index.less';
import { account } from '@/store';

const Home: React.FC = () => {
  const { t } = localizable;

  return (
    <React.Fragment>
      <div className={styles.details}>
        <details>
          <summary>{t['user-info']}</summary>
          <pre>
            <code>{JSON.stringify(account.info, null, 4)}</code>
          </pre>
        </details>
        <details>
          <summary>Location</summary>
          <pre>
            <code>{JSON.stringify(window.location, null, 4)}</code>
          </pre>
        </details>
      </div>
    </React.Fragment>
  );
};

export default Home;
