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

export default class UserView extends Component {

  static propTypes = {
    isLoggedIn: React.PropTypes.bool,
    data: React.PropTypes.object,
  }

  static defaultProps = {
    isLoggedIn: false,
    data: {},
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.data.name,
    });
  }

  constructor(props) {
    super(props);

    this.state = {
      name: '',
    }

  }
  
  render() {

    return (
      <View style={styles.container}>
        <Text>Welcome~~~!!!</Text>
        <Text>{this.state.name}</Text>
        <Text>testing!!</Text>
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