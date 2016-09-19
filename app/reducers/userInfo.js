import * as types from '../actions/actionTypes';
import { LOGIN_STATUS } from '../constants/constants';

var initialState = {
  loginStatus: LOGIN_STATUS.READY,
  info: {},
}

export default userInfo = (state = initialState, action) => {
  switch(action.type) {
    case types.USER_CHANGE_LOGIN_STATUS:
      return { ...state, loginStatus: action.loginStatus }
    case types.USER_UPDATE_INFO:
      return { ...state, info: action.data }
    default:
      return state;
  }
}
