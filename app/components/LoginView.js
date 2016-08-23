import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import { color } from './config'

const FBSDK = require('react-native-fbsdk');
const {
	AccessToken,
	LoginManager,
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

export default class LoginView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loginStatus: null,
      user_name: '',
      accessToken: '',
    }
  }

  componentDidMount = () => {
    // Get accessToken from local storage
    AsyncStorage.getItem("accessToken").then((value) => {
      this.setState({ "accessToken": value });
    }).done();
  }
  
  _responseInfoCallback = ((error, result) => {
		  if (error) {
      alert(JSON.stringify(error));
    } else {

      var provider = "facebook"

      AccessToken.getCurrentAccessToken().then((accessToken) => {
        var data = {
          provider: provider,
          accessToken: accessToken.accessToken,
          uid: result.id,
          email: result.email,
          name: result.name,
          first_name: result.first_name,
          last_name: result.last_name,
          avatar_url: result.picture.data.url,
        }
        
        const UPDATE_USER_API = "http://www.feedyourmusic.com/api/v1/update_user"
        const TEST_API = "http://www.feedyourmusic.com/api/v1/test"

        fetch(UPDATE_USER_API, { method: "POST", body: JSON.stringify( data ) })
          .then((response) => {
            response.json()
            if (response.status === 200) {
              Actions.explore();
              // Save accessToken to local storage
              console.log("save data in local storage")
              AsyncStorage.setItem("accessToken", accessToken.accessToken)
              this.setState({ accessToken: accessToken.accessToken })
              this.setState({ user_name: result.name })
              
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
  })

  _onLoginWithFaceBook() {
    LoginManager.logInWithReadPermissions(['email', 'public_profile'])
      .then((result) => {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log('Login success with permissions: ' + JSON.stringify(result));

          const infoRequest = new GraphRequest(
            '/me',
            {
              parameters: {
                fields: {
                  string: 'email, name, first_name, last_name, picture.type(large)'
                }
              }
            },
            this._responseInfoCallback.bind(this),
          );

          new GraphRequestManager().addRequest(infoRequest).start();
        }
      },
      (error) => {
        console.log('Login fail with error: ' + error);
      }
    );
  }

  _onLogout() {
    LoginManager.logOut();
    AccessToken.getCurrentAccessToken().then((accessToken) => {
      AsyncStorage.setItem("accessToken", '')
      this.setState({user_name: ''})
      this.setState({accessToken: ''})
    })
  }

  render() {
    return (
      <View style={styles.container}>
        { this.loginButton() }
        <Text onPress={() => Actions.explore()}>Skip</Text>
      </View>
    )
  }

  loginButton() {
    return this.login();
    // if (this.state.accessToken) {
    //   return this.login();
    // } else {
    //   return this.logout();
    // }
  }

  login() {
    return (
      <TouchableHighlight onPress={() => this._onLoginWithFaceBook() }>
        <View style={[styles.fbButton, { backgroundColor: color.blue }]}>
          <Image source={require('../../assets/images/fb_icon.jpg') } style={styles.fbImage} />
          <Text style={styles.fbButtonText}>페이스북으로 로그인 하기</Text>
        </View>
      </TouchableHighlight>
    );
  }

  logout() {
    return (
      <TouchableHighlight onPress={() => this._onLogout() }>
        <View style={[styles.fbButton, { backgroundColor: color.blue }]}>
          <Image source={require('../../assets/images/fb_icon.jpg') } style={styles.fbImage} />
          <Text style={styles.fbButtonText}>로그아웃</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fbButton: {
    height: 48,
    margin: 16,
		flexDirection: 'row',
	},
	fbImage: { 
		marginTop: 10,
		marginLeft: 10,
		width: 25,
		height: 25,
	},
  fbButtonText: {
		marginTop: 12,
		marginLeft: 25,
    marginRight: 20,
    textAlign: 'left',
    color: color.white,
    fontSize: 16,
  },
})