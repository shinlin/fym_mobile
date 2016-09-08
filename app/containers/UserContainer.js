import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UserView from '../components/UserView';
import * as loginActions from '../actions/login';

class UserContainer extends Component {
  render() {

    const { isLoggedIn, data } = this.props;
    return (
      <UserView isLoggedIn={isLoggedIn} data={data} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    data: state.data,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(loginActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);