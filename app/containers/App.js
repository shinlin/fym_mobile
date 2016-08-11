import React, { Component } from 'react';
import { Scene, Router, TabBar, Modal, Schema, Actions, Reducer, ActionConst } from 'react-native-router-flux'

import HomeContainer from './HomeContainer';
import SearchContainer from './SearchContainer';
import ProfileContainer from './ProfileContainer';

import TabIcon from '../components/TabIcon';

export default class App extends Component {
  render() {
    return (
      <Router key='root'>
        <Scene key='explore' tabs={true} initial={true}>
          <Scene key='home' title='Home' icon={TabIcon} >
            <Scene key='explore_home' title='AAA' component={HomeContainer}/>
          </Scene>
          <Scene key='search' title='Search' icon={TabIcon} >
            <Scene key='explore_search' title='BBB' icon={TabIcon} component={SearchContainer}/> 
          </Scene>
          <Scene key='profile' title='Profile' icon={TabIcon}>
            <Scene key='explore_profile' title='CCC' icon={TabIcon} component={ProfileContainer}/>
          </Scene>
        </Scene>
      </Router>
    );
  }
}
