import * as types from './actionTypes';

export const addTrack = (trackInfo) => {
  return {
    type: types.ADD_TO_PLAYLIST,
    trackInfo,
  }
}

export const removeTrack = (index) => {
  return {
    type: types.REMOVE_FROM_PLAYLIST,
    index,
  }
}
