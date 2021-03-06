import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as playlistActions from '../actions/playlist';
import * as playerActions from '../actions/player';
import Playlist from '../components/Playlist';

class PlaylistContainer extends Component {
  static propTypes = {
    trackInfo: React.PropTypes.object,
  }

  render() {
    const { trackInfo, tracks, actions, player } = this.props;

    return (
      <Playlist trackInfo={trackInfo} tracks={tracks} player={player} {...actions}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    player: state.player,
    tracks: state.playlist.tracks,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ ...playlistActions, ...playerActions }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistContainer);
