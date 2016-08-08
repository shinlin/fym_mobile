import * as types from './actionTypes';

export dummyAction = (msg) => ({
  type: types.DUMMY_ACTION,
  msg: msg,
});