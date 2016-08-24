import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NewTracks from '../components/NewTracks';
import * as newActions from '../actions/newList';
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
    isFetching: state.newList.isFetching,
    items: state.newList.items,
    error: state.newList.error,
    playlist: state.playlist,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({...newActions, ...playlistActions}, dispatch),
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(NewContainer);
