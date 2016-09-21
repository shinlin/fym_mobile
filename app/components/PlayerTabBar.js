'use strict';

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from 'react-native';

export default class PlayerTabBar extends Component {
  static propTypes = {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    containerStyle: View.propTypes.style,
    textStyle: Text.propTypes.style,
    tabStyle: View.propTypes.style,
    activeBgColor: React.PropTypes.string,
    inactiveBgColor: React.PropTypes.string,
    activeTextColor: React.PropTypes.string,
    inactiveTextColor: React.PropTypes.string,
  }

  static defaultProps = {
    activeTextColor: 'black',
    inactiveTextColor: 'gray',
    activeBgColor: 'rgba(0, 0, 0, 0.5)',
    inactiveBgColor: 'rgba(255,255,255,0.5)',
  }

  renderTabOption(name, page) {
    const isTabActive = this.props.activeTab === page;
    const { activeTextColor, inactiveTextColor, textStyle, activeBgColor, inactiveBgColor } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const bgColor = isTabActive ? activeBgColor : inactiveBgColor;

    var TouchableElement = TouchableOpacity;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }

    return (
      <TouchableElement key={name} onPress={() => this.props.goToPage(page)}>
        <View style={[styles.tab]}>
          <Text style={[styles.text, {color: textColor}, textStyle]}>
            {name}
          </Text>
        </View>
      </TouchableElement>
    )
  }

  render() {
    const { containerStyle } = this.props;

    return (
      <View style={[styles.container, containerStyle]}>
        <ScrollView 
          contentContainerStyle={styles.tabs}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:40,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 0.5,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:10,
    marginHorizontal:1,
  },
  tabs: {
//    padding: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
  }
});
