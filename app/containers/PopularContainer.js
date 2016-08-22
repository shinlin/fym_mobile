import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PopularTracks from '../components/PopularTracks';
import * as actionCreators from '../actions';
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
  console.log(state);
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

module.exports = connect(mapStateToProps, mapDispatchToProps)(PopularContainer);
