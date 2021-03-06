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

import BottomSheet from './BottomSheet';

export default class PopularTracks extends Component{

  static propTypes = {
    isFetching: React.PropTypes.bool,
    items: React.PropTypes.array,
    error: React.PropTypes.string,
  }

  static defaultProps = {
    isFetching: false,
    items: [],
    error: '',
  }

  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: ds.cloneWithRows([]),
    }
  }

  componentDidMount() {
    this.props.fetchItems();
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({dataSource: this.state.dataSource.cloneWithRows(nextProps.items)});
  }

  _playTrack(rowID) {
    this.props.clearTracks();
    this.props.addTracks(this.props.items, parseInt(rowID));
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

  _renderRow(rowData, sectionID, rowID) {
    const { title, rap_name, artwork_url } = rowData;

    return (
      <View style={styles.rowContainer}>
        <TouchableHighlight style={{flex:1}} underlayColor='transparent' onPress={this._playTrack.bind(this, rowID)}>
          <View style={styles.rowSubContainer}>
            <View style={styles.rank}>
              <Text style={styles.title}>{Number(rowID)+1}</Text>
            </View>
            <Image style={styles.thumbnail} source={{uri:artwork_url}}/>
            <View style={styles.textContainer}>
              <Text numberOfLines ={1} style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>{rap_name}</Text>
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={{right:10}} underlayColor='transparent' onPress={this._showMore.bind(this, rowData)}>
          <Icon name="ios-more" size={20}/>
        </TouchableHighlight>
      </View>
    )
  }

  _renderList() {
    return (
      <View style={{flex:1, alignSelf:'stretch'}}>
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
              Actions.artist({userInfo: json});
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

  _renderAcivityIndicator() {
    return(
      <ActivityIndicator
        style={styles.centering}
        size="large"
      />
    )
  }

  render() {
    return(
      <View style={styles.container}>
        { this.props.isFetching ? this._renderAcivityIndicator() : this._renderList() }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
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
    // flex:1,
    // alignSelf: 'stretch'
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
