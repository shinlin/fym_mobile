import { AsyncStorage } from 'react-native';
import FBSDK from 'react-native-fbsdk';
const { AccessToken } = FBSDK;

import * as types from './actionTypes';
import { facebookLogin, getFacebookInfo, facebookLogout } from '../utils/facebookAPI';

import { Actions, ActionConst } from 'react-native-router-flux';
import { LOGIN_STATUS } from '../constants/constants';

const changeLoginStatus = (status) => {
  return {
    type: types.USER_CHANGE_LOGIN_STATUS,
    loginStatus: status,
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
      if(!accessToken) {
        // If accessToken is null, we assume that current login status is LOGOUT
        dispatch(changeLoginStatus(LOGIN_STATUS.LOGOUT));
      } else {
        // Check if the given accessToken is valid or not
        // TODO : here...

        // Retreive user information using current user access token
        fetch("http://www.feedyourmusic.com/api/v1/my_info", {
          method: "GET", 
          headers: {
            'Authorization': "Token token=" + accessToken.accessToken
          }
        })
        .then((response) => JSON.parse(response._bodyText))
        .then(json => {
          dispatch(changeLoginStatus(LOGIN_STATUS.LOGIN));
          dispatch(updateUserInfo(json));
        })
        .catch((error) => {
          console.warn(error)
        })
      }
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
        dispatch(changeLoginStatus(LOGIN_STATUS.LOGIN));
        return getFacebookInfo(facebookAuthResult);
      } else {
        dispatch(changeLoginStatus(LOGIN_STATUS.LOGOUT));
      }
    })
    .then((facebookProfile) => {
      dispatch(updateUserInfo(facebookProfile));
    })
    .catch((error) => {
      dispatch(changeLoginStatus(LOGIN_STATUS.LOGOUT));
    })
  }
}

export const logoutRequest = () => {
  return (dispatch) => {
    facebookLogout()
    dispatch(changeLoginStatus(LOGIN_STATUS.LOGOUT));
    dispatch(updateUserInfo([]));
  }
}
