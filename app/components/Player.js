import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  DeviceEventEmitter,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import RCTPlayer from 'react-native-player';
import { Actions, ActionConst } from 'react-native-router-flux';
import ProgressBar from 'react-native-slider';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import { CHANGE_TYPES, PLAY_STATUS } from '../constants/constants';
import { convertMsToTime, convertSecToTime } from './utils';
import CoverView from '../components/CoverView';
import BottomSheet from '../components/BottomSheet';

class Player extends Component {
  static propTypes = {
    trackInfo: React.PropTypes.object,
    tracks: React.PropTypes.array,
    currentTrackIndex: React.PropTypes.number,
    autoplay: React.PropTypes.bool,
    startPosition: React.PropTypes.number,
  }

  static defaultProps = {
    trackInfo: {},
    currentTrackIndex: null,
    tracks: [],
    autoplay: true,
    startPosition: 0,
  }

  state = {
    strCurrentTime: convertSecToTime(this.props.startPosition),
    currentTime: this.props.startPosition,
    showCover: true,
    showModal: false,
  }

  constructor(props) {
    super(props);

    this._isDragging = false;
    this._onUpdatePosition = this._onUpdatePosition.bind(this);
  }

  _onUpdatePosition(event) {
    if (this._isDragging) return;

    this.setState({
      strCurrentTime: convertMsToTime(event.currentPosition),
      currentTime: parseInt(event.currentPosition/60),      
    });
  }

  componentDidMount() {
    DeviceEventEmitter.addListener('onUpdatePosition', this._onUpdatePosition);
    
    if (this.props.autoplay) {
      if (this.props.player.status === PLAY_STATUS.PLAYING) {
        RCTPlayer.stop();
        this.props.actions.changePlayerStatus(PLAY_STATUS.END);
      }

      RCTPlayer.prepare(this.props.trackInfo.stream_url, true);
      this.props.actions.changePlayerStatus(PLAY_STATUS.PLAYING);
    }
  }

  componentWillUnmount() {
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
    } else if (player.status === PLAY_STATUS.END || player.status === PLAY_STATUS.INIT) {
      RCTPlayer.prepare(this.props.trackInfo.stream_url, true);
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
    let mode = this.props.player.repeat;
    switch(mode) {
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
    this.props.actions.changeShuffleMode(this.props.player.shuffle === 'shuffle' ? 'none' : 'shuffle');
  }

  render() {
    const { player, trackInfo } = this.props;

    return (
      <View style={styles.container}>
        <BottomSheet
          ref='bottomsheet'
          animationType='slide'
          transparent={true}
          visible={false}
          onRequestClose={() => console.log("hahaha")}
        >
          <BottomSheet.Item onPress={() => console.log("Track Info pressed...")} text='Track Info' iconName='ios-musical-notes-outline'/>
          <BottomSheet.Item onPress={() => console.log("Artist Info pressed...")} text='Artist Info' iconName='md-person'/>
          <BottomSheet.Item onPress={() => console.log("Like pressed...")} text='Like' iconName='ios-heart'/>
          <BottomSheet.Item onPress={() => console.log("Share pressed...")} text='Share' iconName='ios-share-outline'/>
        </BottomSheet>

        <View style={styles.trackInfo}>
          <CoverView 
            showCover={this.state.showCover} 
            trackInfo={trackInfo}
            onSwitchView={() => this.setState({showCover: !this.state.showCover})}
          />
        </View>

        <View style={styles.playerControls}>
          <View style={{height:25}}>
            <ProgressBar
              style={{height:20, justifyContent:'flex-start'}}
              value={this.state.currentTime}
              onValueChange={(value) => {this.setState({time:value})}}
              minimumValue={0}
              maximumValue={parseInt(trackInfo.duration/60)}
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
              <Text style={{fontSize:10, marginRight:10}}>{convertMsToTime(trackInfo.duration)}</Text>
            </View>
          </View>
          <View style={{flex:1, justifyContent:'space-between', margin:10, marginTop:0}}>
            <View style={{alignItems:'center'}}>
              <Text style={{fontSize:18, fontWeight:'bold', color:'black'}}>{trackInfo.title}</Text>
              <Text style={{fontSize:14, color:'orangered'}}>{trackInfo.rap_name}</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Icon.Button
                name='ios-more'
                size={20}
                color='black'
                backgroundColor='transparent'
                iconStyle={{marginRight:0}}
                style={{marginHorizontal:5, padding:0}}
                onPress={() => this.refs.bottomsheet.open()}
              />
              <Icon.Button
                name="ios-rewind"
                size={30}
                color='black'
                backgroundColor='transparent'
                iconStyle={{marginRight:0}}
                style={{marginHorizontal:5, padding:0}}
                onPress={this._playPrev.bind(this)}
              />
              <Icon.Button
                name={player.status === PLAY_STATUS.PLAYING ? 'ios-pause' : 'ios-play'}
                size={50}
                color='black'
                backgroundColor='transparent'
                iconStyle={{marginRight:0}}
                style={{marginHorizontal:5, padding:0}}
                onPress={this._playAndPause.bind(this)}
              />
              <Icon.Button
                name="ios-fastforward"
                size={30}
                color='black'
                backgroundColor='transparent'
                iconStyle={{marginRight:0}}
                style={{marginHorizontal:5, padding:0}}
                onPress={this._playNext.bind(this)}
              />
              <Icon.Button
                name="ios-list"
                size={25}
                color='black'
                backgroundColor='transparent'
                iconStyle={{marginRight:0}}
                style={{marginHorizontal:5, padding:0}}
                onPress={() => Actions.playlist()}
              />
            </View>
            <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <TouchableHighlight underlayColor='transparent' onPress={this._onChangeShuffleMode.bind(this)}>
                <View style={player.shuffle !== 'none' ? {backgroundColor:'gray', borderRadius:5}: null}>
                  <Icon name="ios-shuffle" size={20} color='black' style={styles.icon}/>
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor='transparent' onPress={this._onChangeRepeatMode.bind(this)}>
                <View style={player.repeat !== 'none' ? {backgroundColor:'gray', borderRadius:5} : null}>
                  <Icon name="ios-repeat" size={20} color='black' style={styles.icon}/>
                  { player.repeat === 'single' ? (<Text style={{position: 'absolute', right:5, top:3, fontSize:5}}>1</Text>) : null }
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>

        <TouchableHighlight style={{position: 'absolute', top:5, left:5, padding:5}} underlayColor='transparent' onPress={() => Actions.pop()}>
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
  trackInfo: {
    flex:2,
    alignSelf:'stretch',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',
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
});

module.exports = Player;
