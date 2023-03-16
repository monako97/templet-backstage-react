declare module '*.less';
declare module '*.css';
declare module '*.js';
declare module '*.ts';
declare module '*.png';
declare module './index.less' {
  const styles: Record<string, string>;

  export default styles;
}

type MicrrorAppConf = {
  desc: string;
  name: string;
  url: string;
  basename: string;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  primaryApp?: Record<string, any>;
}
