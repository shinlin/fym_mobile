import FBSDK from 'react-native-fbsdk';
const {
	AccessToken,
	LoginManager,
  GraphRequest,
  GraphRequestManager,
} = FBSDK;
import { Actions, ActionConst } from 'react-native-router-flux'

export function facebookLogin() {
  return new Promise((resolve, reject) => {
    LoginManager.logInWithReadPermissions(['email', 'public_profile'])
    .then((response) => response.isCancelled ? resolve('CANCELLED') : resolve('SUCCESS'))
    .catch((error) => {
      reject(error);
    })
  })
}

export function getFacebookInfo() {
  return new Promise((resolve, reject) => {
    const _handleResponse = (error, profile) => {
      if (error) {
        reject (error);
      }

      const UPDATE_USER_API = "http://www.feedyourmusic.com/api/v1/update_user"
      const provider = "facebook"

      AccessToken.getCurrentAccessToken().then((accessToken) => {
        var data = {
          provider: provider,
          accessToken: accessToken.accessToken,
          uid: profile.id,
          email: profile.email,
          name: profile.name,
          first_name: profile.first_name,
          last_name: profile.last_name,
          avatar_url: profile.picture.data.url,
        }

        fetch(UPDATE_USER_API, { 
          method: "POST",
          body: JSON.stringify(data)
        })
        .then((response) => {
          if (response.status === 200) {
            Actions.pop();
            resolve(data);
          }
        })
        .catch((error) => {
          console.warn(error)
        })
      })
    }

    const infoRequest = new GraphRequest(
      '/me',
      {
        parameters: {
          fields: {
            string: 'email, name, first_name, last_name, picture.type(large)'
          }
        }
      },
      _handleResponse
    );

    new GraphRequestManager().addRequest(infoRequest).start();
  })
}

export function facebookLogout() {
  LoginManager.logOut();
}
