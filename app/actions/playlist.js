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

export const savePlaylist = (tracks) => {
  return (dispatch) => {
    const jsonState = JSON.stringify(tracks);
    return AsyncStorage.setItem('PLAYLIST', jsonState, () => {
      // This is only for testing and should be removed later
      AsyncStorage.getItem('PLAYLIST', (err, result) => {
        //console.log(result);
      })
    })
  }
}

export const addTrack = (trackInfo, setCurrent) => {
  return (dispatch, getState) => {

    dispatch({
      type: types.ADD_TO_PLAYLIST,
      trackInfo,
    });

    if (setCurrent) {
      const { tracks } = getState().playlist;
      dispatch({
        type: types.CHANGE_PLAYER_TRACK,
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
