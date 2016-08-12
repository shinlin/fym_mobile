import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import RCTPlayer from 'react-native-player';

import { CHANGE_TYPES, PLAY_STATUS } from '../constants/SongConstants';

const playIcon = (<Icon name="ios-play" size={30} />);
const pauseIcon = (<Icon name="ios-pause" size={30} />);
const nextIcon = (<Icon name="ios-fastforward" size={30} />);
const prevIcon = (<Icon name="ios-rewind" size={30} />);


class Player extends Component {
  static propTypes = {

  }

  static defaultProps = {

  }

  constructor(props) {
    super(props);

    console.log(props);

    // let URL = "http"
    if (props.player.status === PLAY_STATUS.PLAYING) {
      RCTPlayer.stop();
      props.actions.changePlayerStatus(PLAY_STATUS.END);
    }

    RCTPlayer.prepare(props.trackInfo.stream_url, true);
    props.actions.changePlayerStatus(PLAY_STATUS.PLAYING);
  }

  componentDidMount() {
    DeviceEventEmitter.addListener('onPlayerStateChanged', (event) => {
      console.log(event);
      if(event.playbackState === 5) { // ENDED
        this.props.actions.changePlayerStatus(PLAY_STATUS.END);
      }  
    })
  }

  _playAndPause() {
    const { player, actions} = this.props;
    if (player.status === PLAY_STATUS.PLAYING) {
      RCTPlayer.pause();
      actions.changePlayerStatus(PLAY_STATUS.PAUSED);
    } else {
      RCTPlayer.resume();
      actions.changePlayerStatus(PLAY_STATUS.PLAYING);
    }
  }

  _playNext() {

  }

  _playPrev() {

  }

  render() {
    const { player } = this.props;

    return (
      <View style={styles.container}>

        <View style={styles.playerControls}>
          <TouchableOpacity style={{marginHorizontal: 10}} onPress={this._playPrev.bind(this)}>
            {prevIcon}
          </TouchableOpacity>
          <TouchableOpacity style={{marginHorizontal: 10}} onPress={this._playAndPause.bind(this)}>
            {player.status === PLAY_STATUS.PLAYING ? pauseIcon : playIcon}
          </TouchableOpacity>
          <TouchableOpacity style={{marginHorizontal: 10}} onPress={this._playNext.bind(this)}>
            {nextIcon}
          </TouchableOpacity>
        </View>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerControls: {
    flexDirection: 'row',
  }
});

export default Player;
