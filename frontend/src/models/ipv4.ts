import { Effect, Reducer } from 'umi';
import { queryIPAddress } from '../services/ipv4';

export interface StateType {
  data_ipv4: {};
  data_pingv4: {};
  data_traceroutev4: {};
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'ipv4',

  state: {
    data_ipv4: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryIPAddress, payload);
      yield put({
        type: 'queryList',
        payload: response.data,
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        data_ipv4: action.payload,
      };
    },
  }
}
export default Model;
