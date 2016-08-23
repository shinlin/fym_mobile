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
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import RCTPlayer from 'react-native-player';
import Blur from 'react-native-blur';
import { Actions } from 'react-native-router-flux';
import ProgressBar from 'react-native-slider';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import { CHANGE_TYPES, PLAY_STATUS } from '../constants/SongConstants';
import { convertMsToTime } from './utils';
import PlayerTabBar from './PlayerTabBar';
import LyricView from './LyricView';
import FeedbackView from './FeedbackView';

const BlurView = Blur.BlurView;
const playIcon = (<Icon name="ios-play" size={30} />);
const pauseIcon = (<Icon name="ios-pause" size={30} />);
const nextIcon = (<Icon name="ios-fastforward" size={30} />);
const prevIcon = (<Icon name="ios-rewind" size={30} />);
const like = (<Icon name="ios-heart-outline" size={20} />);
const share = (<Icon name="ios-share-outline" size={20} />);
const more = (<Icon name="ios-more" size={20} />);
const playlist = (<Icon name="ios-list" size={20} />);
const volume_mute = (<Icon name="ios-volume-mute" size={18} />);
const volume_up = (<Icon name="ios-volume-up" size={18} />);
const hideIcon = (<Icon name="ios-arrow-dropdown-circle" color='lightgray' size={20}/>);


class Player extends Component {
  static propTypes = {
    trackInfo: React.PropTypes.object,
    tracks: React.PropTypes.array,
    currentTrackIndex: React.PropTypes.number,
    repeat: React.PropTypes.string,
    shuffle: React.PropTypes.string,
  }

  static defaultProps = {
    trackInfo: {},
    currentTrackIndex: null,
    tracks: [],
    repeat: 'none',
    shuffle: 'none',
  }

  constructor(props) {
    super(props);

    this._isDragging = false;

    this.state = {
      viewRef_top: 0,
      viewRef_bottom: 0,
      volume: 0,
      strCurrentTime: '00:00',
      strDuration: '00:00',
      currentTime: 0,
      duration: 0,
    }

  }

  _onPlayerStateChanged(event) {
    if(event.playbackState === 4) { // READY
      RCTPlayer.getDuration(duration => {
        this.setState({
        strDuration: convertMsToTime(duration),
        duration: parseInt(duration/60),
        })
      });
    } else if(event.playbackState === 5) { // ENDED

      if(this.props.shuffle === 'shuffle') {
        if (this.props.repeat === 'single') {
          RCTPlayer.stop();
          RCTPlayer.seekTo(0);
          RCTPlayer.prepare(this.props.trackInfo.stream_url, true);
        } else {
          this._playNext();
        }
      } else {
        if(this.props.repeat === 'none') {
          this.props.actions.changePlayerStatus(PLAY_STATUS.END);
        } else if (this.props.repeat === 'single') {
          RCTPlayer.stop();
          RCTPlayer.seekTo(0);
          RCTPlayer.prepare(this.props.trackInfo.stream_url, true);
        } else {
          this._playNext();
        }
      }
    }
  }

  _onUpdatePosition(event) {
    if (this._isDragging) return;

    this.setState({
      strCurrentTime: convertMsToTime(event.currentPosition),
      currentTime: parseInt(event.currentPosition/60),
    });
  }

  componentDidMount() {
    DeviceEventEmitter.addListener('onPlayerStateChanged', this._onPlayerStateChanged.bind(this));
    DeviceEventEmitter.addListener('onUpdatePosition', this._onUpdatePosition.bind(this))

    if (this.props.player.status === PLAY_STATUS.PLAYING) {
      RCTPlayer.stop();
      RCTPlayer.seekTo(0);
      this.props.actions.changePlayerStatus(PLAY_STATUS.END);
    }

    RCTPlayer.prepare(this.props.trackInfo.stream_url, true);
    this.props.actions.changePlayerStatus(PLAY_STATUS.PLAYING);
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeAllListeners('onPlayerStateChanged');
    DeviceEventEmitter.removeAllListeners('onUpdatePosition');
  }

  componentWillReceiveProps(nextProps: object) {
    console.log("current : " + this.props.currentTrackIndex);
    console.log("next : " + nextProps.currentTrackIndex);

    if (this.props.currentTrackIndex !== nextProps.currentTrackIndex) {

      // To refresh blur image...
      this.setState({
        viewRef_top: 0,
        viewRef_bottom: 0,
      })
      
      RCTPlayer.stop();
      RCTPlayer.seekTo(0);
      RCTPlayer.prepare(nextProps.trackInfo.stream_url, true);      
    }
  }

  _playAndPause() {
    const { player, actions, trackInfo, trackIndex, } = this.props;
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
    this.props.actions.changeTrack(CHANGE_TYPES.NEXT);
  }

