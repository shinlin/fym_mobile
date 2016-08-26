import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MentorPick from '../components/MentorPick';
import * as mentorActions from '../actions/mentorPick';
import * as playlistActions from '../actions/playlist';

class MentorPickContainer extends Component {
  render() {
    const { isFetching, items, error, playlist, actions } = this.props;

    return (
      <MentorPick isFetching={isFetching} items={items} error={error} playlist={playlist} {...actions}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.mentorPick.isFetching,
    items: state.mentorPick.items,
    error: state.mentorPick.error,
    playlist: state.playlist,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({...mentorActions, ...playlistActions}, dispatch),
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(MentorPickContainer);
