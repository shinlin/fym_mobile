import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import { Scene, Router, TabBar, DefaultRenderer } from 'react-native-router-flux'

import LoginContainer from './LoginContainer';
import PopularContainer from './PopularContainer';
import SearchContainer from './SearchContainer';
import ProfileContainer from './ProfileContainer';
import PlayerContainer from './PlayerContainer';
import PlaylistContainer from './PlaylistContainer';
import NewContainer from './NewContainer';
import HomeContainer from './HomeContainer';
import MentorPickContainer from './MentorPickContainer';
import TabIcon from '../components/TabIcon';
import ParallaxView from '../components/ParallaxView';
import MainContainer from './MainContainer';

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
        <Scene key='login' title='Login' component={LoginContainer}/>

        <Scene key='main' component={MainContainer} hideNavBar initial={true}>
          <Scene key='explore' tabs={true} tabBarStyle={{backgroundColor:'white'}} pressOpacity={0.9}>
            <Scene key='home' icon={TabIcon} activeIcon='ios-home' inactiveIcon='ios-home-outline'>
              <Scene key='tab_home' component={HomeContainer} hideNavBar/>
            </Scene>
            <Scene key='new_music' icon={TabIcon} activeIcon='ios-star' inactiveIcon='ios-star-outline'>
              <Scene key='tab_new_music' component={NewContainer} hideNavBar/>
            </Scene>
            <Scene key='popular_music' icon={TabIcon} activeIcon='ios-heart' inactiveIcon='ios-heart-outline' >
              <Scene key='tab_popular_music' component={PopularContainer} hideNavBar/>
            </Scene>
            <Scene key='recommended_music' icon={TabIcon} activeIcon='ios-checkmark-circle' inactiveIcon='ios-checkmark-circle-outline'>
              <Scene key='tab_recommended_music' component={MentorPickContainer} hideNavBar/>
            </Scene>
            <Scene key='my_music' icon={TabIcon} activeIcon='ios-musical-notes' inactiveIcon='ios-musical-notes-outline'>
              <Scene key='tab_my_music' component={ProfileContainer} hideNavBar/>
            </Scene>
          </Scene>
        </Scene>

        <Scene key='player' component={PlayerContainer} hideNavBar animation='fadeInScene'/>
        <Scene key='parallax' component={ParallaxView}/>
        <Scene key='playlist' component={PlaylistContainer} direction='vertical'/>
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
