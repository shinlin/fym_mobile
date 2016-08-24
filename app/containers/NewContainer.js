import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NewTracks from '../components/NewTracks';
import * as actionCreators from '../actions';
import * as playlistActions from '../actions/playlist';

class NewContainer extends Component {
  render() {
    const { isFetching, items, error, playlist, actions } = this.props;

    return (
      <NewTracks isFetching={isFetching} items={items} error={error} playlist={playlist} {...actions}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.fetch.isFetching,
    items: state.fetch.items,
    error: state.fetch.error,
    playlist: state.playlist,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({...actionCreators, ...playlistActions}, dispatch),
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(NewContainer);
