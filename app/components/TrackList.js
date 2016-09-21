import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ListView,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as playlistActions from '../actions/playlist';

import BottomSheet from './BottomSheet';

class TrackList extends Component{

  static propTypes = {
    tracks: React.PropTypes.array.isRequired,
    showRank: React.PropTypes.bool,
    showMore: React.PropTypes.bool,
  }

  static defaultProps = {
    showRank: false,
    showMore: true,
  }

  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }).cloneWithRows(props.tracks),
    }
  }

  _playTrack(rowID) {
    const { clearTracks, addTracks } = this.props.actions;
  
    clearTracks();
    addTracks(this.props.tracks, parseInt(rowID));

    Actions.player();
  }  

  _showMore(rowData: object) {
    this.refs.bottomsheet.open(rowData);
  }

  _renderSeparator(sectionID, rowID) {
    return (
      <View key={`${sectionID}-${rowID}`} style={styles.separator}/>
    )
  }

  _renderRank(rowID) {
    return (
      <View style={styles.rank}>
        <Text style={styles.title}>{parseInt(rowID)+1}</Text>
      </View>
    )
  }

  _renderMoreButton(rowData) {
    return (
      <TouchableHighlight 
        underlayColor='transparent' 
        onPress={() => this._showMore(rowData)}>
        <Icon name="ios-more" size={20} style={{marginHorizontal:5}}/>
      </TouchableHighlight>      
    )
  }

  _renderRow(rowData, sectionID, rowID) {
    const { title, rap_name, artwork_url } = rowData;

    return (
      <View style={styles.rowContainer}>
        <TouchableHighlight style={{flex:1}} underlayColor='transparent' onPress={() => this._playTrack(rowID)}>
          <View style={styles.rowSubContainer}>
            <Image style={styles.thumbnail} source={{uri:artwork_url}}/>
            {this.props.showRank && this._renderRank(rowID)}
            <View style={styles.textContainer}>
              <Text numberOfLines ={1} style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>{rap_name}</Text>
            </View>
          </View>
        </TouchableHighlight>
        {this.props.showMore && this._renderMoreButton(rowData)}
      </View>
    )
  }

  render() {
    return(
      <View style={styles.container}>
        <BottomSheet
          ref='bottomsheet'
          animationType='fade'
          transparent={true}
          visible={false}
          onRequestClose={() => console.log("hahaha")}
        >
          <BottomSheet.Item onPress={() => console.log("Track Info pressed...")} text='Track Info' iconName='ios-musical-notes-outline'/>
          <BottomSheet.Item text='Artist Info' iconName='md-person' onPress={(data) => {
            fetch("http://www.feedyourmusic.com/api/v1/artist_info?id="+data.student_id)
            .then(response => response.json())
            .then(json => {
              this.refs.bottomsheet.close();
              Actions.artist({userInfo: json})
            })
            .catch(error => console.warn(error));
          }}/>
          <BottomSheet.Item onPress={() => console.log("Like pressed...")} text='Like' iconName='ios-heart'/>
          <BottomSheet.Item onPress={() => console.log("Share pressed...")} text='Share' iconName='ios-share-outline'/>
        </BottomSheet>

        <ListView
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          renderSeparator={this._renderSeparator.bind(this)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    
  },
  rowSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: 'gray',
    marginRight: 5,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  list: {
    alignSelf: 'stretch'
  },
  contentContainer: {
//    flex:1,
    paddingHorizontal: 5
  },
  title: {
    fontSize: 12,
    color: 'black',
  },
  subtitle: {
    fontSize: 10,
    color: 'gray',
  },
  separator: {
    height: 0.5,
    alignSelf: 'stretch',
    backgroundColor: 'darkgray',
  },
  rank: {
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(playlistActions, dispatch),
  }
}

module.exports = connect(null, mapDispatchToProps)(TrackList);
