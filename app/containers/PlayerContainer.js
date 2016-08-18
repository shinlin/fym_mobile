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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(playerActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
