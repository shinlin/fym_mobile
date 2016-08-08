import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import { Router, Scene } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

import Intro from './Intro';

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router key='root'>
          <Scene key='Intro' component={Intro} initial={true}/>
          <Scene key='Intro2' component={Intro}/>
        </Router>
      </Provider>
    );
  }
}
