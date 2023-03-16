import React, { useMemo } from 'react';
import { classNames } from 'PackageNameByCommon';
import { localizable } from 'PackageNameByCore';
import { Dropdown, Typography, type MenuProps } from 'antd';
import styles from './index.less';
import Icon from '../icon';

interface SwitchLanguageProps {
  className?: string;
}
const SwitchLanguage: React.FC<SwitchLanguageProps> = ({ className }: SwitchLanguageProps) => {
  const { set, language, locales } = localizable;

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
          icon: <Icon type={item.language} />,
          onClick: () => set(item.language),
          className: classNames(item.language === language && styles.selectedItem),
        };
      }),
    [language, locales, set]
  );

  return (
    <Dropdown overlayClassName={styles.switchLang} menu={{ items }}>
      <Typography.Text className={`${styles.btn} ${className ? className : ''}`}>
        <Icon type={language} />
      </Typography.Text>
    </Dropdown>
  );
};

export default SwitchLanguage;
