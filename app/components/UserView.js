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

  constructor(props) {
    super(props);
  }
  
  render() {

    return (
      <View style={styles.container}>
        <Text>Welcome~~~!!!</Text>
        <Text>{this.props.data.name}</Text>
        <Text>testing!!</Text>
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