import * as types from './actionTypes';

export const changePlayerStatus = (status) => {
  return {
    type: types.CHANGE_PLAYER_STATUS,
    status
  }
}
