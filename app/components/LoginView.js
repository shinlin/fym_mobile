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
import { Actions, ActionConst } from 'react-native-router-flux'
import FBSDK from 'react-native-fbsdk';

const { LoginButton } = FBSDK

export default class LoginView extends Component {

  static propTypes = {
  }

  static defaultProps = {
  }

  render() {
    const { userInfo, loginRequest } = this.props;

    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => loginRequest() }>
          <View style={[styles.fbButton, { backgroundColor: color.blue }]}>
            <Image source={require('../../assets/images/fb_icon.jpg') } style={styles.fbImage} />
            <Text style={styles.fbButtonText}>페이스북으로 로그인 하기</Text>
          </View>
        </TouchableHighlight>

        <Text onPress={() => Actions.main({type:ActionConst.REPLACE})}>Continue without signing in</Text>
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