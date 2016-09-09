import * as types from '../actions/actionTypes';
import { combineReducers } from 'redux';
import player from './player';
import playlist from './playlist';
import newList from './newList';
import popularList from './popularList';
import mentorPick from './mentorPick';
import login from './login';

export default combineReducers({
  mentorPick,
  newList,
  popularList,
  player,
  playlist,
  login,
});
