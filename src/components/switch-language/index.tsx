import React, { useMemo } from 'react';
import { useLocale, locales } from 'PackageNameByCore';
import { Button, Dropdown, Menu } from 'antd';
import styles from './index.less';
import Icon from '../icon';
import { ItemType } from 'antd/es/menu/hooks/useItems';

interface SwitchLanguageProps {
  className?: string;
}
const SwitchLanguage: React.FC<SwitchLanguageProps> = ({ className }: SwitchLanguageProps) => {
  const { switchLanguage, getLocal, lang } = useLocale();

  const items = useMemo(
    () =>
      locales.map((item) => {
        return {
          label: (
            <div className={styles.label}>
              {item.title}
              <span>{item.namespace}</span>
            </div>
          ),
          icon: <Icon type={item.namespace} />,
          onClick: () => switchLanguage(item.namespace),
          // eslint-disable-next-line no-undefined
          className: item.namespace === lang ? styles.selectedItem : undefined,
        };
      }) as unknown as ItemType[],
    [lang, switchLanguage]
  );

  return (
    <Dropdown
      overlay={<Menu items={items} />}
      placement="bottom"
      overlayClassName={styles.switchLang}
    >
      <Button className={`flex f-a-c ${styles.btn} ${className ? className : ''}`} type="text">
        <Icon type={getLocal().namespace} />
      </Button>
    </Dropdown>
  );
};

export default SwitchLanguage;
