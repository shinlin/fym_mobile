import React, { Component } from 'react';
import {
  PanResponder,
  StyleSheet,
  View,
  processColor,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';

var CIRCLE_SIZE = 50;

class BugReportButton extends Component {

  constructor(props) {
    super(props);

    this._panResponder = {};
    this._previousLeft = props.style.left;
    this._previousTop = props.style.top;
    this._circleStyles = {};
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder.bind(this),
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder.bind(this),
      onPanResponderGrant: this._handlePanResponderGrant.bind(this),
      onPanResponderMove: this._handlePanResponderMove.bind(this),
      onPanResponderRelease: this._handlePanResponderEnd.bind(this),
      onPanResponderTerminate: this._handlePanResponderEnd.bind(this),
    });

    this._circleStyles = {
      style: {
        left: this._previousLeft,
        top: this._previousTop,        
      }
    };
  }

  componentDidMount() {
    this._updateNativeStyles();
  }

  _updateNativeStyles() {
    this.circle && this.circle.setNativeProps(this._circleStyles);
  }

  _handleStartShouldSetPanResponder(e: Object, gestureState: Object): boolean {
    // Should we become active when the user presses down on the circle?
    return true;
  }

  _handleMoveShouldSetPanResponder(e: Object, gestureState: Object): boolean {
    // Should we become active when the user moves a touch over the circle?
    return true;
  }

  _handlePanResponderGrant(e: Object, gestureState: Object) {
  }

  _handlePanResponderMove(e: Object, gestureState: Object) {
    this._circleStyles.style.left = this._previousLeft + gestureState.dx;
    this._circleStyles.style.top = this._previousTop + gestureState.dy;
    this._updateNativeStyles();
  }

  _handlePanResponderEnd(e: Object, gestureState: Object) {
    this._previousLeft += gestureState.dx;
    this._previousTop += gestureState.dy;
  }

  render() {
    return (
      <View
        ref={(circle) => {
          this.circle = circle;
        }}
        style={styles.circle}
        {...this._panResponder.panHandlers}
      >
        <TouchableHighlight underlayColor='transparent' style={styles.iconButton} onPress={() => Actions.bugreport()}>
          <Icon name='ios-bug' size={30}/>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    position: 'absolute',
    right: 10,
    bottom: 120,
    backgroundColor: 'white',
    borderColor:'gray',
    borderWidth:1,
  },
  iconButton: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default BugReportButton;