import React from 'react';
import { IconFont, localizable } from 'PackageNameByCore';
import { Input } from 'antd';

interface InputPasswordProps {
  placeholder?: string;
  disabled?: boolean;
}

const InputPassword: React.FC<InputPasswordProps> = (props: InputPasswordProps) => {
  const { t } = localizable;

  return (
    <Input.Password
      prefix={<IconFont type="icon-password" />}
      placeholder={t['ph:password']}
      iconRender={(visible: boolean) => (
        <span>
          <IconFont type={visible ? 'icon-visible' : 'icon-invisible'} />
        </span>
      )}
      {...props}
    />
  );
};

export default InputPassword;
