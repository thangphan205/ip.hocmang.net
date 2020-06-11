import { Effect, Reducer } from 'umi';
import { IPv4Ping } from '../services/ipv4';

export interface StateType {
  data_pingv4: [];
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
  };
  reducers: {
    pingv4Result: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'pingv4',

  state: {
    data_pingv4: [],
  },

  effects: {

    *fetch({ payload }, { call, put }) {
      console.log(payload);

      const response = yield call(IPv4Ping, payload);
      console.log(response);
      yield put({
        type: 'pingv4Result',
        payload: response,
      });
    },

  },

  reducers: {

    pingv4Result(state, action) {

      return {
        ...state,
        data_pingv4: action.payload,
      };
    },

  }
}
export default Model;
