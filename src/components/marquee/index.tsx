import React, { type MouseEvent, type ReactNode } from 'react';

type MarqueeProps = { children: ReactNode };

interface EventTarget {
  stop(): void;
  start(): void;
}

const Marquee: React.FC<MarqueeProps> = ({ children }: { children: ReactNode }) => {
  return React.createElement(
    'marquee',
    {
      scrollamount: 10,
      onMouseOver: (el: MouseEvent) => (el.target as unknown as EventTarget).stop(),
      onMouseOut: (el: MouseEvent) => (el.target as unknown as EventTarget).start(),
    },
    children,
  );
};

export default Marquee;
