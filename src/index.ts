import { dispatch, rootStore } from 'plugin-runtime';
import { isFunction, isEqual } from 'lodash';
import { initGlobalState } from 'qiankun';
import type { MicroAppStateActions } from 'qiankun';

if (process.env.PROJECTNAME) {
  document.title = process.env.PROJECTNAME;
}

dispatch({
  type: 'menu/init',
  payload: null,
});
const { global, account } = rootStore.getState();
const preState = { global, account };

const onStateChange = (state: Record<string, unknown>) => {
  const { global: preGlobalState, account: preAccountState } = rootStore.getState();

  if (!isEqual(state.account, preAccountState)) {
    dispatch({
      type: 'account/change',
      payload: state.account,
    });
  }
  if (!isEqual(state.global, preGlobalState)) {
    dispatch({
      type: 'global/change',
      payload: state.global,
    });
  }
};

const onStoreChange = (setGlobalState: MicroAppStateActions['setGlobalState']) => {
  const { global: nextGlobalState, account: nextAccountState } = rootStore.getState();
  let isChange = false;

  if (!isEqual(preState.global, nextGlobalState)) {
    preState.global = nextGlobalState;
    isChange = true;
  }
  if (!isEqual(preState.account, nextAccountState)) {
    preState.account = nextAccountState;
    isChange = true;
  }

  if (isChange) {
    setGlobalState({
      global: nextGlobalState,
      account: nextAccountState,
    });
  }
};

// 不处于微前端环境中
const actions: MicroAppStateActions = initGlobalState(preState);

actions.onGlobalStateChange(onStateChange, true);
const unSubscribe = rootStore.subscribe(() => onStoreChange(actions.setGlobalState));

window.addEventListener('beforeunload', () => {
  if (isFunction(unSubscribe)) {
    unSubscribe();
  }
  actions.offGlobalStateChange();
});
