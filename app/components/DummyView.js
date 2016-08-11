import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

export default class DummyView extends Component {
  static propTypes = {
    text: React.PropTypes.string.isRequired,
  }

  static defaultProps = {
    text: 'DummyView',
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize:20}}>{this.props.text}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})