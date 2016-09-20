import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  DeviceEventEmitter,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import RCTPlayer from 'react-native-player';
import { Actions } from 'react-native-router-flux';
import ProgressBar from 'react-native-slider';

import { PLAY_STATUS, CHANGE_TYPES } from '../constants/constants';

class StickyMiniPlayer extends Component {
  static propTypes = {

  }

  constructor(props) {
    super(props);

    this.state = {
      currentTime: 0,
      duration: 0,      
    }

    this._onPlayerStateChanged = this._onPlayerStateChanged.bind(this);
    this._onUpdatePosition = this._onUpdatePosition.bind(this);
    this._onRemoteControl = this._onRemoteControl.bind(this);
  }

  componentDidMount() {
    DeviceEventEmitter.addListener('onPlayerStateChanged', this._onPlayerStateChanged);
    DeviceEventEmitter.addListener('onUpdatePosition', this._onUpdatePosition);
    DeviceEventEmitter.addListener('onRemoteControl', this._onRemoteControl);
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeListener('onPlayerStateChanged', this._onPlayerStateChanged);
    DeviceEventEmitter.removeListener('onUpdatePosition', this._onUpdatePosition);
    DeviceEventEmitter.removeListener('onRemoteControl', this._onRemoteControl);
  }

  componentWillReceiveProps(nextProps: object) {
    if (this.props.player.currentTrackIndex !== nextProps.player.currentTrackIndex) {
      if (this.props.player.status === PLAY_STATUS.INIT) {
          this.props.actions.changePlayerStatus(PLAY_STATUS.PLAYING);
          RCTPlayer.prepare(nextProps.trackInfo.stream_url, true);        
      } else {
          RCTPlayer.stop();
          this.props.actions.changePlayerStatus(PLAY_STATUS.PLAYING);
          RCTPlayer.prepare(nextProps.trackInfo.stream_url, true);        
      }
    }
  }

  _onPlayerStateChanged(event) {
    if(event.playbackState === 4) { // READY
      RCTPlayer.getDuration(duration => this.setState({duration: parseInt(duration/60)}));
    } else if(event.playbackState === 5) { // ENDED
      if(this.props.player.shuffle === 'shuffle') {
        if (this.props.player.repeat === 'single') {
          RCTPlayer.stop();
          RCTPlayer.prepare(this.props.trackInfo.stream_url, true);
        } else {
          this.props.actions.changeTrack(CHANGE_TYPES.NEXT);
        }
      } else {
        if(this.props.repeat === 'none') {
          this.props.actions.changePlayerStatus(PLAY_STATUS.END);
          this.props.actions.changePlayerStatus(PLAY_STATUS.PLAYING);
          this.props.actions.changeTrack(CHANGE_TYPES.NEXT);
        } else if (this.props.repeat === 'single') {
          RCTPlayer.stop();
          RCTPlayer.prepare(this.props.trackInfo.stream_url, true);
        } else {
          this.props.actions.changeTrack(CHANGE_TYPES.NEXT);
        }
      }
    }
  }

  _onUpdatePosition(event) {
    this.setState({
      currentTime: parseInt(event.currentPosition/60),
    });
  }
  
  _onRemoteControl(event) {
    if (event.action === 'NEXT') {
      this.props.actions.changeTrack(CHANGE_TYPES.NEXT);
    } else {
      this.props.actions.changeTrack(CHANGE_TYPES.PREV);
    }
  }

  _onPlayPause() {
    const { player, playlist, actions } = this.props;
    let trackInfo = playlist.tracks[player.currentTrackIndex];

    if (player.status === PLAY_STATUS.PLAYING) {
      RCTPlayer.pause();
      actions.changePlayerStatus(PLAY_STATUS.PAUSED);
    } else if (player.status === PLAY_STATUS.END || player.status === PLAY_STATUS.INIT) {
      RCTPlayer.prepare(trackInfo.stream_url, true);
      actions.changePlayerStatus(PLAY_STATUS.PLAYING);
    } else {
      RCTPlayer.resume();
      actions.changePlayerStatus(PLAY_STATUS.PLAYING);
    }
  }

  _onPlayer() {
    Actions.player({
      autoplay: false,
      startPosition: this.state.currentTime,
    });
  }

  render() {
    const { style, player, playlist, actions } = this.props;
    let trackInfo = player.currentTrackIndex === -1 ? null : playlist.tracks[player.currentTrackIndex]; 

    return (
      <View style={[styles.container, style]}>
        <View style={styles.controls}>
          <TouchableHighlight style={{flex:1}} onPress={() => this._onPlayer()} disabled={trackInfo === null ? true : false}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              { trackInfo ? 
                <Image style={styles.thumbnail} source={{uri:trackInfo.artwork_url}} /> 
                : 
                <View style={[styles.thumbnail, {backgroundColor:'lightgray', borderColor:'gray', borderWidth:1, alignItems:'center', justifyContent:'center'}]}>
                  <Icon name='ios-musical-notes' size={30}/>
                </View>
              }
              <View style={{flex:1}}>
                <Text style={{fontSize:14, color:'black'}} numberOfLines ={1}>{trackInfo ? trackInfo.title : '재생목록이 비었습니다.'}</Text>
                {trackInfo ? (<Text style={{fontSize:8}}>{trackInfo.rap_name}</Text>) : null}
              </View>
            </View>
          </TouchableHighlight>
          
          <View style={{flexDirection:'row', right: 0}}>
            <TouchableHighlight style={{marginHorizontal:10}} onPress={this._onPlayPause.bind(this)} disabled={trackInfo === null ? true : false}>
              <Icon name={player.status === PLAY_STATUS.PLAYING ? 'ios-pause' : 'ios-play'} size={40} color={trackInfo ? 'black' : 'gray'}/>
            </TouchableHighlight>
            <TouchableHighlight style={{marginHorizontal:10}} onPress={() => Actions.playlist()} disabled={trackInfo === null ? true : false}>
              <Icon name='ios-list' size={40} color={trackInfo ? 'black' : 'gray'}/>
            </TouchableHighlight>
          </View>
        </View>
        <ProgressBar
          style={{height:4}}
          value={this.state.currentTime}
          onValueChange={(value) => console.log(value)}
          minimumValue={0}
          maximumValue={this.state.duration}
          trackStyle={styles.trackStyle}
          thumbStyle={styles.thumbStyle}
          disabled
          minimumTrackTintColor='red'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(200,200,200,0.9)',
  },
  controls: {
    flexDirection: 'row',
    alignItems:'center',
    padding: 5,
  },
  thumbnail: {
    width:47,
    height:47,
    marginRight: 5,   
  },
  trackStyle: {
    backgroundColor: 'gray',
    borderRadius: 0,
    height:1,
  },
  thumbStyle: {
    backgroundColor: 'red',
    width: 1,
    height: 1,
  },
})

export default StickyMiniPlayer;
