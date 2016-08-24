import * as types from '../actions/actionTypes';

initialState = {
  isFetching: false,
  error: '',
  items: [],
}

export default fetchNewList = (state = initialState, action) => {
  switch(action.type) {
    case types.FETCH_NEW_LIST_REQUEST:
      return { ...state, isFetching: true}
    case types.FETCH_NEW_LIST_SUCCESS:
      return { ...state, isFetching: false, items: action.items}
    case types.FETCH_NEW_LIST_FAILURE:
      return { ...state, isFetching: false, error: action.error}
    default:
      return state;
  }
}
