import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

class SettingsView extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }
  
  render() {
    const { actions } = this.props;

    return(
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <TouchableHighlight onPress={() => console.log("Show following....")}>
          <View style={{flexDirection:'row', backgroundColor:'white', height:50, alignItems:'center', justifyContent: 'space-between', paddingHorizontal:10, borderTopWidth:0.5, borderColor:'gray'}}>
            <Text style={styles.itemText}>Notification</Text>
            <Icon name='ios-arrow-forward' size={25}/>
          </View>
        </TouchableHighlight>  
        <TouchableHighlight onPress={() => console.log("Show following....")}>
          <View style={{flexDirection:'row', backgroundColor:'white', height:50, alignItems:'center', justifyContent: 'space-between', paddingHorizontal:10, borderTopWidth:0.5, borderColor:'gray'}}>
            <Text style={styles.itemText}>Send app feedback</Text>
            <Icon name='ios-arrow-forward' size={25}/>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => actions.logoutRequest()}>
          <View style={{flexDirection:'row', backgroundColor:'white', height:50, alignItems:'center', justifyContent: 'space-between', paddingHorizontal:10, borderTopWidth:0.5, borderBottomWidth:0.5, borderColor:'gray'}}>
            <Text style={styles.itemText}>Logout</Text>
          </View>
        </TouchableHighlight>  
      </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'whitesmoke',
    paddingTop: 60,
  },
  contentContainer: {

  },
  itemText: {
    fontSize:15,
    color:'black',
  }
})

export default SettingsView;
