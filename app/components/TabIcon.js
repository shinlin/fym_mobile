import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import FoundationIcons from 'react-native-vector-icons/Foundation'; 

const TabIcon = (props) => {

  return (
    <View style={{alignItems:'center', backgroundColor: 'black'}}>
      <FoundationIcons
        name={props.selected ? props.activeIcon : props.inactiveIcon}
        style={{ color: props.selected ? 'white' : 'gray' }}
        size={30}
      />
      {props.title && <Text style={{textAlign:'center', fontSize:8}}>{props.title}</Text>}
    </View>
  )
}

TabIcon.propTypes = {
  selected: PropTypes.bool,
  iconName: PropTypes.string,
  title: PropTypes.string,
  activeIcon: PropTypes.string,
  inactiveIcon: PropTypes.string,
};

export default TabIcon;
