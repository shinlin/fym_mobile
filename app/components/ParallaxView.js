import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableHighlight,
  Image,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import Divider from './Divider';

export default class ParallaxView extends Component {

  static propTypes = {

  }

  static defaultProps = {

  }

  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    console.log(props);

    this.state = {
      dataSource: ds.cloneWithRows(props.tracks),
//      highlightedRow: null,
    }    
  }

  _play(rowID) {
    this.props.clearTracks();
    this.props.addTracks(this.props.tracks, parseInt(rowID));
    Actions.player();    
  }

  _renderRow(rowData, sectionID, rowID) {
    const { title, rap_name, artwork_url } = rowData;
    
    return(
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
        <Text style={{fontSize:10, marginHorizontal:5}}>00:00</Text>
        <TouchableHighlight style={{marginHorizontal:5}} underlayColor='transparent'>
          <Icon name="ios-more" size={20}/>
        </TouchableHighlight>
      </View>

    )    
  }

  _renderSeparator(sectionID, rowID) {
    return (
      <View key={`${sectionID}-${rowID}`} style={styles.separator}/>
    )
  }

  _renderHeader() {
    return (
      <View style={{flex:1, justifyContent:'center', borderBottomColor:'gray', borderBottomWidth:0.5}}>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
          <View>
            <Text style={{color:'black', fontSize:12}}>전체 재생</Text>
          </View>
          <View>
            <Text style={{color:'black', fontSize:12}}>임의 재생</Text>
          </View>
        </View>      
      </View>
    )
  }

  render() {
    const { tracks, instructor } = this.props;

    return (
      <ParallaxScrollView
        style={{}}
        parallaxHeaderHeight={170}
        fadeOutForeground={true}
        renderBackground={() => (
          <Image
            style={{height:170, alignSelf:'stretch', opacity:0.3}}
            resizeMode='cover'
            source={{uri:tracks[0].artwork_url.replace('badge', 'crop')}}
          />
        )}
        renderForeground={() => (
          <View style={{ height: 170, flex: 1, flexDirection: 'row', padding:10, paddingTop:60}}>
            <View style={{width:94, height:94, flexWrap: 'wrap',flexDirection: 'row', alignItems:'flex-start'}}>
              {tracks.map((track, index) => {
                if(index > 3) return;

                return (
                  <Image key={`${index}`} style={{width:47, height:47}} source={{uri:track.artwork_url.replace('badge', 't67x67')}}/>
                )
              })}
            </View>
            <View style={{flex:1, marginLeft:10, justifyContent:'space-between'}}>
              <View>
                <Text style={{color:'white', fontSize:16}}>{instructor}'s Pick</Text>
                <Text style={{color:'white', fontSize:10}}>재생목록 (FeedYourMusic)</Text>
                <Text style={{color:'white', fontSize:8}}>{tracks.length}곡</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent: 'flex-end', }}>
                <Icon name='ios-add-outline' style={{marginRight:15}} color='white' size={20}/>
                <Icon name='ios-share-outline' style={{marginRight:15}} color='white' size={20}/>
                <Icon name='ios-more-outline' color='white' size={20}/>
              </View>
            </View>
          </View>
        )}>
        <ListView
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderHeader={this._renderHeader.bind(this)}
          renderRow={this._renderRow.bind(this)}
          renderSeparator={this._renderSeparator.bind(this)}
        />
      </ParallaxScrollView>
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
    flexDirection: 'row',
    paddingVertical: 3,
    alignItems: 'center',
  },
  rowSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 47,
    height: 47,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
    margin: 8,
  },
  list: {
//    backgroundColor: 'rgba( 125, 125, 0, 0.3 )'
  },
  contentContainer: {
//    flex:1,
    marginHorizontal: 5,
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
    backgroundColor: 'gray',
  },
  rank: {
    width: 30,
    justifyContent: 'center',
     alignItems: 'center',
  }  
})