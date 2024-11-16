import React, { useCallback } from 'react';
import localizable from '@app/locales';
import { type To, useNavigate, useSearchParams } from '@moneko/react';
import { Typography } from 'antd';
import type { LinkProps } from 'antd/es/typography/Link';

interface GoBackProps extends LinkProps {
  children?: React.ReactNode;
  path?: string;
}

const GoBack: React.FC<GoBackProps> = ({ children, path, onClick, ...props }) => {
  const { t } = localizable;
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const handleBack = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      navigate(search.get('prevUrl') || path || (-1 as To));
      onClick?.(e);
    },
    [navigate, onClick, path, search],
  );

  return (
    <Typography.Link {...props} onClick={handleBack}>
      {children || t['go-back']}
    </Typography.Link>
  );
};

export default React.memo(GoBack);
