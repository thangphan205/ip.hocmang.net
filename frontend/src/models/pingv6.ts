import { Effect, Reducer } from 'umi';
import { IPv6Ping } from '../services/ipv6';

export interface StateTypePingV6 {
  data_pingv6: [];
}

export interface ModelType {
  namespace: string;
  state: StateTypePingV6;
  effects: {
    fetch: Effect;
  };
  reducers: {
    pingv6Result: Reducer<StateTypePingV6>;
  };
}

const Model: ModelType = {
  namespace: 'pingv6',

  state: {
    data_pingv6: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(IPv6Ping, payload);

      yield put({
        type: 'pingv6Result',
        payload: response,
      });
    },

  },

  reducers: {

    pingv6Result(state, action) {

      return {
        ...state,
        data_pingv6: action.payload,
      };
    },

  }
}
export default Model;
