import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import { Scene, Router, TabBar, DefaultRenderer } from 'react-native-router-flux'

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

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as playlistActions from '../actions/playlist';


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

function fadeInScene(/* NavigationSceneRendererProps */ props) {
  const {
    position,
    scene,
  } = props;

  const index = scene.index;
  const inputRange = [index - 1, index, index + 1];

  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 0.3],
  });

  const scale = position.interpolate({
    inputRange,
    outputRange: [1, 1, 0.95],
  });

  const translateY = 0;
  const translateX = 0;

  return {
    opacity,
    transform: [
      { scale },
      { translateX },
      { translateY },
    ],
  };
}

class App extends Component {

  componentWillMount() {
    this.props.actions.loadPlaylist();
  }

  render() {
    return (
      <Router 
        key='root'
        getSceneStyle={getSceneStyle}
      >
        <Scene key='login' title='Login' component={LoginContainer} initial={true}/>
        <Scene key='main' component={MainContainer} hideNavBar >
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

        <Scene key='player' component={PlayerContainer} hideNavBar animation='fadeInScene'/>
        <Scene key='parallax' component={ParallaxView}/>
        <Scene key='playlist' component={PlaylistContainer} direction='vertical'/>
        <Scene key='bugreport' component={BugReportView} hideNavBar/>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  navigationBar: {
    height: 40,
    alignItems: 'center',
  }
})

const mapStateToProps = (state) => {
  return {
    playlist: state.playlist,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(playlistActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
