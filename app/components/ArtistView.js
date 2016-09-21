import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import PlayerTabBar from './PlayerTabBar';
import TrackList from './TrackList';

class ArtistView extends Component {

  static propTypes = {
    userInfo: React.PropTypes.object.isRequired,
  }

  static defaultProps = {
  }

  render() {
    const { userInfo, actions } = this.props;
    const { user, songs }  = userInfo;

    return (
      <View style={{flex:1, marginTop:54}}>
        <View style={{margin:10}}>
          <View style={{flexDirection:'row', alignItems:'center', backgroundColor:'white'}}>
            <Image
              style={{width:64, height:64, borderRadius:32}}
              source={{uri:user.avatar_url}}
            />
            <View style={{flex:1, marginLeft:20}}>
              <Text style={{fontSize:14, color:'black'}}>{user.username}</Text>
              <Text style={{fontSize:12, color:'gray'}}>{user.rap_name}</Text>
            </View>
          </View>
          <View style={{flexDirection:'row', marginTop:10}}>
            <TouchableWithoutFeedback onPress={() => console.log('Following...')}>
              <View style={{marginRight:15}}>
                <Text style={{fontSize:10}}>{user.favorite_artists.length}</Text>
                <Text style={{fontSize:10}}>Following</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => console.log('Follower...')}>
              <View>
                <Text style={{fontSize:10}}>{user.followers.length}</Text>
                <Text style={{fontSize:10}}>Followers</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <ScrollableTabView 
          renderTabBar={() => (
            <PlayerTabBar 
              inactiveTextColor='gray'
              activeTextColor='black'
              textStyle={{fontSize:12}}
              containerStyle={{borderTopWidth:0.5, borderTopColor: 'lightgray', height:30}}
            />
          )}
          initialPage={0}
        >
          <TrackList tabLabel="Posted Tracks" tracks={songs}/>
          <TrackList tabLabel="Liked Tracks" tracks={user.my_likes}/>
        </ScrollableTabView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor: 'whitesmoke',
  },
  contentContainer: {

  },
  itemText: {
    fontSize:15,
    color:'black',
  }
})

module.exports = ArtistView;
