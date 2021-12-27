import { Dayjs as DayjsType } from 'dayjs';

declare module 'dayjs' {
  interface Dayjs extends DayjsType {
    fromNow();
  }
}
