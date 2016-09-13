import * as types from '../actions/actionTypes';

var initialState = {
  isLoggedIn: false,
  info: {},
}

export default userInfo = (state = initialState, action) => {
  switch(action.type) {
    case types.USER_LOGIN_SUCCESS:
      return { ...state, isLoggedIn: true }
    case types.USER_LOGIN_FAILURE:
      return { ...state, isLoggedIn: false }
    case types.USER_LOGIN_CANCEL:
      return { ...state, isLoggedIn: false }   
    case types.USER_LOGOUT_SUCCESS:
      return { ...state, isLoggedIn: false }
    case types.USER_UPDATE_INFO:
      return { ...state, info: action.data }
    default:
      return state;
  }
}
