import React, { type FC, useCallback, useState } from 'react';
import { AutoComplete, type AutoCompleteProps, Input } from 'antd';
import IconFont from '@/components/iconfont';

const emailWhitelist = ['@qq.com', '@163.com', '@vip.163.com'];

export function isEmail(email: string, whitelist?: string[]): boolean {
  const domains = whitelist || emailWhitelist;

  if (/^[A-Za-z0-9]+([_\\.][A-Za-z0-9]+)*@([A-Za-z0-9\\-]+\.)+[A-Za-z]{2,6}$/.test(email)) {
    for (let i = 0, len = domains.length; i < len; i++) {
      if (email.endsWith(domains[i])) {
        return true;
      }
    }
  }
  return false;
}

interface EmailProps {
  className?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  onChange?: AutoCompleteProps['onChange'];
}

const Email: FC<EmailProps> = ({ className, placeholder, disabled, value, onChange }) => {
  const [result, setResult] = useState<AutoCompleteProps['options']>([]);
  const handleSearch = useCallback((val: string) => {
    let res: AutoCompleteProps['options'] = [],
      whitelist = emailWhitelist,
      inputValue = val;

    if (!val || val.indexOf('@') >= 0) {
      const domainVal = val.split('@');

      inputValue = domainVal[0];
      whitelist = emailWhitelist.filter((domain) => domain.includes(domainVal[1]));
    }
    res = whitelist.map((domain) => {
      const text = inputValue + domain;

      return {
        value: text,
        label: text,
      };
    });
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
      <Input prefix={<IconFont type="icon-email" />} placeholder={placeholder} />
    </AutoComplete>
  );
};

export default Email;
