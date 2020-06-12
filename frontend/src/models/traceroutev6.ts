import { Effect, Reducer } from 'umi';
import { IPv6Traceroute } from '../services/ipv6';

export interface StateTypeTracerouteV6 {
  data_traceroutev6: [];
}

export interface ModelType {
  namespace: string;
  state: StateTypeTracerouteV6;
  effects: {
    fetch: Effect;
  };
  reducers: {
    traceroutev6Result: Reducer<StateTypeTracerouteV6>;
  };
}

const Model: ModelType = {
  namespace: 'traceroutev6',

  state: {
    data_traceroutev6: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(IPv6Traceroute, payload);;
      yield put({
        type: 'traceroutev6Result',
        payload: response,
      });
    },
  },

  reducers: {
    traceroutev6Result(state, action) {

      return {
        ...state,
        data_traceroutev6: action.payload,
      };
    },
  }
}
export default Model;
