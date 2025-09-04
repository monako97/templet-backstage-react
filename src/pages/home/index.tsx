import React from 'react';
import localizable from '@app/locales';

import Marquee from '@/components/marquee';
import { account } from '@/store/account';

import * as styles from './index.less';

const Home: React.FC = () => {
  const { t } = localizable;
  const { info } = account;

  return (
    <React.Fragment>
      <Marquee>公告: 这是一段弹幕</Marquee>
      <div className={styles.details}>
        <details>
          <summary>{t['user-info']}</summary>
          <pre>
            <code>{JSON.stringify(info, null, 4)}</code>
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
