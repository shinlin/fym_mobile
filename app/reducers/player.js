import * as types from '../actions/actionTypes';

var initialState = {
  currentTrackIndex: 0,
  status: 'init',
  repeat: 'none',
  shuffle: 'none',
}

export default function player(state = initialState, action) {
  switch(action.type) {
  case types.CHANGE_PLAYER_STATUS:
    return Object.assign({}, state, {
      status: action.status
    })
  case types.CHANGE_CURRENT_TRACK:
    return { ...state, currentTrackIndex: action.index }
  case types.CHANGE_REPEAT_MODE:
    return { ...state, repeat: action.repeat }
  case types.CHANGE_SHUFFLE_MODE:
    return { ...state, shuffle: action.shuffle } 
  default:
	  return state;
  }
}
