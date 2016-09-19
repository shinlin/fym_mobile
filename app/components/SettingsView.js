import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  Image,
  RefreshControl,
} from 'react-native';

import Icon from 'react-native-vector-icons/Foundation';

class SettingsView extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }
  
  render() {
    return(
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <Text>Settings View</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  list: {
  },
  contentContainer: {
    paddingBottom: 50 + 64,

  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems:'center',
    justifyContent:'center',
    margin: 5,
  },
  textContainer: {
    flex:1,
    margin: 5,
  },
  image: {
    width:48,
    height:48,
    borderRadius: 24,
  },
  icon: {
    width:20,
    height:20,
    position: 'absolute',
    right:0,
    bottom:0,
    justifyContent:'center',
    alignItems:'center',
    borderWidth:0.5,
    borderColor:'white',
    borderRadius:10,    
  },
  separator: {
    height: 0.5,
    alignSelf: 'stretch',
    backgroundColor: 'darkgray',
  },
  anchorText: {
   textDecorationLine:'underline',
   color:'black',
  }
});

export default SettingsView;
