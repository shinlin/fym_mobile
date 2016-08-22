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
    const { isFetching, items, error, actions } = this.props;

    return (
      <PopularTracks isFetching={isFetching} items={items} error={error} {...actions}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.fetch.isFetching,
    items: state.fetch.items,
    error: state.fetch.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({...actionCreators, ...playlistActions}, dispatch),
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(PopularContainer);
