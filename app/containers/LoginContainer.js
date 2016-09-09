import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Login from '../components/LoginView';
import * as loginActions from '../actions/login';

class LoginContainer extends Component {
  render() {
    const { isLoggedIn, data, actions } = this.props;

    return (
      <Login isLoggedIn={isLoggedIn} data={data} {...actions} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.login.isLoggedIn,
    data: state.login.data,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(loginActions, dispatch),
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
