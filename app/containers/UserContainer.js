import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UserView from '../components/UserView';
import * as userActions from '../actions/userInfo';

class UserContainer extends Component {
  render() {

    const { userInfo, actions } = this.props;
    return (
      <UserView userInfo={userInfo} {...actions}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(userActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
