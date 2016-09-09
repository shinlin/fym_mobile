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

const loginCancelled = () => {
  return {
    type: types.LOGIN_CANCELLED,
    isLoggedIn: false,
  }
}

const loginFailed = () => {
  return {
    type: types.LOGIN_FAILED,
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
      if (facebookAuthResult === 'SUCCESS') {
        dispatch(loggedIn());
        return getFacebookInfo(facebookAuthResult);
      } else {
        console.log("login cancelled!")
        dispatch(loginCancelled());
      }
    })
    .then((facebookProfile) => {
      dispatch(updateUser(facebookProfile));
    })
    .catch((error) => {
      console.log("login failed!!")
      dispatch(loginFailed());
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



