import * as types from './actionTypes';

const requestFetch = () => {
  return {
    type: types.FETCH_POPULAR_LIST_REQUEST,
    isFetching:true,
  }
}

const receiveSuccess = (json) => {
  return {
    type: types.FETCH_POPULAR_LIST_SUCCESS,
    isFetching: false,
    items: json,
  }
}

const receiveFailure = (error) => {
  return {
    type: types.FETCH_POPULAR_LIST_FAILURE,
    isFetching: false,
    error,
  }
}

var URL_POPULAR = 'http://www.feedyourmusic.com/api/v1/top99';

export const fetchItems = () => {
  return (dispatch) => {
    dispatch(requestFetch());
    return fetch(URL_POPULAR)
      .then(request => request.json())
      .then(json => dispatch(receiveSuccess(json)))
      .catch(error => dispatch(receiveFailure(error)))
  }
}
