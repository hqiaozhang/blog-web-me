
import * as types from '@/actions/types';

const initialState = {
  userinfo: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOGINSUCCESS: // 登录成功
      return Object.assign({}, state, {
        userinfo: action.data
      });
    default:
      return state;
  }
}
