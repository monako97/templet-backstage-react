import React from 'react';
import { localizable } from 'PackageNameByCore';
import { Input } from 'antd';
import Icon from '@/components/icon';

interface InputPasswordProps {
  placeholder?: string;
  disabled?: boolean;
}

const InputPassword: React.FC<InputPasswordProps> = (props: InputPasswordProps) => {
  const { t } = localizable;

  return (
    <Input.Password
      prefix={<Icon type="password" />}
      placeholder={t['ph:password']}
      iconRender={(visible: boolean) => (
        <span>
          <Icon type={visible ? 'visible' : 'invisible'} />
        </span>
      )}
      {...props}
    />
  );
};

export default InputPassword;
