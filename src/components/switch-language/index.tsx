import React, { useMemo } from 'react';
import localizable, { locales, setLang } from '@app/locales';
import { Dropdown, type MenuProps, Typography } from 'antd';

import IconFont from '@/components/iconfont';

import * as styles from './index.less';

interface SwitchLanguageProps {
  className?: string;
}
const SwitchLanguage: React.FC<SwitchLanguageProps> = ({ className }: SwitchLanguageProps) => {
  const { language } = localizable.lang;

  const items = useMemo<MenuProps['items']>(
    () =>
      locales.map((item, i) => {
        return {
          key: `${item.language}-${i}`,
          label: (
            <div className={styles.label}>
              {item.title}
              <span>{item.language}</span>
            </div>
          ),
          icon: <IconFont type={`icon-${item.language}`} />,
          onClick: () => setLang(item.language),
        };
      }),
    [],
  );

  return (
    <Dropdown overlayClassName={styles.switchLang} menu={{ items }}>
      <Typography.Text className={`${styles.btn} ${className ? className : ''}`}>
        <IconFont type={`icon-${language}`} />
      </Typography.Text>
    </Dropdown>
  );
};

export default SwitchLanguage;
