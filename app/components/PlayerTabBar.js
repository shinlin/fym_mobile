'use strict';

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from 'react-native';



export default class PlayerTabBar extends Component {
  static propTypes = {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    textStyle: Text.propTypes.style,
    tabStyle: View.propTypes.style,
    activeBgColor: React.PropTypes.string,
    inactiveBgColor: React.PropTypes.string,
    activeTextColor: React.PropTypes.string,
    inactiveTextColor: React.PropTypes.string,
  }

  static defaultProps = {
    activeTextColor: 'white',
    inactiveTextColor: 'black',
    activeBgColor: 'rgba(0, 0, 0, 0.5)',
    inactiveBgColor: 'rgba(255,255,255,0.5)',
  }

  renderTabOption(name, page) {
    const isTabActive = this.props.activeTab === page;
    const { activeTextColor, inactiveTextColor, textStyle, activeBgColor, inactiveBgColor } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const bgColor = isTabActive ? activeBgColor : inactiveBgColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';

    var TouchableElement = TouchableOpacity;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }

    return (
      <TouchableElement key={name} onPress={() => this.props.goToPage(page)}>
        <View style={[styles.tab, { backgroundColor: bgColor }]}>
          <Text style={[{color: textColor, fontSize:10}, textStyle, ]}>
            {name}
          </Text>
        </View>
      </TouchableElement>
    )
  }

  render() {
    return (
      <View style={[styles.tabs, this.props.style, ]}>
        {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderWidth: 0.5,
    paddingHorizontal:10,
    marginHorizontal:1,
  },
  tabs: {
    margin: 8,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
