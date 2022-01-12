import React from 'react';
import { useLocale, locales } from 'plugin-runtime';
import { Button, Dropdown, Menu } from 'antd';
import styles from './index.less';
import Icon from '../icon';

interface SwitchLanguageProps {
  className?: string;
}
const SwitchLanguage: React.FC<SwitchLanguageProps> = ({ className }: SwitchLanguageProps) => {
  const { switchLanguage, getLocal, lang } = useLocale();
  const handleClick = (item: string) => {
    switchLanguage(item);
  };
  const menu = (
    <Menu>
      {locales?.map((item) => {
        const selected = item.namespace === lang;

        return (
          <Menu.Item
            key={item.namespace}
            onClick={() => handleClick(item.namespace)}
            icon={<Icon type={item.namespace} />}
            // eslint-disable-next-line no-undefined
            className={selected ? styles.selectedItem : undefined}
            // disabled={selected}
          >
            <div className={styles.label}>
              {item.title}
              <span>{item.namespace}</span>
            </div>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomCenter" overlayClassName={styles.switchLang}>
      <Button className={`flex f-a-c ${styles.btn} ${className ? className : ''}`} type="text">
        <Icon type={getLocal().namespace} />
      </Button>
    </Dropdown>
  );
};

export default SwitchLanguage;
