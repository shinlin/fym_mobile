import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ListView,
  TouchableHighlight,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import RCTPlayer from 'react-native-player';

export default class Playlist extends Component{

  static propTypes = {
    tracks: React.PropTypes.array,
    player: React.PropTypes.object,
  }

  static defaultProps = {
    tracks: [],
  }

  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: ds.cloneWithRows(this.props.tracks),
      highlightedRow: null,
    }
  }

  componentDidMount() {
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({dataSource: this.state.dataSource.cloneWithRows(nextProps.tracks)});
  }

  _play(rowID) {
    this.props.changeCurrentTrack(parseInt(rowID), true);
  }

  _renderSeparator(sectionID, rowID) {
    return (
      <View key={`${sectionID}-${rowID}`} style={styles.separator}/>
    )
  }

  _renderRow(rowData, sectionID, rowID) {
    const { title, rap_name, artwork_url } = rowData;

    return (
      <View style={styles.rowContainer}>
        <TouchableHighlight style={{flex:1}} underlayColor='transparent' onPress={this._play.bind(this, rowID)}>
          <View style={styles.rowSubContainer}>
            <Image style={styles.thumbnail} source={{uri:artwork_url}}/>
            <View style={styles.textContainer}>
              <Text numberOfLines ={1} style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>{rap_name}</Text>
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={{right:10}} underlayColor='transparent'>
          <Icon name="ios-more" size={20}/>
        </TouchableHighlight>
      </View>
    )
  }

  render() {
    const { player, tracks } = this.props;
    let trackInfo = tracks[player.currentTrackIndex];

    return(
      <View style={styles.container}>
        <View style={[styles.rowSubContainer, {backgroundColor:'lightgray', paddingVertical: 5,}]}>
          <Image style={styles.thumbnail} source={{uri:trackInfo.artwork_url}}/>
          <View style={styles.textContainer}>
            <Text numberOfLines ={1} style={styles.title}>{trackInfo.title}</Text>
            <Text style={styles.subtitle}>{trackInfo.rap_name}</Text>
          </View>
        </View>        
      
        <ListView
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          enableEmptySections={true}
          initialListSize={20}
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
    marginTop: 54,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
  },
  rowSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 48,
    height: 48,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
    margin: 8,
  },
  list: {
//    backgroundColor: 'rgba( 125, 125, 125, 0.3 )'
  },
  contentContainer: {
//    flex:1,
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
    width: 30,
    justifyContent: 'center',
     alignItems: 'center',
  }
});
