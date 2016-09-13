import { AsyncStorage } from 'react-native';
import FBSDK from 'react-native-fbsdk';
const { AccessToken } = FBSDK;

import * as types from './actionTypes';
import { facebookLogin, getFacebookInfo, facebookLogout } from '../utils/facebookAPI';

import { Actions, ActionConst } from 'react-native-router-flux'

const loginSuccess = () => {
  return {
    type: types.USER_LOGIN_SUCCESS,
    isLoggedIn: true,
  }
}

const logoutSuccess = () => {
  return {
    type: types.USER_LOGOUT_SUCCESS,
    isLoggedIn: false,
  }
}

const loginCancel = () => {
  return {
    type: types.USER_LOGIN_CANCEL,
    isLoggedIn: false,
  }
}

const loginFailure = () => {
  return {
    type: types.USER_LOGIN_FAILURE,
    isLoggedIn: false,
  }
}

const updateUserInfo = (userData) => {
  return {
    type: types.USER_UPDATE_INFO,
    data: userData,
  }
}

export const getUserInfo = () => {
  return (dispatch) => {
    AccessToken.getCurrentAccessToken()
    .then((accessToken) => {
      // Retreive user information using current user access token
      fetch("http://www.feedyourmusic.com/api/v1/my_info", {
        method: "GET", 
        headers: {
          'Authorization': "Token token=" + accessToken.accessToken
        }
      })
      .then((response) => JSON.parse(response._bodyText))
      .then(json => {
        dispatch(loginSuccess());
        dispatch(updateUserInfo(json));
      })
      .catch((error) => {
        console.warn(error)
      })
    })
    .catch(error => {
      console.log(error);
    })
  }
}

export const loginRequest = () => {
  return (dispatch) => {
    facebookLogin()
    .then((facebookAuthResult) => {
      if (facebookAuthResult === 'SUCCESS') {
        dispatch(loginSuccess());
        return getFacebookInfo(facebookAuthResult);
      } else {
        dispatch(loginCancel());
      }
    })
    .then((facebookProfile) => {
      dispatch(updateUserInfo(facebookProfile));
    })
    .catch((error) => {
      dispatch(loginFailure());
    })
  }
}

export const logoutRequest = () => {
  return (dispatch) => {
    facebookLogout()
    dispatch(logoutSuccess());
    dispatch(updateUserInfo([]));
  }
}
