import React, { ReactNode, useMemo, useState } from 'react';
import { stringToHighlightJson } from '@/utils';
import styles from './index.less';

interface HighlightTextProps {
  text?: ReactNode;
  highlight?: ReactNode;
}

const HighlightText: React.FC<HighlightTextProps> = ({ text, highlight }: HighlightTextProps) => {
  const [texts, setTexts] = useState<HighlightTextJsonType>();

  useMemo(() => {
    if (typeof text === 'string') {
      let textArr = stringToHighlightJson(text);

      if (textArr) {
        setTexts(textArr);
      }
      textArr = null;
    } else {
      setTexts(null);
    }
  }, [text]);
  return (
    <div className={styles['highlight-text']}>
      {texts?.map((item, i) => {
        return (
          <span
            key={item.text + i}
            // eslint-disable-next-line no-undefined
            className={item.highlight ? styles.high : undefined}
          >
            {item.text}
          </span>
        );
      }) ?? text}
      {highlight && <span className={styles.high}>{highlight}</span>}
    </div>
  );
};

export default HighlightText;
