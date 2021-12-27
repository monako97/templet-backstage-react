/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-unused-vars */
interface ModelActionType {
  type: string;
  payload?: any;
}

interface ModelEffectMap {
  put<A extends Action>(action: A): PutEffect<A>;
  call: Function;
  select: Function;
  cancel: Function;
  [key: string]: any;
}

type DispatchType = React.Dispatch<ModelActionType>;

type SubscriptionParams = {
  dispatch: DispatchType;
  history: History<unknown>;
};

type Subscription = (params: SubscriptionParams, onError: onErrorFunc) => void | (() => void);

interface ModelType<T> {
  namespace: string;
  state: T;
  reducers?: {
    [key: string]: (state: T, action: ModelActionType) => T;
  };
  effects?: {
    [key: string]: (action: ModelActionType, effects: ModelEffectMap) => Generator<any, void, any>;
  };
  subscriptions?: {
    [key: string]: Subscription;
  };
}
