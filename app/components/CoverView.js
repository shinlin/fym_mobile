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
    showCover: React.PropTypes.bool,
    onSwitchView: React.PropTypes.func,
  }

  static defaultProps = {
    showCover: true,
    onSwitchView: () => {},
  }

  renderCover(trackInfo) {

    const image_url = trackInfo.artwork_url.replace('badge', 't300x300');

    return (
    <TouchableWithoutFeedback onPress={this.props.onSwitchView.bind(this)}>
      <View style={styles.boxShadow}>
        <Image style={styles.image} source={{uri: image_url}}/>
      </View>
    </TouchableWithoutFeedback>
    )
  }

  renderDescription(trackInfo) {
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
      instructor_id,
      complete_date,
      instructor,
      artwork_url,
    } = trackInfo;

    const incomplete_feedback = (
      <Text style={styles.bodyText}>아직 feedback이 완료되지 않았습니다.</Text>
    )

    const complete_feedback = (
      <View>
        <Text style={styles.bodyText}>박자: {rhythm_score}</Text>
        <Text style={styles.bodyText}>라임: {rhyme_score}</Text>
        <Text style={styles.bodyText}>가사: {lyrics_score}</Text>
        <Text style={styles.bodyText}>플로우: {flow_score}</Text>
        <Text style={styles.bodyText}>완성도: {completeness_score}</Text>
        <Text style={styles.bodyText}>{quick_response_msg}</Text>
        <Divider color='gray' height={0.5} style={{marginVertical:5}}/>
        <Text style={styles.description}>'무료 피드백은 100자까지만 표시됩니다. 프리미엄 피드백을 통해 멘토의 A4용지 한장 이상의 자세한 피드백을 받아보세요. 당신의 곡의 첫줄부터 마지막줄까지 라임 하나까지도 상세하게 피드백 해드립니다.'</Text>      
      </View>
    )

    return (
      <ScrollView 
        style={styles.container}
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
            <Text style={styles.headerText}>맨토의 피드백 {instructor_id > 0 ? '(by ' + instructor.name + ' )' : null}</Text>

            { instructor_id && complete_date ? complete_feedback : incomplete_feedback}

            <Divider color='gray' height={0.5} style={{marginVertical:5}}/>
            <Text style={styles.headerText}>가사</Text>            
            <Text style={{fontSize:10, color:'black', textAlign:'left'}}>{lyrics_text}</Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    )
  }

  render() {
    return ( this.props.showCover ? this.renderCover(this.props.trackInfo) : this.renderDescription(this.props.trackInfo) );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 35,
    paddingHorizontal: 10,
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
  },
  boxShadow: {
    alignItems:'center',
    justifyContent:'center',
    width: 300,
    height:300,
    elevation: 10,
    borderRadius:5,
    backgroundColor:'white',
    shadowColor:'gray',
    shadowOffset: {
      width:3,
      height:3
    },
    shadowOpacity: 0.8,
    shadowRadius: 2
  },
  image: {
    width: 300,
    height: 300,
    borderRadius:5,
  }
})
