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
import FBSDK from 'react-native-fbsdk';

const { LoginButton } = FBSDK

export default class UserView extends Component {

  static propTypes = {
    userInfo: React.PropTypes.object,
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
  }

  _testFunction() {
    console.log("hhahhhhhh");
    if(!this.props.userInfo.isLoggedIn) {
      Actions.login();
    }
  }

  _logout() {
    console.log(this.props);
    this.props.logoutRequest();
  }
  
  render() {
    const { userInfo } = this.props;

    return (
      <View style={styles.container}>
        <Text>Welcome~~~!!!</Text>
        <Text onPress={() => this._testFunction()}>{userInfo.isLoggedIn ? userInfo.info.name : '로그인이 필요합니다'}</Text>
        <Text>testing!!</Text>
        <Text onPress={() => this._logout()}>로그 아웃</Text>
      </View>
    )
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