import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ListView,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../actions';

class Hot99 extends Component{

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
    this.props.actions.fetchItems();
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({dataSource: this.state.dataSource.cloneWithRows(nextProps.items)});
  }

  _renderSeparator(sectionID, rowID) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: 0.5,
          alignSelf: 'stretch',
          backgroundColor: 'darkgray',
        }}
      />
    )
  }

  _renderRow(rowData, sectionID, rowID) {
    const { title, rap_name, artwork_url } = rowData;

    return (
      <View style={styles.rowContainer}>
        <Image style={styles.thumbnail} source={{uri:artwork_url}}/>
        <View style={styles.textContainer}>
          <Text numberOfLines ={1} style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{rap_name}</Text>
        </View>
      </View>
    )
  }

  render() {
    return(
      <View style={styles.container}>
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
    marginBottom: 50,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  thumbnail: {
    width: 48,
    height: 48,
  },
  textContainer: {
    flex:1,
    justifyContent: 'space-between',
    margin: 8,
  },
  list: {
    backgroundColor: 'rgba( 125, 125, 125, 0.3 )'
  },
  contentContainer: {
//    flex:1,
  },
  title: {
    fontSize: 13,
  },
  subtitle: {
    fontSize: 10
  }
});

const mapStateToProps = (state) => {
  return {
    isFetching: state.fetch.isFetching,
    items: state.fetch.items,
    error: state.fetch.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ ...actionCreators }, dispatch),
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Hot99);