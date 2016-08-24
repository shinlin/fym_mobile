import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PopularTracks from '../components/PopularTracks';
import * as popularActions from '../actions/popularList';
import * as playlistActions from '../actions/playlist';

class PopularContainer extends Component {
  render() {
    const { isFetching, items, error, playlist, actions } = this.props;

    return (
      <PopularTracks isFetching={isFetching} items={items} error={error} playlist={playlist} {...actions}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.popularList.isFetching,
    items: state.popularList.items,
    error: state.popularList.error,
    playlist: state.playlist,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({...popularActions, ...playlistActions}, dispatch),
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(PopularContainer);
