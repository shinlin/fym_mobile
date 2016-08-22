import { AsyncStorage }  from 'react-native';
import * as types from './actionTypes';

export const receiveList = (json) => {
  return {
    type: types.LOAD_PLAYLIST_FROM_DISK,
    tracks: json.tracks,
  }
}

export const loadPlaylist = () => {
  return (dispatch) => {
    return AsyncStorage.getItem('PLAYLIST')
            .then((jsonState) => JSON.parse(jsonState) || {})
            .then(json => dispatch(receiveList(json)))
            .catch(error => console.log(error));
  }
}

export const savePlaylist = (tracks) => {
  return (dispatch) => {
    const jsonState = JSON.stringify(tracks);
    return AsyncStorage.setItem('PLAYLIST', jsonState, () => {
      // This is only for testing and should be removed later
      AsyncStorage.getItem('PLAYLIST', (err, result) => {
        console.log(result);
      })
    })
  }
}

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
