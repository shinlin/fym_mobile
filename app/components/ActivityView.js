import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  Image,
  RefreshControl,
} from 'react-native';

import Icon from 'react-native-vector-icons/Foundation';

class ActivityView extends Component {

  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: ds.cloneWithRows([]),
      isRefreshing: false,
    }
  }

  componentDidMount() {
    var activities = require('../../assets/mock_activity.json').activities;
    console.log(activities);
    this.setState({dataSource: this.state.dataSource.cloneWithRows(activities)});
  }
  
  _renderSeparator(sectionID, rowID) {
    return (
      <View key={`${sectionID}-${rowID}`} style={styles.separator}/>
    )
  }

  _renderRow(rowData, sectionID, rowID) {
    const {  
      type,
      info,
      date
    } = rowData;

    let d = new Date(rowData.date);
    switch(type) {
      case 'feedback': 
        subText = 'gave a feedback to';
        iconName = 'comments';
        iconBg = 'yellowgreen';
        break;
      case 'like':
        subText = 'liked';
        iconName = 'heart';
        iconBg = 'purple';
        break;
      case 'follow':
        subText = 'followed you';
        iconName = 'torso';
        iconBg = 'tomato';
        break;
      case 'publish':
        subText = 'published';
        iconName = 'music';
        iconBg = 'skyblue';        
        break;
      default: 
        subText = '';
    }

    return (
      <View style={styles.rowContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: 'https://unsplash.it/47/47'}}>
          </Image>
          <View style={[styles.icon, {backgroundColor:iconBg}]}>
            <Icon name={iconName} size={12} color='white'/>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={{fontSize:10, height: 18}}>
            <Text style={styles.anchorText}>{info.user}</Text> {subText} <Text style={styles.anchorText}>{info.track ? info.track : null}</Text>
          </Text>
          <Text style={{fontSize:10, height: 18, color:'black'}}>{d.toLocaleString('fa-IR')}</Text>
        </View>
      </View>
    )
  }

  _onRefresh() {
    if (this._isMounted) {
      this.setState({
        isRefreshing: true,
      });

//      this.props.fetchItems();
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
      <ListView
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        enableEmptySections={true}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)}
        renderSeparator={this._renderSeparator.bind(this)}
        refreshControl={this._renderRefreshControl()}
      />
    )
  }
}

const styles = StyleSheet.create({
  list: {
  },
  contentContainer: {
    paddingBottom: 50 + 64,

  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems:'center',
    justifyContent:'center',
    margin: 5,
  },
  textContainer: {
    flex:1,
    margin: 5,
  },
  image: {
    width:48,
    height:48,
    borderRadius: 24,
  },
  icon: {
    width:20,
    height:20,
    position: 'absolute',
    right:0,
    bottom:0,
    justifyContent:'center',
    alignItems:'center',
    borderWidth:0.5,
    borderColor:'white',
    borderRadius:10,    
  },
  separator: {
    height: 0.5,
    alignSelf: 'stretch',
    backgroundColor: 'darkgray',
  },
  anchorText: {
   textDecorationLine:'underline',
   color:'black',
  }
});

export default ActivityView;
