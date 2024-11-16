import React from 'react';
import createIconfont from '@ant-design/icons/es/components/IconFont';

export interface IconFontOption {
  scriptUrl?: string | string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extraCommonProps?: Record<string, any>;
}
interface IconBaseProps extends React.HTMLProps<HTMLSpanElement> {
  spin?: boolean;
  rotate?: number;
}
export interface IconFontProps<T extends string = string> extends IconBaseProps {
  type: T;
}

export default createIconfont({
  scriptUrl: [
    '//at.alicdn.com/t/font_2446726_525dowa25vp.js', // icon
    '//at.alicdn.com/t/c/font_2632005_1c333bnc0y4.js', // i18n
  ],
});
