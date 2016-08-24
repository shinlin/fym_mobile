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

let FETCH_URL = 'http://www.feedyourmusic.com/api/v1/new_all';

export const fetchItems = () => {
  return (dispatch) => {
    dispatch(requestFetch());
    return fetch(FETCH_URL)
            .then(request => {
              console.log(request); 
              return request.json()
            })
            .then(json => dispatch(receiveSuccess(json)))
            .catch(error => {
              console.log('asdfasfdasfsfsaf');
              dispatch(receiveFailure(error))
            })
  }
}
