import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';

export default class LyricView extends Component {

  static propTypes = {
    lyric: React.PropTypes.string.isRequired,
  }

  static defaultProps = {
    lyric: '가사 없음',
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={{fontSize:10, color:'black', textAlign:'center'}}>{this.props.lyric}</Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 35,
    marginBottom: 10,
  }
})