const FBSDK = require('react-native-fbsdk');
const {
	AccessToken,
	LoginManager,
  GraphRequest,
  GraphRequestManager,
} = FBSDK;
import { Actions } from 'react-native-router-flux'

export function facebookLogin() {
  return new Promise((resolve, reject) => {
    LoginManager.logInWithReadPermissions(['email', 'public_profile'])
    .then((loginResult) => {
      if (loginResult.isCancelled) {
        console.log('Login cancelled -- ');
        resolve('CANCELLED');
      } else {
        console.log('Login success : ' + JSON.stringify(loginResult));
        resolve('SUCCESS');
      }
    })
    .catch((error) => {
      reject(error);
    })
  })
}

export function getFacebookInfo() {
  return new Promise((resolve, reject) => {
    const infoCallback = (error, profile) => {
      if (error) {
        reject (error);
      }

      const UPDATE_USER_API = "http://www.feedyourmusic.com/api/v1/update_user"
      const TEST_API = "http://www.feedyourmusic.com/api/v1/test"
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

        fetch(UPDATE_USER_API, { method: "POST", body: JSON.stringify(data) })
          .then((response) => {
            response.json()
            if (response.status === 200) {
              Actions.main();
              resolve(data);

              fetch(TEST_API, {
                method: "GET", headers: {
                  'Authorization': "Token token=" + accessToken.accessToken
                }
              })
                .then((response) => {
                  console.log("response from TEST_API")
                  console.log(response)
                })
                .catch((error) => {
                  console.warn(error)
                })
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
      infoCallback
    );

    new GraphRequestManager().addRequest(infoRequest).start();
  })
}

export function facebookLogout() {
  LoginManager.logOut();
}