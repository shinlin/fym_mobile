import * as types from './actionTypes';

const requestFetch = () => {
  return {
    type: types.FETCH_MENTOR_PICK_REQUEST,
    isFetching:true,
  }
}

const receiveSuccess = (json) => {
  return {
    type: types.FETCH_MENTOR_PICK_SUCCESS,
    isFetching: false,
    items: json,
  }
}

const receiveFailure = (error) => {
  return {
    type: types.FETCH_MENTOR_PICK_FAILURE,
    isFetching: false,
    error,
  }
}

var REQUEST_URL = 'http://www.feedyourmusic.com/api/v1/mentors9';

export const fetchItems = () => {
  return (dispatch) => {
    dispatch(requestFetch());
    return fetch(REQUEST_URL)
      .then(request => request.json())
      .then(json => dispatch(receiveSuccess(json)))
      .catch(error => dispatch(receiveFailure(error)))
  }
}
