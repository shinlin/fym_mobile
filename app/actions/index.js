import * as types from './actionTypes';

const requestFetch = () => {
  return {
    type: types.FETCH_REQUEST,
    isFetching:true,
  }
}

const receiveSuccess = (json) => {
  return {
    type: types.FETCH_SUCCESS,
    isFetching: false,
    items: json.top99,
  }
}

const receiveFailure = (error) => {
  return {
    type: types.FETCH_FAILURE,
    isFetching: false,
    error,
  }
}

var URL_HOT99 = 'http://www.feedyourmusic.com/top99';

export const fetchItems = () => {
  return (dispatch) => {
    dispatch(requestFetch());
    return fetch(URL_HOT99)
      .then(request => request.json())
      .then(json => dispatch(receiveSuccess(json)))
      .catch(error => dispatch(receiveFailure(error)))
  }
}
