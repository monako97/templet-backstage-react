import React, { useCallback, useState } from 'react';
import { AutoComplete, Input } from 'antd';
import { emailWhitelist } from '@/utils';
import type { OptionsType, OptionData, OptionGroupData } from 'rc-select/lib/interface';
import HighlightText from '@/components/highlight-text';
import Icon from '@/components/icon';

interface EmailProps {
  className?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string, option: OptionsType | OptionData | OptionGroupData) => void;
}

const Email: React.FC<EmailProps> = ({
  className,
  placeholder,
  disabled,
  value,
  onChange
}: EmailProps) => {
  const [result, setResult] = useState<OptionsType>([]);
  const handleSearch = useCallback((val: string) => {
    let res: OptionsType | [] = [],
      whitelist = emailWhitelist,
      inputValue = val;

    if (!val || val.indexOf('@') >= 0) {
      const domainVal = val.split('@');

      inputValue = domainVal[0];

      whitelist = emailWhitelist.filter((domain) => domain.includes(domainVal[1]));
    }
    res = whitelist.map((domain) => ({
      value: inputValue + domain,
      label: <HighlightText text={inputValue} highlight={domain} />
    }));
    setResult(res);
  }, []);

  return (
    <AutoComplete
      options={result}
      className={className}
      value={value}
      onChange={onChange}
      onSearch={handleSearch}
      disabled={disabled}
    >
      <Input prefix={<Icon type="email" />} placeholder={placeholder} />
    </AutoComplete>
  );
};

export default Email;
