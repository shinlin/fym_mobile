import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  DeviceEventEmitter,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import RCTPlayer from 'react-native-player';
import { Actions } from 'react-native-router-flux';
import ProgressBar from 'react-native-slider';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import { CHANGE_TYPES, PLAY_STATUS } from '../constants/SongConstants';
import { convertMsToTime } from './utils';
import PlayerTabBar from './PlayerTabBar';
import CoverView from '../components/CoverView';

const playIcon = (<Icon name="ios-play" size={50} />);
const pauseIcon = (<Icon name="ios-pause" size={50} />);
const nextIcon = (<Icon name="ios-fastforward" size={30} />);
const prevIcon = (<Icon name="ios-rewind" size={30} />);
const like = (<Icon name="ios-heart-outline" size={20} />);
const share = (<Icon name="ios-share-outline" size={20} />);
const more = (<Icon name="ios-more" size={20} />);
const playlist = (<Icon name="ios-list" size={20} />);

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
      strCurrentTime: '00:00',
      strDuration: '00:00',
      currentTime: 0,
      duration: 0,
      showCover: true,
    }

    this._onPlayerStateChanged = this._onPlayerStateChanged.bind(this);
    this._onUpdatePosition = this._onUpdatePosition.bind(this);
  }

  _onPlayerStateChanged(event) {
    if(event.playbackState === 4) { // READY
      RCTPlayer.getDuration(duration => {
        this.setState({
        strDuration: convertMsToTime(duration),
        duration: parseInt(duration/60),
        })
      });
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
    DeviceEventEmitter.addListener('onPlayerStateChanged', this._onPlayerStateChanged);
    DeviceEventEmitter.addListener('onUpdatePosition', this._onUpdatePosition);

    if (this.props.player.status === PLAY_STATUS.PLAYING) {
      RCTPlayer.stop();
      this.props.actions.changePlayerStatus(PLAY_STATUS.END);
    }

    RCTPlayer.prepare(this.props.trackInfo.stream_url, true);
    this.props.actions.changePlayerStatus(PLAY_STATUS.PLAYING);
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeListener('onPlayerStateChanged', this._onPlayerStateChanged);
    DeviceEventEmitter.removeListener('onUpdatePosition', this._onUpdatePosition);
  }

  componentWillReceiveProps(nextProps: object) {
    if (this.props.currentTrackIndex !== nextProps.currentTrackIndex) {
      RCTPlayer.stop();
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

    console.log(trackInfo);

    return (
      <View style={styles.container}>
        <View style={{flex:2, alignSelf:'stretch', alignItems:'center', justifyContent:'center', backgroundColor:'white'}}>
          <CoverView 
            showCover={this.state.showCover} 
            trackInfo={trackInfo} onSwitchView={() => this.setState({showCover: !this.state.showCover})}/>
        </View>

        <View style={styles.playerControls}>
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
              <Text style={{fontSize:18, fontWeight:'bold', color:'black'}}>{trackInfo.title}</Text>
              <Text style={{fontSize:14, color:'orangered'}}>{trackInfo.rap_name}</Text>
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
              <TouchableOpacity onPress={() => Actions.playlist()}>
                {playlist}
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

        <TouchableHighlight style={{position: 'absolute', top:5, left:5}} onPress={() => Actions.pop()}>
          <Icon name="ios-arrow-down" color='black' size={30}/>
        </TouchableHighlight>
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
    backgroundColor: 'whitesmoke',
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
  contentContainerStyle: {
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color:'black',
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 10,
  },
  description: {
    fontSize: 10,
    color: 'red',
  }
});

export default Player;
