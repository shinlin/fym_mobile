import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';
import { color } from './config'
import { Actions } from 'react-native-router-flux'

export default class LoginView extends Component {

  static propTypes = {
    isLoggedIn: React.PropTypes.bool,
    data: React.PropTypes.object,
  }

  static defaultProps = {
    isLoggedIn: false,
    data: {},
  }

  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    // Get accessToken from local storage
    AsyncStorage.getItem("accessToken").then((value) => {
      this.setState({ "accessToken": value });
    }).done();
  }
  
  render() {

    return (
      <View style={styles.container}>
        { this.loginButton() }
        <Text onPress={() => Actions.main()}>Skip</Text>
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
      <TouchableHighlight onPress={() => this._onLogin() }>
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

  _onLogin() {
    this.props.login();
  }

  _onLogout() {
    this.props.logout();
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