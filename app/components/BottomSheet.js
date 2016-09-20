import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Modal,
  Dimensions,
} from 'react-native';
import BottomSheetItem from './BottomSheetItem';

const screen = Dimensions.get('window');
const CANCEL_HEIGHT = 50;

class BottomSheet extends Component {
  static propTypes = {
    ...Modal.propTypes,
    itemHeight: React.PropTypes.number,
  }

  static defaultProps = {
    itemHeight: 50,
  }

  static Item = BottomSheetItem;

  state = {
    showModal: this.props.visible,
  }

  open() {
    this.setState({showModal: true});
  }

  close() {
    this.setState({showModal: false});
  }

  render() {
    const { animationType, transparent, onRequestClose, itemHeight } = this.props;

    let containerHeight = this.props.children.length * itemHeight + CANCEL_HEIGHT;

    return(
      <Modal
        animationType={animationType}
        transparent={transparent}
        visible={this.state.showModal}
        onRequestClose={() => onRequestClose()}
      >
        <View style={[styles.container,{width:screen.width, height:containerHeight}]}>
          <View style={{flex:1}}>
            {React.Children.map(this.props.children, (child) => {
              return React.cloneElement(child, { itemHeight: itemHeight })
            })}
          </View>
          <View style={styles.cancelBox}>
            <TouchableHighlight
              underlayColor='lightgray'
              onPress={() => this.close()}
              style={styles.cancelButton}>
                <Text>Cancel</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
  },
  cancelBox: {
    position: 'absolute',
    height: CANCEL_HEIGHT,
    width: screen.width,
    bottom: 0,    
  },
  cancelButton: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    borderTopWidth:0.5,
    borderColor:'gray',
  }
});

module.exports = BottomSheet;
