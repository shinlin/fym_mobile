import * as types from './actionTypes';
import { facebookLogin, getFacebookInfo, facebookLogout } from '../utils/facebookAPI';

const loggedIn = () => {
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
  console.log("updateUser " + data.name)
  return {
    type: types.UPDATE_USER,
    isLoggedIn: true,
    data: data,
  }
}

export function login() {
  return (dispatch) => {
    facebookLogin()
    .then((facebookAuthResult) => {
      // facebookAuthResult.accessToken contains accessToken
      dispatch(loggedIn());
      return getFacebookInfo(facebookAuthResult.accessToken);
    })
    .then((facebookProfile) => {
      console.log('facebookProfile --- ' + facebookProfile.name)
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



