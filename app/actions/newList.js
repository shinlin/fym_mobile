import * as types from './actionTypes';

const requestFetch = () => {
  return {
    type: types.FETCH_NEW_LIST_REQUEST,
    isFetching:true,
  }
}

const receiveSuccess = (json) => {
  return {
    type: types.FETCH_NEW_LIST_SUCCESS,
    isFetching: false,
    items: json,
  }
}

const receiveFailure = (error) => {
  return {
    type: types.FETCH_NEW_LIST_FAILURE,
    isFetching: false,
    error,
  }
}

var URL_NEW = 'http://www.feedyourmusic.com/api/v1/new_all';

export const fetchItems = () => {
  return (dispatch) => {
    dispatch(requestFetch());
    return fetch(URL_NEW)
      .then(request => request.json())
      .then(json => dispatch(receiveSuccess(json)))
      .catch(error => dispatch(receiveFailure(error)))
  }
}
