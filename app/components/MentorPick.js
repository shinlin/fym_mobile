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

export default class MentorPick extends Component{

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

  _onShowList(rowData) {
    const instructor = Object.keys(rowData)[0];
    const tracks = rowData[instructor];

    Actions.parallax({ instructor, tracks, ...this.props });    
  }

  _renderRow(rowData, sectionID, rowID) {
    const instructor = Object.keys(rowData)[0];
    const tracks = rowData[instructor];

    var left = 20;  
    var zIndex = 10;

    return (
      <View style={styles.rowContainer}>
        <TouchableHighlight style={{flex:1}} underlayColor='transparent' onPress={this._onShowList.bind(this, rowData)}>
          <View>
            <View style={{flex:1, height:160, flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}}>
              {tracks.map((track, index) => {
                if( index >= 4 ) return;

                left = left - 20;
                zIndex = zIndex -1;
                return (
                  <Image key={`${index}`} style={{width:100, height:100, left: left, zIndex: zIndex}} source={{uri: track.artwork_url.replace('badge', 'large')}}/>
                )
              })}
            </View>
            <View>
              <Text style={{color:'white', fontSize:14}}>{Object.keys(rowData)[0]}'s Pick</Text>
              <Text style={{color:'white', fontSize:8}}>FeedYourMusic 재생 목록</Text>
            </View>
          </View>
        </TouchableHighlight>
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
    marginBottom: 50,
  },
  rowContainer: {
    flex: 1,
    padding: 8,
    backgroundColor: 'black'
  },
  image: {
    flex: 1,
    height: 200,
    alignSelf: 'stretch',
  },
  textContainer: {
    flex:1,
    justifyContent: 'flex-end',
    bottom:10
  },
  list: {
  },
  contentContainer: {
  },
  separator: {
    height: 2,
    alignSelf: 'stretch',
    backgroundColor: 'white',
  },
  iconText: {
    fontSize:10,
    marginHorizontal:3
  },
  icon: {
    flexDirection:'row',
    justifyContent:'center',
    padding:3,
    borderRadius:2,
    borderColor:'gray', 
    borderWidth:0.5
  },
  text: {
    backgroundColor:'rgba(0, 0, 0, 0.8)',
    fontSize:12,
    padding:2,
  }
});
