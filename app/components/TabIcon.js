import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TabIcon = (props) => (
  <View style={{alignItems:'center'}}>
    <Icon
      name={props.selected ? props.activeIcon : props.inactiveIcon}
      style={{ color: props.selected ? 'red' : 'black' }}
      size={30}
    />
    <Text style={{textAlign:'center', fontSize:8}}>{props.title}</Text>
  </View>
);

TabIcon.propTypes = {
  selected: PropTypes.bool,
  iconName: PropTypes.string,
  title: PropTypes.string,
  activeIcon: PropTypes.string,
  inactiveIcon: PropTypes.string,
};

export default TabIcon;
