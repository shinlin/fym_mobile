import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';

import Hot99 from '../components/Hot99';

class Explore extends Component {

  constructor(props) {
    super(this);
    this.state = { page: 'home' };    
  }

  render() {
    return (
      <View style={styles.container}>
        <Tabs selected={this.state.page} style={{backgroundColor:'white'}}
              selectedStyle={{color:'red'}} onSelect={el=>this.setState({page:el.props.name})}>
            <Text name="home">First</Text>
            <Text name="playlist" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Second</Text>
            <Text name="third">Third</Text>
        </Tabs>
          <Text style={styles.welcome}>
              Welcome to React Native
          </Text>
          <Text style={styles.instructions}>
              Selected page: {this.state.page}
          </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default Explore;
