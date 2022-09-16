import type { ModelType } from 'PackageNameByCore';

const model: ModelType<GlobalModelType> = {
  namespace: 'global',
  state: {
    loginModalVisible: false,
    updatePasswordVisible: false,
  },
  reducers: {
    toggleLoginModalVisible: (state, { payload }) => {
      return {
        ...state,
        loginModalVisible: payload,
      };
    },
    change: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {},
};

export default model;
