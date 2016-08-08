import * as types from '../actions/actionTypes';
import { combineReducers } from 'redux';

const dummy = (state = { msg: 'dummy' }, action) => {
  switch(action.type) {
    case types.DUMMY_ACTION:
      return { ...state, msg: action.msg }
    default:
      return state;
  }
}

export default combineReducers({
  dummy,
});
