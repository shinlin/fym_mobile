import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DefaultRenderer } from 'react-native-router-flux';

import StickyMiniPlayer from '../components/StickyMiniPlayer';
import * as playerActions from '../actions/player';

import BugReportButton from '../components/BugReportButton';

const WINDOW_WIDTH = Dimensions.get('window').width;

class MainContainer extends Component {
  static propTypes = {
    navigationState: React.PropTypes.object,
  }

  render() {
    const state = this.props.navigationState;
    const children = state.children;

    return (
      <View style={{flex:1}}>
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
        <StickyMiniPlayer style={styles.player} trackInfo={this.props.trackInfo} player={this.props.player} actions={this.props.actions} playlist={this.props.playlist}/>
        <BugReportButton/>
      </View>
    );    
  }
}

const styles = StyleSheet.create({
  player: {
    position: 'absolute',
    width: WINDOW_WIDTH,
    height: 60,
    bottom: 50,
  }
});

const mapStateToProps = (state) => {
  return {
    player: state.player,
    playlist: state.playlist,
    trackInfo: state.player.currentTrackIndex === -1 ? {} : state.playlist.tracks[state.player.currentTrackIndex],    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(playerActions, dispatch), 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
