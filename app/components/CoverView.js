import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import Divider from './Divider';

export default class CoverView extends Component {
  static propTypes = {
    trackInfo: React.PropTypes.any,
    showCover: React.PropTypes.boolean,
    onSwitchView: React.PropTypes.func,
  }

  static defaultProps = {
    showCover: true,
    onSwitchView: () => {},
  }

  render() {

    const { 
      title, 
      rap_name, 
      request_msg,
      lyrics_text,
      lyrics_score, 
      rhythm_score, 
      rhyme_score, 
      flow_score, 
      completeness_score, 
      quick_response_msg,
      instructor,
      artwork_url,
    } = this.props.trackInfo;

    const image_url = artwork_url.replace('badge', 't300x300');

    const cover = (
      <TouchableWithoutFeedback onPress={this.props.onSwitchView.bind(this)}>
        <View style={{width: 300, height:300, elevation: 10, borderRadius:5, alignItems:'center', justifyContent:'center', backgroundColor:'white'}}>
          <Image style={{width: 300, height:300, borderRadius:5}} source={{uri: image_url}}/>
        </View>
      </TouchableWithoutFeedback>
    )

    const desc = (
      <ScrollView 
        style={{flex: 1, marginTop: 35, marginHorizontal: 10,}}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <TouchableWithoutFeedback onPress={this.props.onSwitchView.bind(this)}>
          <View>
            <Text style={styles.headerText}>곡 정보</Text>
            <Text style={styles.bodyText}>제목: {title}</Text>
            <Text style={styles.bodyText}>래퍼: {rap_name}</Text>
            <Divider color='gray' height={0.5} style={{marginVertical:5}}/>
            <Text style={styles.headerText}>맨토가 중점적으로 봐주었으면 하는 내용</Text>
            <Text style={styles.bodyText}>{request_msg}</Text>
            <Divider color='gray' height={0.5} style={{marginVertical:5}}/>
            <Text style={styles.headerText}>맨토의 피드백 (by {instructor.name})</Text>
            <Text style={styles.bodyText}>박자: {rhythm_score}</Text>
            <Text style={styles.bodyText}>라임: {rhyme_score}</Text>
            <Text style={styles.bodyText}>가사: {lyrics_score}</Text>
            <Text style={styles.bodyText}>플로우: {flow_score}</Text>
            <Text style={styles.bodyText}>완성도: {completeness_score}</Text>
            <Text style={styles.bodyText}>{quick_response_msg}</Text>
            <Divider color='gray' height={0.5} style={{marginVertical:5}}/>
            <Text style={styles.description}>'무료 피드백은 100자까지만 표시됩니다. 프리미엄 피드백을 통해 멘토의 A4용지 한장 이상의 자세한 피드백을 받아보세요. 당신의 곡의 첫줄부터 마지막줄까지 라임 하나까지도 상세하게 피드백 해드립니다.'</Text>          
            <Divider color='gray' height={0.5} style={{marginVertical:5}}/>
            <Text style={styles.headerText}>가사</Text>            
            <Text style={{fontSize:10, color:'black', textAlign:'left'}}>{lyrics_text}</Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    )

    return ( this.props.showCover ? cover : desc );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 35,
    marginHorizontal: 10,
  },
  contentContainerStyle: {
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color:'black',
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 10,
  },
  description: {
    fontSize: 10,
    color: 'red',
  },
  lyric: {
    fontSize:10,
    color:'black',
    textAlign:'center'
  }
})