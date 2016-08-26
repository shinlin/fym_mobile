import * as types from '../actions/actionTypes';

var initialState = {
  tracks: [],
}

export default function playlist(state = initialState, action) {
  switch(action.type) {
  case types.ADD_TO_PLAYLIST:
    return { tracks: state.tracks.concat(action.trackInfo) }
  case types.REMOVE_FROM_PLAYLIST:
    return { tracks: state.splice(action.index, 1) }
  case types.LOAD_PLAYLIST_FROM_DISK:
    return { tracks: action.tracks }
  case types.CLEAR_PLAYLIST:
    return { tracks: [] };
  case types.SAVE_PLAYLIST_TO_DISK:
    return state;
  default:
      return state;
  }
}
