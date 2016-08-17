import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  DeviceEventEmitter,
  findNodeHandle,
  Slider,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import RCTPlayer from 'react-native-player';
import Blur from 'react-native-blur';
import { Actions } from 'react-native-router-flux';
import ProgressBar from 'react-native-slider';

import { CHANGE_TYPES, PLAY_STATUS } from '../constants/SongConstants';
import { convertMsToTime } from './utils';

const BlurView = Blur.BlurView;

const playIcon = (<Icon name="ios-play" size={30} />);
const pauseIcon = (<Icon name="ios-pause" size={30} />);
const nextIcon = (<Icon name="ios-fastforward" size={30} />);
const prevIcon = (<Icon name="ios-rewind" size={30} />);
const like = (<Icon name="ios-heart-outline" size={20} />);
const share = (<Icon name="ios-share-outline" size={20} />);
const shuffle = (<Icon name="ios-shuffle" size={20} />);
const loop = (<Icon name="ios-infinite" size={20} />);
const more = (<Icon name="ios-more" size={20} />);
const playlist = (<Icon name="ios-list" size={20} />);
const volume_mute = (<Icon name="ios-volume-mute" size={18} />);
const volume_up = (<Icon name="ios-volume-up" size={18} />);
const hideIcon = (<Icon name="ios-arrow-dropdown" size={30}/>);


class Player extends Component {
  static propTypes = {
    trackInfo: React.PropTypes.object,
  }

  static defaultProps = {
    trackInfo: {}
  }

  constructor(props) {
    super(props);

    this._isDragging = false;

    if (props.player.status === PLAY_STATUS.PLAYING) {
      RCTPlayer.stop();
      RCTPlayer.seekTo(0);
      props.actions.changePlayerStatus(PLAY_STATUS.END);
    }

    RCTPlayer.prepare(props.trackInfo.stream_url, true);
    props.actions.changePlayerStatus(PLAY_STATUS.PLAYING);

    this.state = {
      viewRef: 0,
      volume: 0,
      strCurrentTime: '00:00',
      strDuration: '00:00',
      currentTime: 0,
      duration: 0,
    }
  }

  componentDidMount() {
    DeviceEventEmitter.addListener('onPlayerStateChanged', (event) => {
      if(event.playbackState === 4) { // READY
        RCTPlayer.getDuration(duration => {
          this.setState({
          strDuration: convertMsToTime(duration),
          duration: parseInt(duration/60),
          })
        });
      } else if(event.playbackState === 5) { // ENDED
        this.props.actions.changePlayerStatus(PLAY_STATUS.END);
      }  
    })
    DeviceEventEmitter.addListener('onUpdatePosition', (event) => {
      if (this._isDragging) return;
      
      this.setState({
        strCurrentTime: convertMsToTime(event.currentPosition),
        currentTime: parseInt(event.currentPosition/60),
      });
    })
  }

  _playAndPause() {
    const { player, actions, trackInfo} = this.props;
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

  _playNext() {

  }

  _playPrev() {

  }

  _imageLoaded() {
    setTimeout(() => {
      this.setState({viewRef: findNodeHandle(this.refs.backgroundImage)})
    }, 500);
  }  

  render() {
    const { player, trackInfo } = this.props;
    let image_url = trackInfo.artwork_url.replace('badge', 'crop');

    return (
      <View style={styles.container}>

        <Image
          style={{flex:1.5, alignSelf:'stretch'}}
          resizeMode='stretch'
          source={{uri: image_url}}>
          <TouchableHighlight style={{top:50, left:10}} onPress={() => Actions.explore()}>
            {hideIcon}
          </TouchableHighlight>
        </Image>

        <Image
          source={{uri: image_url}}
          style={styles.playerControls}
          ref={'backgroundImage'}
          onLoadEnd={this._imageLoaded.bind(this)}
          resizeMode='stretch'
        >
          <BlurView
            blurRadius={10}
            downsampleFactor={5}
            overlayColor={'rgba(255, 250, 250, 0.8)'}
            style={styles.blurView}
            viewRef={this.state.viewRef}
          />
          <View style={{flex:1}}>
            <View style={{height:25}}>
              <ProgressBar
                style={{height:20, justifyContent:'flex-start'}}
                value={this.state.currentTime}
                onValueChange={(value) => {
                  console.log(value);
                  this.setState({time:value})}
                }
                minimumValue={0}
                maximumValue={this.state.duration}
                trackStyle={styles.trackStyle}
                thumbStyle={styles.thumbStyle}
                onSlidingStart={() => this._isDragging = true}
                onSlidingComplete={(value) => {
                  RCTPlayer.seekTo(value*60)
                  this._isDragging = false;
                }}
              />
              <View style={{flexDirection:'row', justifyContent:'space-between', top: -10}}>
                <Text style={{fontSize:10, marginLeft:10}}>{this.state.strCurrentTime}</Text>
                <Text style={{fontSize:10, marginRight:10}}>{this.state.strDuration}</Text>
              </View>
            </View>
            <View style={{flex:1, justifyContent:'space-between', margin:10, marginTop:0}}>
              <View style={{alignItems:'center'}}>
                <Text style={{fontSize:14, fontWeight:'bold'}}>{trackInfo.title}</Text>
                <Text style={{fontSize:10}}>{trackInfo.rap_name}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <TouchableOpacity onPress={this._playPrev.bind(this)}>
                  {like}
                </TouchableOpacity>
                <TouchableOpacity onPress={this._playPrev.bind(this)}>
                  {prevIcon}
                </TouchableOpacity>
                <TouchableOpacity onPress={this._playAndPause.bind(this)}>
                  {player.status === PLAY_STATUS.PLAYING ? pauseIcon : playIcon}
                </TouchableOpacity>
                <TouchableOpacity onPress={this._playNext.bind(this)}>
                  {nextIcon}
                </TouchableOpacity>
                <TouchableOpacity onPress={this._playPrev.bind(this)}>
                  {playlist}
                </TouchableOpacity>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <TouchableOpacity style={{marginLeft: 30}} onPress={this._playPrev.bind(this)}>
                  {volume_mute}
                </TouchableOpacity>
                <Slider
                  style={{flex:1}}
                  onSlidingComplete={(value) => this.setState({
                    slideCompletionValue: value,
                    slideCompletionCount: this.state.slideComletionCOunt +1
                  })}
                  onValueChange={(value) => this.setState({volume:value})}
                  maximumValue={1}
                  minimumValue={0}
                />
                <TouchableOpacity style={{marginRight: 30}} onPress={this._playPrev.bind(this)}>
                  {volume_up}
                </TouchableOpacity>
              </View>
              <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <TouchableOpacity onPress={this._playPrev.bind(this)}>
                  {share}
                </TouchableOpacity>
                <TouchableOpacity onPress={this._playPrev.bind(this)}>
                  {shuffle}
                </TouchableOpacity>
                <TouchableOpacity onPress={this._playPrev.bind(this)}>
                  {loop}
                </TouchableOpacity>
                <TouchableOpacity onPress={this._playPrev.bind(this)}>
                  {more}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Image>
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
    flex:1,
    alignSelf:'stretch',
  },
  blurView: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
  slider: {
    height: 10,
    margin: 10,
  },
  trackStyle: {
    borderRadius: 0,
  },
  thumbStyle: {
    backgroundColor: 'red',
    width: 1,
    height: 20,
  }
});

export default Player;
