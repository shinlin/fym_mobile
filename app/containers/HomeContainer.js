import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DummyView from '../components/DummyView';
import PlayerTabBar from '../components/PlayerTabBar';
import PopularTracks from '../components/PopularTracks';
import NewTracks from '../components/NewTracks';
import MentorPick from '../components/MentorPick';

import * as popularActions from '../actions/popularList';
import * as newActions from '../actions/newList';
import * as mentorActions from '../actions/mentorPick';
import * as playlistActions from '../actions/playlist';

class HomeContainer extends Component {
  render() {
    const { 
      newTracks,
      popularTracks,
      mentorPick,
      playlist,
      player,
      newActions,
      popularActions,
      mentorActions,
    } = this.props;
    
    return (
      <ScrollableTabView 
        renderTabBar={() => <PlayerTabBar />}
        initialPage={0}
      >
        <DummyView tabLabel="For you" />
        <NewTracks tabLabel="What's new!" items={newTracks.items} isFetching={newTracks.isFetching} playlist={playlist} {...newActions}/>
        <PopularTracks tabLabel="Popular" items={popularTracks.items} isFetching={popularTracks.isFetching} playlist={playlist} {...popularActions}/>
        <MentorPick tabLabel="FYM's picks" items={mentorPick.items} isFetching={mentorPick.isFetching} playlist={playlist} {...mentorActions}/>
        <DummyView tabLabel="Other's choices" />
      </ScrollableTabView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    newTracks: state.newList,
    popularTracks: state.popularList,
    mentorPick: state.mentorPick,
    playlist: state.playlist,
    player: state.player,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    popularActions: bindActionCreators({...popularActions, ...playlistActions}, dispatch),
    newActions: bindActionCreators({...newActions, ...playlistActions}, dispatch),
    mentorActions: bindActionCreators({...mentorActions, ...playlistActions}, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
