const FBSDK = require('react-native-fbsdk');
const {
	AccessToken,
	LoginManager,
  GraphRequest,
  GraphRequestManager,
} = FBSDK;
import { Actions } from 'react-native-router-flux'

export function getFacebookInfo() {

  console.log('getFacebookInfo()')
  return new Promise((resolve, reject) => {
    const infoCallback = (error, profile) => {
      if (error) {
        reject (error);
      }
      console.log("profile --- " + profile);
      Actions.main();
      resolve(profile);
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
      infoCallback
    );

    new GraphRequestManager().addRequest(infoRequest).start();
  })
}

export function facebookLogin() {
  return new Promise((resolve, reject) => {
    LoginManager.logInWithReadPermissions(['email', 'public_profile'])
    .then((loginResult) => {
      if (loginResult.isCancelled) {
        console.log('Login cancelled');
      } else {
        console.log('Login success with permissions: ' + JSON.stringify(loginResult));
        return AccessToken.getCurrentAccessToken();
      }
    })
    .then((result) => {
      resolve(result);
    })
    .catch((error) => {
      reject(error);
    })
  })
}

export function facebookLogout() {
  LoginManager.logOut();
}