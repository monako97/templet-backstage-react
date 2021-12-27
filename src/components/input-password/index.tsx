import React from 'react';
import Icon from '@/components/icon';
import { Input } from 'antd';
import { useLocale } from 'plugin-runtime';

interface InputPasswordProps {
  placeholder?: string;
  disabled?: boolean;
}

const InputPassword: React.FC<InputPasswordProps> = (props: InputPasswordProps) => {
  const { getLanguage } = useLocale();

  return (
    <Input.Password
      prefix={<Icon type="password" />}
      placeholder={getLanguage('ph:password')}
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
