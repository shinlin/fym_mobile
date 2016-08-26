import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';
import { Scene, Router, TabBar } from 'react-native-router-flux'

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

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as playlistActions from '../actions/playlist';


class App extends Component {

  componentWillMount() {
    this.props.actions.loadPlaylist();
  }

  render() {
    return (
      <Router 
        key='root'
      >
        <Scene key='login' title='Login' component={LoginContainer} initial={true} />
        <Scene key='explore' tabs={true} tabBarStyle={{backgroundColor:'rgba(125,125,125,0.4)'}} pressOpacity={0.9} >
          <Scene key='new_music' title='새로운 음악' icon={TabIcon} activeIcon='ios-star' inactiveIcon='ios-star-outline'>
            <Scene key='tab_new_music' title='새로운 음악' component={NewContainer}/>
          </Scene>
          <Scene key='popular_music' title='인기 음악' icon={TabIcon} activeIcon='ios-heart' inactiveIcon='ios-heart-outline' >
            <Scene key='tab_popular_music' title='인기 음악' component={PopularContainer}/>
          </Scene>
          <Scene key='recommended_music' title='추천 음악' icon={TabIcon} activeIcon='ios-checkmark-circle' inactiveIcon='ios-checkmark-circle-outline' initial={true}>
            <Scene key='tab_recommended_music' title='추천 음악' component={MentorPickContainer}/> 
          </Scene>
          <Scene key='playlist' title='재생 목록' icon={TabIcon} activeIcon='ios-list' inactiveIcon='ios-list-outline'>
            <Scene key='tab_playlist' title='재생 목록' component={PlaylistContainer}/> 
          </Scene>
          <Scene key='my_music' title='나의 음악' icon={TabIcon} activeIcon='ios-musical-notes' inactiveIcon='ios-musical-notes-outline'>
            <Scene key='tab_my_music' title='나의 음악' component={ProfileContainer}/>
          </Scene>
        </Scene>
        <Scene key='player' component={PlayerContainer} hideNavBar={true} direction='vertical'/>
        <Scene key='parallax' component={ParallaxView}/>
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
