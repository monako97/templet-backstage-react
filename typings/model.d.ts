interface AppStore {
  global: GlobalModelType;
  account: AccountModelType;
  menu: MenuModelType;
  appProgram: AppProgramModelType;
}

interface ItemTypes extends RouterProps {
  key: string;
  type?: string;
  label?: React.ReactNode;
  children?: ItemTypes[];
  [key: string]: any;
}

interface AppProgramModelType {
  menu: ItemTypes[];
  menuKV: Record<string, ItemTypes>;
  activeKey?: string;
  tabs: TabProps[];
}

interface TabProps extends RouterProps {
  key: string;
  url?: string;
  path?: string;
  closable?: boolean;
}
