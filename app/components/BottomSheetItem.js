import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

class BottomSheetItem extends Component {
  static propTypes = {
    text: React.PropTypes.string,
    onPress: React.PropTypes.func,
    iconName: React.PropTypes.string,
    iconSize: React.PropTypes.number,
    iconColor: React.PropTypes.string,
    itemHeight: React.PropTypes.number,
    data: React.PropTypes.object,
  }

  static defaultProps = {
    iconSize: 20,    
  }

  render() {
    const { text, onPress, iconName, iconColor, iconSize, itemHeight, data } = this.props;

    return (
      <TouchableHighlight underlayColor='lightgray' onPress={() => onPress(data)}>
        <View style={[styles.container, { height: itemHeight }]}>
          <View style={styles.icon}>
            <Icon name={iconName} size={iconSize} color={iconColor}/>
          </View>
          <Text style={styles.text}>{text}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    paddingHorizontal:10,
    alignItems:'center',
  },
  icon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
  }
});

module.exports = BottomSheetItem;
