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
import MentorPickContainer from './MentorPickContainer';
import TabIcon from '../components/TabIcon';
import ParallaxView from '../components/ParallaxView';
import HomeContainer from './HomeContainer';

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

        <Scene key='home' component={HomeContainer} initial={true}>
          <Scene key='explore' tabs={true} tabBarStyle={{backgroundColor:'white'}} pressOpacity={0.9}>
            <Scene key='new_music' title='새로운 음악' icon={TabIcon} activeIcon='ios-star' inactiveIcon='ios-star-outline'>
              <Scene key='tab_new_music' title='새로운 음악' component={NewContainer}/>
            </Scene>
            <Scene key='popular_music' title='인기 음악' icon={TabIcon} activeIcon='ios-heart' inactiveIcon='ios-heart-outline' >
              <Scene key='tab_popular_music' title='인기 음악' component={PopularContainer}/>
            </Scene>
            <Scene key='recommended_music' title='추천 음악' icon={TabIcon} activeIcon='ios-checkmark-circle' inactiveIcon='ios-checkmark-circle-outline'>
              <Scene key='tab_recommended_music' title='추천 음악' component={MentorPickContainer}/> 
            </Scene>
            <Scene key='my_music' title='나의 음악' icon={TabIcon} activeIcon='ios-musical-notes' inactiveIcon='ios-musical-notes-outline'>
              <Scene key='tab_my_music' title='나의 음악' component={ProfileContainer}/>
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
