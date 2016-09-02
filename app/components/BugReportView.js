import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Alert,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class BugReportView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      message: '',
      height: 0,
    }
  }

  componentDidMount() {
    //this.refs.textinput.
  }

  _onSubmit() {

    fetch('http://www.feedyourmusic.com/api/v1/bug_report', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: this.state.message,
      })
    })
    .then((response) => {
      if (response.ok) {
        Alert.alert(
          'Alert',
          'Message has been successfully sent!',
          [
            { text: 'OK', onPress: () => Actions.pop() },
          ]
        )
      } else {
        console.log("There is an error!");        
      }
    }, (error) => {
      console.log(error);
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{fontSize:14}} onPress={() => Actions.pop()}>Close</Text>
          <Text style={{fontSize:14}} onPress={this._onSubmit.bind(this)}>Submit</Text>
        </View>
        <View style={{padding:10}}>
          <TextInput            
            ref='textinput'
            style={{height: Math.max(35, this.state.height)}}
            multiline={true}
            numberOfLines={20}
            onChange={(event) => this.setState({
              message: event.nativeEvent.text,
              height: event.nativeEvent.contentSize.height,
            })}
            value={this.state.message}
            underlineColorAndroid='transparent'
            autoFocus={true}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  header: {
    flexDirection:'row',
    height:50,
    paddingHorizontal:10,
    justifyContent:'space-between',
    alignItems:'center',
    borderBottomColor:'black',
    borderBottomWidth:1
  }
});

export default BugReportView;