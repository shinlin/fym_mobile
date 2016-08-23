import React, { Component } from 'react';
import { Scene, Router, TabBar, Modal, Schema, Actions, Reducer, ActionConst } from 'react-native-router-flux'

import LoginContainer from './LoginContainer';
import HomeContainer from './HomeContainer';
import SearchContainer from './SearchContainer';
import ProfileContainer from './ProfileContainer';
import PlayerContainer from './PlayerContainer';
import TabIcon from '../components/TabIcon';

export default class App extends Component {
  render() {
    return (
      <Router key='root'>
        <Scene key='login' title='Login' component={LoginContainer} initial={true} />
        <Scene key='explore' tabs={true} tabBarStyle={{backgroundColor:'rgba(125,125,125,0.4)'}} pressOpacity={0.9} >
          <Scene key='new_music' title='새로운 음악' icon={TabIcon} activeIcon='ios-star' inactiveIcon='ios-star-outline' initial={true}>
            <Scene key='tab_new_music' title='새로운 음악' component={SearchContainer}/> 
          </Scene>
          <Scene key='popular_music' title='인기 음악' icon={TabIcon} activeIcon='ios-heart' inactiveIcon='ios-heart-outline' >
            <Scene key='tab_popular_music' title='인기 음악' component={HomeContainer}/>
          </Scene>
          <Scene key='recommended_music' title='추천 음악' icon={TabIcon} activeIcon='ios-checkmark-circle' inactiveIcon='ios-checkmark-circle-outline'>
            <Scene key='tab_recommended_music' title='추천 음악' component={SearchContainer}/> 
          </Scene>
          <Scene key='playlist' title='재생 목록' icon={TabIcon} activeIcon='ios-list' inactiveIcon='ios-list-outline'>
            <Scene key='tab_playlist' title='재생 목록' component={SearchContainer}/> 
          </Scene>
          <Scene key='my_music' title='나의 음악' icon={TabIcon} activeIcon='ios-musical-notes' inactiveIcon='ios-musical-notes-outline'>
            <Scene key='tab_my_music' title='나의 음악' component={ProfileContainer}/>
          </Scene>
        </Scene>
        <Scene key='player' component={PlayerContainer} hideNavBar={true} direction='vertical'/>
      </Router>
    );
  }
}
