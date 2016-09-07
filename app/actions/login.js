import * as types from './actionTypes';
import { facebookLogin, getFacebookInfo, facebookLogout } from '../utils/facebookAPI';

const loggedIn = () => {
  console.log("inside loggedIn")
  return {
    type: types.LOGGED_IN,
    isLoggedIn: true,
  }
}

const loggedOut = () => {
  return {
    type: types.LOGGED_OUT,
    isLoggedIn: false,
  }
}

const updateUser = (data) => {
  console.log("updateUser --- " + data);
  return {
    type: types.UPDATE_USER,
    isLoggedIn: true,
    data: data,
  }
}

export function login() {
  console.log("login()!!!");
  return (dispatch) => {
    facebookLogin()
    .then((facebookAuthResult) => {
      console.log("inside facebookLogin().then 1 with token -- " + facebookAuthResult.accessToken)
      dispatch(loggedIn());
      return getFacebookInfo(facebookAuthResult.accessToken);
    })
    .then((facebookProfile) => {
      console.log("inside facebookLogin().then 2 " + facebookProfile)
      dispatch(updateUser(facebookProfile));
    })
    .catch((error) => {
      
    })
  }
}

export function logout() {
  return (dispatch) => {
    facebookLogout.then(() => {
      dispatch(loggedOut());
    })
  }
}



