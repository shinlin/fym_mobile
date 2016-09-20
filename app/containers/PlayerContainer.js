import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as playerActions from '../actions/player'
import Player from '../components/Player';

class PlayerContainer extends Component {
  static propTypes = {
    trackInfo: React.PropTypes.object,
  }

  render() {
    return (
      <Player {...this.props}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    player: state.player,
    tracks: state.playlist.tracks,
    currentTrackIndex: state.player.currentTrackIndex,
    trackInfo: state.playlist.tracks[state.player.currentTrackIndex],
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(playerActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
