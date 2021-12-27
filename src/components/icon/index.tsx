import React from 'react';
import createFromIconfontCN from '@ant-design/icons/es/components/IconFont';

interface IconProps {
  type: string;
  className?: string;
}
const AntIcon = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_2632005_3dawi8hz5x3.js', // i18n
    '//at.alicdn.com/t/font_2446726_525dowa25vp.js' // i18n icon
  ]
});

const Icon: React.FC<IconProps> = ({ type, className }: IconProps) => {
  return <AntIcon type={'icon-' + type} className={className} />;
};

export default Icon;
