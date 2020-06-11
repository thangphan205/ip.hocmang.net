import { Effect, Reducer } from 'umi';
import { IPv4Traceroute } from '../services/ipv4';

export interface StateType {
  data_traceroutev4: [];
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
  };
  reducers: {
    traceroutev4Result: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'traceroutev4',

  state: {
    data_traceroutev4: [],
  },

  effects: {

    *fetch({ payload }, { call, put }) {
      const response = yield call(IPv4Traceroute, payload);
      console.log(response);
      yield put({
        type: 'traceroutev4Result',
        payload: response,
      });
    },
  },

  reducers: {
    traceroutev4Result(state, action) {

      return {
        ...state,
        data_traceroutev4: action.payload,
      };
    },
  }
}
export default Model;
