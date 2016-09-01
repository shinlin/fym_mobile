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
        <View style={}>
          <Text style={{fontSize:14}} onPress={() => Actions.pop()}>Close</Text>
          <Text style={{fontSize:14}} onPress={this._onSubmit.bind(this)}>Submit</Text>
        </View>
        <View style={{flex:1}}>
          <TextInput            
            ref='textinput'
            multiline={true}
            numberOfLines={20}
            onChangeText={(message) => this.setState({message})}
            value={this.state.message}
            underlineColorAndroid='transparent'
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