  _playPrev() {
    this.props.actions.changeTrack(CHANGE_TYPES.PREV);
  }

  // Reference : https://github.com/react-native-community/react-native-blur/issues/83
  _imageLoaded() {
    setTimeout(() => {
      this.setState({
        viewRef_top: findNodeHandle(this.refs.bgTop),
        viewRef_bottom: findNodeHandle(this.refs.bgBottom),
      })
    }, 500);
  }

  _onChangeRepeatMode() {
    let mode = this.props.repeat;
    switch(this.props.repeat) {
      case 'none':
        mode = 'all';
        break;
      case 'all':
        mode = 'single';
        break;
      case 'single':
        mode = 'none';
        break;
      default:
        mode = 'none';
    }

    this.props.actions.changeRepeatMode(mode);
  }

  _onChangeShuffleMode() {
    this.props.actions.changeShuffleMode(this.props.shuffle === 'shuffle' ? 'none' : 'shuffle');
  }

  render() {
    const { player, trackInfo } = this.props;
    let image_url = trackInfo.artwork_url.replace('badge', 'crop');

    return (
      <View style={styles.container}>
        <Image
          ref={'bgTop'}
          style={{flex:1.5, alignSelf:'stretch'}}
          resizeMode='stretch'
          source={{uri: image_url}}>
          <BlurView
            key='blurview_top'
            blurRadius={10}
            downsampleFactor={5}
            overlayColor={'rgba(255, 250, 250, 0.8)'}
            style={styles.blurView}
            viewRef={this.state.viewRef_top}
          />
          <ScrollableTabView 
            renderTabBar={() => <PlayerTabBar/>}
            tabBarPosition='overlayTop'
            >
            <Image style={{flex:1}} tabLabel="Cover" source={{uri: image_url}} resizeMode='stretch'/>
            <FeedbackView tabLabel="Feedback" trackInfo={trackInfo}/>
            <LyricView tabLabel="Lyric" lyric={trackInfo.lyrics_text}/>
          </ScrollableTabView>
          <TouchableHighlight style={{position: 'absolute', top:10, left:10}} onPress={() => Actions.pop()}>
            {hideIcon}
          </TouchableHighlight>
        </Image>

        <Image
          source={{uri: image_url}}
          style={styles.playerControls}
          ref={'bgBottom'}
          onLoadEnd={this._imageLoaded.bind(this)}
          resizeMode='stretch'
        >
          <BlurView
            key='blurview_bottom'
            blurRadius={10}
            downsampleFactor={5}
            overlayColor={'rgba(255, 250, 250, 0.8)'}
            style={styles.blurView}
            viewRef={this.state.viewRef_bottom}
          />
          <View style={{flex:1}}>
            <View style={{height:25}}>
              <ProgressBar
                style={{height:20, justifyContent:'flex-start'}}
                value={this.state.currentTime}
                onValueChange={(value) => {this.setState({time:value})}}
                minimumValue={0}
                maximumValue={this.state.duration}
                trackStyle={styles.trackStyle}
                thumbStyle={styles.thumbStyle}
                onSlidingStart={() => this._isDragging = true}
                onSlidingComplete={(value) => {
                  RCTPlayer.seekTo(value*60);
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
                <TouchableOpacity onPress={() => console.log("toggle like")}>
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
                <TouchableOpacity onPress={() => console.log("Show playlist")}>
                  {playlist}
                </TouchableOpacity>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <TouchableOpacity style={{marginLeft: 30}} onPress={() => console.log("volume mute")}>
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
                <TouchableOpacity style={{marginRight: 30}} onPress={() => console.log("volume up")}>
                  {volume_up}
                </TouchableOpacity>
              </View>
              <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => console.log("share")}>
                  {share}
                </TouchableOpacity>
                <TouchableHighlight underlayColor='transparent' onPress={this._onChangeShuffleMode.bind(this)}>
                  <View style={this.props.shuffle !== 'none' ? {backgroundColor:'gray', borderRadius:5}: null}>
                    <Icon name="ios-shuffle" size={20} style={styles.icon}/>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor='transparent' onPress={this._onChangeRepeatMode.bind(this)}>
                  <View style={this.props.repeat !== 'none' ? {backgroundColor:'gray', borderRadius:5} : null}>
                    <Icon name="ios-repeat" size={20} style={styles.icon}/>
                    { this.props.repeat === 'single' ? (<Text style={{position: 'absolute', right:5, top:3, fontSize:5}}>1</Text>) : null }
                  </View>
                </TouchableHighlight>
                <TouchableOpacity onPress={() => console.log("more")}>
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
  },
  icon: {
    marginHorizontal: 5
  },
});

export default Player;
