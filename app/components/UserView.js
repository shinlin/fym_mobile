import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import { color } from './config'
import { Actions } from 'react-native-router-flux'
import FBSDK from 'react-native-fbsdk';
import Icon from 'react-native-vector-icons/Ionicons';

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

  _logout() {
    console.log(this.props);
    this.props.logoutRequest();
  }
  
  render() {
    const { userInfo } = this.props;
    const { info } = userInfo; 

    return (
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <TouchableHighlight onPress={() => Actions.artist()}>
          <View style={{flexDirection:'row', alignItems:'center', backgroundColor:'white'}}>
            <Image
              style={{width:64, height:64, margin:10}}
              source={{uri:'https://unsplash.it/64/64'}}
            />
            <View style={{flex:1}}>
              <Text style={{fontSize:14, color:'black'}}>Hunkyo Jung</Text>
              <Text style={{fontSize:12, color:'tomato'}}>View profile</Text>
            </View>
          </View>
        </TouchableHighlight>

        <View style={{marginVertical:15}}>
          <TouchableHighlight onPress={() => console.log("Show following....")}>
            <View style={{flexDirection:'row', backgroundColor:'white', height:50, alignItems:'center', justifyContent: 'space-between', paddingHorizontal:10, borderTopWidth:0.5, borderColor:'gray'}}>
              <Text style={styles.itemText}>Listening history</Text>
              <Icon name='ios-arrow-forward' size={25}/>
            </View>
          </TouchableHighlight>  
          <TouchableHighlight onPress={() => console.log("Show following....")}>
            <View style={{flexDirection:'row', backgroundColor:'white', height:50, alignItems:'center', justifyContent: 'space-between', paddingHorizontal:10, borderTopWidth:0.5, borderColor:'gray'}}>
              <Text style={styles.itemText}>Likes</Text>
              <Icon name='ios-arrow-forward' size={25}/>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => console.log("Show following....")}>
            <View style={{flexDirection:'row', backgroundColor:'white', height:50, alignItems:'center', justifyContent: 'space-between', paddingHorizontal:10, borderTopWidth:0.5, borderBottomWidth:0.5, borderColor:'gray'}}>
              <Text style={styles.itemText}>Published tracks</Text>
              <Icon name='ios-arrow-forward' size={25}/>
            </View>
          </TouchableHighlight>  
        </View>

        <TouchableHighlight onPress={() => Actions.settings()}>
          <View style={{flexDirection:'row', backgroundColor:'white', height:50, alignItems:'center', justifyContent: 'space-between', paddingHorizontal:10, borderTopWidth:0.5, borderColor:'gray'}}>
            <Text style={styles.itemText}>Settings</Text>
            <Icon name='ios-arrow-forward' size={25}/>
          </View>
        </TouchableHighlight>  
        <TouchableHighlight onPress={() => console.log("Go to help page...")}>
          <View style={{flexDirection:'row', backgroundColor:'white', height:50, alignItems:'center', justifyContent: 'space-between', paddingHorizontal:10, borderTopWidth:0.5, borderBottomWidth:0.5, borderColor:'gray'}}>
            <Text style={styles.itemText}>Help</Text>
          </View>
        </TouchableHighlight>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'whitesmoke',
  },
  contentContainer: {

  },
  itemText: {
    fontSize:15,
    color:'black',
  }
})