import * as types from '../actions/actionTypes';

var initialState = {
  tracks: [],
}

export default function player(state = initialState, action) {
  switch(action.type) {
  case types.ADD_TO_PLAYLIST:
    let newTracks = state.tracks.concat(action.trackInfo);
    return { tracks: newTracks }
  case types.REMOVE_FROM_PLAYLIST:
    return { tracks: state.splice(action.index, 1) }
  default:
      return state;
  }
}
