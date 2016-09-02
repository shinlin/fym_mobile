import { AsyncStorage }  from 'react-native';
import * as types from './actionTypes';

export const loadPlaylist = () => {
  return (dispatch) => {
    return AsyncStorage.getItem('PLAYLIST')
            .then((jsonState) => JSON.parse(jsonState) || {})
            .then(json => dispatch({
              type: types.LOAD_PLAYLIST_FROM_DISK,
              tracks: json.tracks || [],
            }))
            .catch(error => console.log(error));
  }
}

const savePlaylist = (getState) => {
  const { playlist } = getState();
  const jsonState = JSON.stringify(playlist);
  AsyncStorage.setItem('PLAYLIST', jsonState, () => {
    // This is only for testing and should be removed later
    AsyncStorage.getItem('PLAYLIST', (err, result) => {
      //console.log(JSON.parse(result));
    })
  })
}

export const clearTracks = () => {
  return (dispatch) => {
    dispatch({
      type: types.CLEAR_PLAYLIST,
    })
  }
}

export const addTracks = (tracks, startIndex) => {
  return (dispatch, getState) => {
    dispatch({
      type: types.ADD_TO_PLAYLIST,
      trackInfo: tracks,
    });

    savePlaylist(getState);

    if (startIndex >= 0) {
      dispatch({
        type: types.CHANGE_CURRENT_TRACK,
        index: startIndex,
      })
    }    
  }
}

export const addTrack = (trackInfo, setCurrent) => {
  return (dispatch, getState) => {

    dispatch({
      type: types.ADD_TO_PLAYLIST,
      trackInfo,
    });

    savePlaylist(getState);

    if (setCurrent) {
      const { tracks } = getState().playlist;
      dispatch({
        type: types.CHANGE_CURRENT_TRACK,
        index: tracks.length-1,
      })
    }
  }
}

export const removeTrack = (index) => {
  return {
    type: types.REMOVE_FROM_PLAYLIST,
    index,
  }
}
