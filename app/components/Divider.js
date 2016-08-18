import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const Divider = ({
  style,
  text,
  textSize,
  color,
  height,
}) => {

  const defaultStyle = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'stretch',
    },
    divider: {
      height: height,
      backgroundColor: color,
      flex: 1,
    },
    text: {
      marginLeft: 5,
      marginRight: 5,
    },
  });

  _renderPlainDivier = function(style) {
    return (
      <View style={[defaultStyle.container, style]}>
        <View style={defaultStyle.divider}></View>
      </View>
    );
  }

  _renderDividerWithText = function(style, text) {
    return (
      <View style={[defaultStyle.container, style]}>
        <View style={defaultStyle.divider}></View>
          <Text style={[defaultStyle.text, {fontSize:textSize}]}>{text}</Text>
        <View style={defaultStyle.divider}></View>
      </View>
    );
  }

  return (
    <View>
      {text === null ? _renderPlainDivier(style) : _renderDividerWithText(style, text)}
    </View>
  )
}

Divider.propTypes = {
  style: PropTypes.object,
  textSize: PropTypes.number,
  text: PropTypes.string,
  color: PropTypes.string,
};

Divider.defaultProps = {
  textSize: 12,
  text: null,
  color: '#cccccc',
  height: 1,
};

export default Divider;
