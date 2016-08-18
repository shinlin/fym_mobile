import * as types from '../actions/actionTypes';

var initialState = {
  status: 'init'
}

export default function player(state = initialState, action) {
  switch(action.type) {
  case types.CHANGE_PLAYER_STATUS:
      return Object.assign({}, state, {
          status: action.status
      })
  default:
      return state;
  }
}
