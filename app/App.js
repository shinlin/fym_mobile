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
import Hot99 from './Hot99';

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router key='root'>
          <Scene key='Hot99' component={Hot99} title='Hot 99' initial={true}/>
          <Scene key='Intro2' component={Intro}/>
        </Router>
      </Provider>
    );
  }
}
