import * as types from '../actions/actionTypes';

initialState = {
  isLoggedIn: false,
  data: {},
}

export default fetchLogin = (state = initialState, action) => {
  console.log("hello reducer??");
  switch(action.type) {
    case types.LOGGED_IN:
      return { ...state, isLoggedIn: true }
    case types.LOGGED_OUT:
      return { ...state, isLoggedIn: false }
    case types.UPDATE_USER:
      return { ...state, isLoggedIn: true, data: action.data }
    default:
      return state;
  }
}