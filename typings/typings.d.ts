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
}
