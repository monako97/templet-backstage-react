import { Tooltip } from 'antd';
import React from 'react';

interface TextEllipsisTipProps {
  children: React.ReactNode;
}

const TextEllipsisTip: React.FC<TextEllipsisTipProps> = ({ children }: TextEllipsisTipProps) => {
  return (
    <Tooltip title={children}>
      <div className="text-ellipsis">{children}</div>
    </Tooltip>
  );
};

export default TextEllipsisTip;
