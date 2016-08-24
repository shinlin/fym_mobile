import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ListView,
  TouchableHighlight,
  RefreshControl,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

export default class NewTracks extends Component{

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

    this._isMounted = false;

    this.state = {
      dataSource: ds.cloneWithRows([]),
      isRefreshing: false,
    }
  }

  componentDidMount() {
    this.props.fetchItems();
    this._isMounted = true; 
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.items),
      isRefreshing: false,
    });
  }

  _playTrack(rowData: object) {
    this.props.addTrack(rowData, true);
    Actions.player();
  }

  _renderSeparator(sectionID, rowID) {
    return (
      <View key={`${sectionID}-${rowID}`} style={styles.separator}/>
    )
  }

  _renderRow(rowData, sectionID, rowID) {
    const { title, rap_name, artwork_url, playback_count, likes } = rowData;

    return (
      <View style={styles.rowContainer}>
        <TouchableHighlight style={{flex:1}} underlayColor='transparent' onPress={this._playTrack.bind(this, rowData)}>
          <Image 
            style={{flex: 1, height:200, alignSelf:'stretch'}} 
            resizeMode='stretch' 
            source={{uri: artwork_url.replace('badge', 'crop')}}
          >
            <View style={{flex:1, justifyContent: 'flex-end', bottom:10}}>
              <Text style={{backgroundColor:'rgba(0, 0, 0, 0.8)', color:'lightgray', fontSize:12, padding:2, marginBottom:2}}>{rap_name}</Text>
              <Text style={{backgroundColor:'rgba(0, 0, 0, 0.8)', color:'white', fontSize:12, padding:2, }}>{title}</Text>
            </View>
          </Image>
        </TouchableHighlight>
        <View style={{flexDirection:'row', justifyContent:'flex-end', marginTop:8}}>
          <TouchableHighlight>
            <View style={{flexDirection:'row', justifyContent:'center', padding:3, marginRight:5, borderRadius:2, borderColor:'gray', borderWidth:0.5}}>
              <Icon name="ios-headset" size={15} style={{marginHorizontal:3}}/>
              <Text style={{fontSize:10, marginHorizontal:3}}>{playback_count}</Text> 
            </View>
          </TouchableHighlight>
          <TouchableHighlight>
            <View style={{flexDirection:'row', justifyContent:'center', padding:3, borderRadius:2, borderColor:'gray', borderWidth:0.5}}>
              <Icon name="ios-heart" size={15} style={{marginHorizontal:3}}/>
              <Text style={{fontSize:10, marginHorizontal:3}}>{likes}</Text> 
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  _onRefresh() {
    if (this._isMounted) {
      this.setState({
        isRefreshing: true,
      });

      this.props.fetchItems();
    }    
  }

  _renderRefreshControl() {
    return (
      <RefreshControl
        onRefresh={this._onRefresh.bind(this)}
        refreshing={this.state.isRefreshing}
        tintColor="#ff0000"
        title="Loading..."
        titleColor="#00ff00"
      />
    )
  }

  render() {
    return(
      <View style={styles.container}>
        <ListView
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          renderSeparator={this._renderSeparator.bind(this)}
          refreshControl={this._renderRefreshControl()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop: 54,
    marginBottom: 50,
  },
  rowContainer: {
    flex: 1,
    margin: 8
  },
  rowSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    height: 5,
    alignSelf: 'stretch',
    backgroundColor: 'lightgray',
  },
});
