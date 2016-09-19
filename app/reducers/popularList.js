import * as types from '../actions/actionTypes';

var initialState = {
  isFetching: false,
  error: '',
  items: [],
}

export default fetchPopularList = (state = initialState, action) => {
  switch(action.type) {
    case types.FETCH_POPULAR_LIST_REQUEST:
      return { ...state, isFetching: true}
    case types.FETCH_POPULAR_LIST_SUCCESS:
      return { ...state, isFetching: false, items: action.items}
    case types.FETCH_POPULAR_LIST_FAILURE:
      return { ...state, isFetching: false, error: action.error}
    default:
      return state;
  }
}
