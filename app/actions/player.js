import * as types from './actionTypes';
import { CHANGE_TYPES } from '../constants/SongConstants'

export const changePlayerStatus = (status) => {
  return {
    type: types.CHANGE_PLAYER_STATUS,
    status
  }
}

export const changeRepeatMode = (repeat) => {
  return {
    type: types.CHANGE_REPEAT_MODE,
    repeat,
  }
}

export const changeShuffleMode = (shuffle) => {
  return {
    type: types.CHANGE_SHUFFLE_MODE,
    shuffle,
  }
}

export const changeCurrentTrack = (index) => {
  return {
    type: types.CHANGE_CURRENT_TRACK,
    index,
  }
}

export const changeTrack = (changeType) => {
  return (dispatch, getState) => {
    const { player, playlist } = getState();
    const { currentTrackIndex, repeat, shuffle } = player;
    const { tracks } = playlist;

    if(shuffle === 'shuffle') {
      newIndex = Math.floor((Math.random() * (tracks.length - 1)) + 0);
    } else {
      switch(repeat) {
        case 'none':
          if(changeType === CHANGE_TYPES.NEXT) {
            newIndex = currentTrackIndex+1 >= tracks.length ? currentTrackIndex : currentTrackIndex+1;
          } else {
            newIndex = currentTrackIndex-1 < 0 ? currentTrackIndex : currentTrackIndex-1;
          }
          break;
        case 'single':
          newIndex = currentTrackIndex;
          break;
        case 'all':
          if(changeType === CHANGE_TYPES.NEXT) {
            newIndex = currentTrackIndex+1 >= tracks.length ? 0 : currentTrackIndex+1;
          } else {
            newIndex = currentTrackIndex-1 < 0 ? racks.length-1 : currentTrackIndex-1;
          }
          break;
        defaut:
          newIndex = currentTrackIndex;
      }
    }

    return dispatch({
      type: types.CHANGE_CURRENT_TRACK,
      index: newIndex,
    })
  }
}