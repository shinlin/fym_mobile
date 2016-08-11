import * as types from '../actions/actionTypes';
import { combineReducers } from 'redux';

initialState = {
  isFetching: false,
  error: '',
  items: [],
}

const fetch = (state = initialState, action) => {
  switch(action.type) {
    case types.FETCH_REQUEST:
      return { ...state, isFetching: true}
    case types.FETCH_SUCCESS:
      return { ...state, isFetching: false, items: action.items}
    case types.FETCH_FAILURE:
      return { ...state, isFetching: false, error: action.error}
    default:
      return state;
  }
}

export default combineReducers({
  fetch,
});
