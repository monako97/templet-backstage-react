declare module '*.less';
declare module '*.css';
declare module '*.js';
declare module '*.ts';
declare module '*.png';
declare module './index.less' {
  const styles: Record<string, string>;

  export default styles;
}

declare module 'moment' {
  import { Dayjs } from 'dayjs';
  namespace moment {
    type Moment = Dayjs;
  }
  export = moment;
  export as namespace moment;
}

type MicrrorAppConf = {
  desc: string;
  name: string;
  url: string;
  activeRule: string[];
};

interface Window {
  __MicroAppEntry__: Record<string, string>;
  __MicroAppActiveRule__: MicrrorAppConf[];
  rootInstance: {
    // eslint-disable-next-line no-unused-vars
    render(children: React.ReactChild | Iterable<React.ReactNode>): void;
    unmount(): void;
  };
}

interface PureComponentProps {
  path: string;
  selfUrl: string;
}

declare const layoutSider:
  | false
  | {
      theme?: 'light' | 'dark';
      breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    };

declare const projectName: string;
