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

import { PLAY_STATUS, CHANGE_TYPES } from '../constants/SongConstants';

const iconPlay = (<Icon name='ios-play' size={40} color='black'/>);
const iconPause = (<Icon name='ios-pause' size={40} color='black'/>);


class StickyMiniPlayer extends Component {
  static propTypes = {
    style: React.PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      currentTime: 0,
      duration: 0,      
    }

    this._onPlayerStateChanged = this._onPlayerStateChanged.bind(this);
    this._onUpdatePosition = this._onUpdatePosition.bind(this);    
  }

  componentDidMount() {
    DeviceEventEmitter.addListener('onPlayerStateChanged', this._onPlayerStateChanged);
    DeviceEventEmitter.addListener('onUpdatePosition', this._onUpdatePosition);
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeListener('onPlayerStateChanged', this._onPlayerStateChanged);
    DeviceEventEmitter.removeListener('onUpdatePosition', this._onUpdatePosition);
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
          this._playNext();
        }
      } else {
        if(this.props.repeat === 'none') {
          this.props.actions.changePlayerStatus(PLAY_STATUS.END);
          this._playNext();
        } else if (this.props.repeat === 'single') {
          RCTPlayer.stop();
          RCTPlayer.prepare(this.props.trackInfo.stream_url, true);
        } else {
          this._playNext();
        }
      }
    }
  }

  _playNext() {
    this.props.actions.changeTrack(CHANGE_TYPES.NEXT);
  }  

  _onUpdatePosition(event) {
    this.setState({
      currentTime: parseInt(event.currentPosition/60),
    });
  }
  

  _onPlayPause() {
    const { player, playlist, actions } = this.props;

    if (player.currentTrackIndex === -1) return;

    let trackInfo = playlist.tracks[player.currentTrackIndex];

    if (player.status === PLAY_STATUS.PLAYING) {
      RCTPlayer.pause();
      actions.changePlayerStatus(PLAY_STATUS.PAUSED);
    } else if (player.status === PLAY_STATUS.END) {
      RCTPlayer.prepare(trackInfo.stream_url, true);
      actions.changePlayerStatus(PLAY_STATUS.PLAYING);
    } else {
      RCTPlayer.resume();
      actions.changePlayerStatus(PLAY_STATUS.PLAYING);
    }
    
  }

  render() {
    const { style, player, playlist, actions } = this.props;
    let trackInfo;

    if (player.currentTrackIndex === -1) {
      trackInfo = {
        artwork_url: 'https://unsplash.it/47/47',
        title: 'No Title',
        rap_name: 'No Name'
      }
    } else {
      trackInfo = playlist.tracks[player.currentTrackIndex];
    }

    return (
      <View style={[styles.container, style]}>
        <View style={styles.controls}>
          <TouchableHighlight style={{flex:1}} onPress={() => Actions.player()}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Image style={{width:47, height:47, marginRight: 5}} source={{uri:trackInfo.artwork_url}} />
              <View style={{flex:1}}>
                <Text style={{fontSize:14}} numberOfLines ={1}>{trackInfo.title}</Text>
                <Text style={{fontSize:8}}>{trackInfo.rap_name}</Text>
              </View>
            </View>

          </TouchableHighlight>
          
          <View style={{flexDirection:'row', right: 0}}>
            <TouchableHighlight style={{marginHorizontal:10}} onPress={this._onPlayPause.bind(this)}>
              {player.status === PLAY_STATUS.PLAYING ? iconPause : iconPlay}
            </TouchableHighlight>
            <TouchableHighlight style={{marginHorizontal:10}} onPress={() => Actions.playlist()}>
              <Icon name='ios-list' size={40} color='black'/>
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
    // borderWidth:1,
    // borderColor:'red',
  },
  controls: {
    flexDirection: 'row',
    alignItems:'center',
//    alignSelf: 'stretch',
//    justifyContent:'space-between',
    padding: 5,
    // borderWidth:1,
    // borderColor:'red',
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
