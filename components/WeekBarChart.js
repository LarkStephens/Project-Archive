import * as React from 'react';
import { Text, View, StyleSheet, Animated, Dimensions } from 'react-native';
import {Button} from "react-native-elements";
import { Constants } from 'expo';

export class WeekBarChart extends React.Component {
  //takes data={[10000, 20000, 30000, 40000, 50000, 70000, 30000]}
    constructor (props) {
    super(props)
    this.state = {
      mon: new Animated.Value(0),
      tue: new Animated.Value(0),
      wed: new Animated.Value(0),
      thu: new Animated.Value(0),
      fri: new Animated.Value(0),
      sat: new Animated.Value(0),
      sun: new Animated.Value(0)
    }
  }
  
  handleAnimation () {
    const timing = Animated.timing
    const width = { mon: this.props.data[0]/Dimensions.get("window").width*5, 
                    tue: this.props.data[1]/Dimensions.get("window").width*5, 
                    wed: this.props.data[2]/Dimensions.get("window").width*5,
                    thu: this.props.data[3]/Dimensions.get("window").width*5, 
                    fri: this.props.data[4]/Dimensions.get("window").width*5, 
                    sat: this.props.data[5]/Dimensions.get("window").width*5, 
                    sun: this.props.data[6]/Dimensions.get("window").width*5}
    const indicators = ['mon', 'tue', 'wed','thu','fri','sat','sun']
    Animated.parallel(indicators.map(item => {
      return timing(this.state[item], {toValue: width[item]})
    })).start()
  }
  
  render () {
   const {mon, tue, wed, thu, fri, sat, sun} = this.state
  
   return (
      <View style={styles.graph}>
      <Text>Monday: {this.props.data[0]} Steps</Text>
       {mon &&
          <Animated.View style={[styles.bar, styles.barchartbar, {width: mon}]}/>
        }
      <Text>Tuesday: {this.props.data[1]} Steps</Text>
        {tue &&
          <Animated.View style={[styles.bar, styles.barchartbar, {width: tue}]} />
        }
      <Text>Wednesday: {this.props.data[2]} Steps</Text>
        {wed &&
          <Animated.View style={[styles.bar, styles.barchartbar, {width: wed}]} />
        }
      <Text>Thursday: {this.props.data[3]} Steps</Text>
        {thu &&
          <Animated.View style={[styles.bar, styles.barchartbar, {width: thu}]} />
        }
      <Text>Friday: {this.props.data[4]} Steps</Text>
        {fri &&
          <Animated.View style={[styles.bar, styles.barchartbar, {width: fri}]} />
        }
      <Text>Saturday: {this.props.data[5]} Steps</Text>
        {sat &&
          <Animated.View style={[styles.bar, styles.barchartbar, {width: sat}]} />
        }
      <Text>Sunday: {this.props.data[6]} Steps</Text>
        {sun &&
          <Animated.View style={[styles.bar, styles.barchartbar, {width: sun}]} />
        }
        <Button title="Show Distribution" onPress={this.handleAnimation.bind(this)} />
      </View>
   )
  }
}
const styles = StyleSheet.create({
  bar: {
    alignSelf: 'flex-start',
    borderRadius: 0,
    height: 10,
    marginRight: 5
  },
  barchartbar: {
    backgroundColor: '#8BC34A'
  },
  graph:{
    backgroundColor: '#757575',
	width: Dimensions.get("window").width
  },
  greybutton:{
    backgroundColor: '#CDCDCD'
  }
})


