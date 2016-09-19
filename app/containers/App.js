import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import { Scene, Router, TabBar, Actions } from 'react-native-router-flux'

import FBSDK from 'react-native-fbsdk';
const { 
  AccessToken,
} = FBSDK;
import { LOGIN_STATUS } from '../constants/constants';

import MainContainer from './MainContainer';
import LoginContainer from './LoginContainer';
import HomeContainer from './HomeContainer';
import SearchContainer from './SearchContainer';
import PublishContainer from './PublishContainer';
import ActivityContainer from './ActivityContainer';
import UserContainer from './UserContainer';
import PlayerContainer from './PlayerContainer';
import PlaylistContainer from './PlaylistContainer';
import TabIcon from '../components/TabIcon';
import ParallaxView from '../components/ParallaxView';
import BugReportView from '../components/BugReportView';
import SettingsView from '../components/SettingsView';
import ArtistView from '../components/ArtistView';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as playlistActions from '../actions/playlist';
import * as playerActions from '../actions/player';
import * as userActions from '../actions/userInfo';

import { checkTokenValidity } from '../utils/facebookAPI'

const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  // if (computedProps.isActive) {
  //   style.marginTop = computedProps.hideNavBar ? 0 : 64;
  //   style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  // }
  return style;
};

class App extends Component {

  componentWillMount() {
    this.props.actions.loadPlaylist();
    this.props.actions.getUserInfo();
  }
  
  _renderPreInit() {
    return (
      <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator
          style={styles.centering}
          size="large"
        />
      </View>
    )
  }

  _renderPostInit() {
    let isLoggedIn = this.props.loginStatus === LOGIN_STATUS.LOGIN ? true : false; 

    return(
      <Router getSceneStyle={getSceneStyle}>
        <Scene key="root">
          <Scene key='login' title='Login' component={LoginContainer} hideNavBar direction='vertical' initial={isLoggedIn}/>
          <Scene key='main' component={MainContainer} hideNavBar initial={isLoggedIn}>
            <Scene key='explore' tabs={true} tabBarStyle={{backgroundColor:'black'}} pressOpacity={0.9}>
              <Scene key='home' icon={TabIcon} activeIcon='home' inactiveIcon='home'>
                <Scene key='tab_home' component={HomeContainer} hideNavBar/>
              </Scene>
              <Scene key='search' icon={TabIcon} activeIcon='magnifying-glass' inactiveIcon='magnifying-glass'>
                <Scene key='tab_search' component={SearchContainer} hideNavBar/>
              </Scene>
              <Scene key='publish' icon={TabIcon} activeIcon='upload' inactiveIcon='upload' >
                <Scene key='tab_publish' component={PublishContainer} hideNavBar/>
              </Scene>
              <Scene key='activity' icon={TabIcon} activeIcon='heart' inactiveIcon='heart'>
                <Scene key='tab_activity' component={ActivityContainer} hideNavBar/>
              </Scene>
              <Scene key='user' icon={TabIcon} activeIcon='torso' inactiveIcon='torso'>
                <Scene key='tab_user' component={UserContainer} hideNavBar/>
              </Scene>
            </Scene>
          </Scene>

          <Scene key='player' component={PlayerContainer} hideNavBar direction='vertical'/>
          <Scene key='parallax' component={ParallaxView}/>
          <Scene key='playlist' component={PlaylistContainer} hideNavBar={false}/>
          <Scene key='bugreport' component={BugReportView} hideNavBar/>
          <Scene key='settings' title='Settings' component={SettingsView} hideNavBar={false}/>
          <Scene key='artist' title='Artist' component={ArtistView} hideNavBar={false}/>
        </Scene>
      </Router>
    )
  }

  render() {
    return this.props.loginStatus === LOGIN_STATUS.READY ? this._renderPreInit() : this._renderPostInit();
  }
}

const styles = StyleSheet.create({
  navigationBar: {
    height: 40,
    alignItems: 'center',
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },  
})

const mapStateToProps = (state) => {
  return {
    loginStatus: state.userInfo.loginStatus,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({...playlistActions, ...playerActions, ...userActions}, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
