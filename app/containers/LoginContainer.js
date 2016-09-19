import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Login from '../components/LoginView';
import * as userActions from '../actions/userInfo';

class LoginContainer extends Component {
  render() {
    const { userInfo, actions } = this.props;

    return (
      <Login userInfo {...actions} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(userActions, dispatch),
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
