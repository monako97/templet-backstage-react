import React, { useMemo } from 'react';
import { classNames } from 'PackageNameByCommon';
import { IconFont, localizable, setLanguage } from 'PackageNameByCore';
import { Dropdown, Typography, type MenuProps } from 'antd';
import styles from './index.less';

interface SwitchLanguageProps {
  className?: string;
}
const SwitchLanguage: React.FC<SwitchLanguageProps> = ({ className }: SwitchLanguageProps) => {
  const { language, locales } = localizable;

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
          onClick: () => setLanguage(item.language),
          className: classNames(item.language === language && styles.selectedItem),
        };
      }),
    [language, locales]
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
