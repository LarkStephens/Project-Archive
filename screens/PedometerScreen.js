import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { StyleSheet, Text, View, ListView, ScrollView, StatusBar, Dimensions } from "react-native";
import {Button} from 'react-native-elements';
import {WeekBarChart} from "../components/WeekBarChart";
import firebase from 'firebase';
import {db} from "../config";
import { addItem } from '../services';

const styles = StyleSheet.create({
  theme:{
	  flex: 1,
	  alignItems:'center',
	  justifyContent:'center',
	  backgroundColor: '#0D3B78',
  },
  results:{
	  flex: 1,
	  alignItems:'center',
	  justifyContent:'center',
	  backgroundColor: '#757575',
	  width: Dimensions.get("window").width
  },
});

var start;
var id;
export default class PedometerScreen extends React.Component{
	/*Setting the components state*/
	constructor(props) {
		super(props)
		
		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
		this.state = {
			isPedometerAvailable: "Checking",
			currStepCount: 	0,
			monStepCount:	0,
			tueStepCount:	0,
			wedStepCount:	0,
			thuStepCount:	0,
			friStepCount:	0,
			satStepCount:	0,
			sunStepCount:	0,
			rating:			"",
			items : []
			
		  }
		const { navigation } = this.props;
		id = navigation.getParam('id', 'NO-ID')
	}
	
	
	/*Mounting and Unmounting*/
	componentDidMount() {
		console.log(id);
		this._subscribe();
		db.ref('/week/' + id).on('value', snapshot => {
			let data = snapshot.val();
			console.log(data);
			if (data != null){
			let items = Object.values(data);
			console.log(items);
			this.setState({ items });
			console.log(items.length);}
		});
	}
	
	
	componentWillUnmount() {
		this._unsubscribe();
	}
	
	
	/*Counting new steps, getting week's steps & error messages*/
	_subscribe = () => {
		Pedometer.isAvailableAsync().then(
			result => {
			this.setState({
			  isPedometerAvailable: String(result)
        });
		  },
		  error => {
			this.setState({
			  isPedometerAvailable: "Could not get isPedometerAvailable: " + error
			});
		  }
		);
		
		//week logic
		var today = new Date();
		
		var monday = new Date();
		var mondayb = false;
		var tuesday = new Date();
		var tuesdayb = false;
		var wednesday = new Date();
		var wednesdayb = false;
		var thursday = new Date();
		var thursdayb = false;
		var friday = new Date();
		var fridayb = false;
		var saturday = new Date();
		var saturdayb = false;
		var sunday = new Date();
		var sundayb = false;
		
		function setTime(date, h, m, s,){
		//setting time to 00:00:00
		date.setHours(h);
		date.setMinutes(m);
		date.setSeconds(s);
		}
		
		switch (today.getDay()) {
		  case 0:
			monday.setDate(today.getDate() - 6);
			setTime(monday, 0,0,0);
			mondayb = true;
			tuesday.setDate(today.getDate() - 5);
			setTime(tuesday, 0,0,0);
			tuesdayb = true;
			wednesday.setDate(today.getDate() - 4);
			setTime(wednesday, 0,0,0);
			wednesdayb = true;
			thursday.setDate(today.getDate() - 3);
			setTime(thursday, 0,0,0);
			thursdayb = true;
			friday.setDate(today.getDate() - 2);
			setTime(friday, 0,0,0);
			fridayb = true;
			saturday.setDate(today.getDate() - 1);
			setTime(saturday, 0,0,0);
			saturdayb = true;
			sunday.setDate(today.getDate());
			setTime(sunday, 0,0,0);
			sundayb = true;
			
			break;
		  
		  case 1:
			monday.setDate(today.getDate());
			setTime(monday, 0,0,0);
			mondayb = true;
			tuesday.setDate(today.getDate());
			
			break;
		  case 2:
			monday.setDate(today.getDate() - 1);
			setTime(monday, 0,0,0);
			mondayb = true;
			tuesday.setDate(today.getDate());
			setTime(tuesday, 0,0,0);
			tuesdayb = true;
			wednesday.setDate(today.getDate());
			break;
		  case 3:
			monday.setDate(today.getDate() - 2);
			setTime(monday, 0,0,0);
			mondayb = true;
			tuesday.setDate(today.getDate() - 1);
			setTime(tuesday, 0,0,0);
			tuesdayb = true;
			wednesday.setDate(today.getDate());
			setTime(wednesday, 0,0,0);
			wednesdayb = true;
			thursday.setDate(today.getDate());
			break;
		  case 4:
			monday.setDate(today.getDate() - 3);
			setTime(monday, 0,0,0);
			mondayb = true;
			tuesday.setDate(today.getDate() - 2);
			setTime(tuesday, 0,0,0);
			tuesdayb = true;
			wednesday.setDate(today.getDate() - 1);
			setTime(wednesday, 0,0,0);
			wednesdayb = true;
			thursday.setDate(today.getDate());
			setTime(thursday, 0,0,0);
			thursdayb = true;
			friday.setDate(today.getDate());
			break;
		  case 5:
			monday.setDate(today.getDate() - 4);
			setTime(monday, 0,0,0);
			mondayb = true;
			tuesday.setDate(today.getDate() - 3);
			setTime(tuesday, 0,0,0);
			tuesdayb = true;
			wednesday.setDate(today.getDate() - 2);
			setTime(wednesday, 0,0,0);
			wednesdayb = true;
			thursday.setDate(today.getDate() - 1);
			setTime(thursday, 0,0,0);
			thursdayb = true;
			friday.setDate(today.getDate());
			setTime(friday, 0,0,0);
			fridayb = true;
			saturday.setDate(today.getDate());
			break;
		  case 6:
			monday.setDate(today.getDate() - 5);
			setTime(monday, 0,0,0);
			mondayb = true;
			tuesday.setDate(today.getDate() - 4);
			setTime(tuesday, 0,0,0);
			tuesdayb = true;
			wednesday.setDate(today.getDate() - 3);
			setTime(wednesday, 0,0,0);
			wednesdayb = true;
			thursday.setDate(today.getDate() - 2);
			setTime(thursday, 0,0,0);
			thursdayb = true;
			friday.setDate(today.getDate() - 1);
			setTime(friday, 0,0,0);
			fridayb = true;
			saturday.setDate(today.getDate() - 0);
			setTime(saturday, 0,0,0);
			saturdayb = true;
			sunday.setDate(today.getDate());

		}
		//marking the start of the week for th db
		start = monday;
		console.log(start);
		
		//this week so far
		Pedometer.getStepCountAsync(monday, today).then(
		  result => {
			this.setState({ currStepCount: result.steps });
		  },
		  error => {
			this.setState({
			  weekStepCount: "Could not get stepCount: " + error
			});
		  }
		);
		
		if (mondayb === true){
			//monday
			Pedometer.getStepCountAsync(monday, tuesday).then(
			  result => {
				this.setState({ monStepCount: result.steps });
			  },
			  error => {
				this.setState({
				  monStepCount: "Could not get stepCount: " + error
				});
			  }
			);
		}
		
		if (tuesdayb === true){
			//tuesday
			Pedometer.getStepCountAsync(tuesday, wednesday).then(
			  result => {
				this.setState({ tueStepCount: result.steps });
			  },
			  error => {
				this.setState({
				  tueStepCount: "Could not get stepCount: " + error
				});
			  }
			);
		}
		
		if (wednesdayb === true) {
			//wedStepCount
			Pedometer.getStepCountAsync(wednesday, thursday).then(
			  result => {
				this.setState({ wedStepCount: result.steps });
			  },
			  error => {
				this.setState({
				  wedStepCount: "Could not get stepCount: " + error
				});
			  }
			);
		}
		
		if (thursdayb === true) {
			//thursday
			Pedometer.getStepCountAsync(thursday, friday).then(
			  result => {
				this.setState({ thuStepCount: result.steps });
			  },
			  error => {
				this.setState({
				  thuStepCount: "Could not get stepCount: " + error
				});
			  }
			);
		}
		
		if (fridayb === true){
			//friday
			Pedometer.getStepCountAsync(friday, saturday).then(
			  result => {
				this.setState({ friStepCount: result.steps });
			  },
			  error => {
				this.setState({
				  friStepCount: "Could not get stepCount: " + error
				});
			  }
			);
		}
		
		if (saturdayb === true){
			//saturday
			Pedometer.getStepCountAsync(saturday, sunday).then(
			  result => {
				this.setState({ satStepCount: result.steps });
			  },
			  error => {
				this.setState({
				  satStepCount: "Could not get stepCount: " + error
				});
			  }
			);
		}
		
		if (sundayb === true){
			Pedometer.getStepCountAsync(sunday, today).then(
			  result => {
				this.setState({ sunStepCount: result.steps });
			  },
			  error => {
				this.setState({
				  sunStepCount: "Could not get stepCount: " + error
				});
			  }
			);
		}
		
		if (this.state.currStepCount >= 70000){
			this.setState({rating: "Excellent work! Keep it up!"});
		}
		else if(this.state.currStepCount < 70000 && this.state.weekStepCount >= 35000){
			this.setState({rating: "Solid work!, You're well on your way."});
		}
		else{
			this.setState({rating: "Keep at it, you'll get there!."});
		}
	};
	
	/*Unsubscribe to pedometer*/
	_unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
	};
	
	addAWeek = () =>{
		addItem(
			id, 
			this.state.currStepCount, 
			this.state.monStepCount, 
			this.state.tueStepCount, 
			this.state.wedStepCount, 
			this.state.thuStepCount, 
			this.state.friStepCount, 
			this.state.satStepCount, 
			this.state.sunStepCount, 
			start.getDate(), 
			start.getMonth(), 
			start.getFullYear())
	}
	 
	 deleteThis(index, id, startD, startM, startY){
		var items= this.state.items
		items.splice(index, 1)
		this.setState(items)
		if (startM < 10) {
			if (startD < 10) {
			db.ref('/week/').child(id).child(startY.toString() + "0" + startM.toString() + "0" + startD.toString()).set(null);
			} else{
			db.ref('/week/').child(id).child(startY.toString() + "0" + startM.toString() + startD.toString()).set(null);
			}
		}else{
			if (startD < 10) {
			db.ref('/week/').child(id).child(startY.toString() + startM.toString() + "0" + startD.toString()).set(null);
			} else{
			db.ref('/week/').child(id).child(startY.toString() + startM.toString() + startD.toString()).set(null);
		}	
	  }
	 }
	
	render() {
		return (
		  <View style={styles.theme}>
			
			<Text style={{ marginTop: StatusBar.currentHeight }}/>
			
			<Button title="Back to HomeScreen" onPress={() => this.props.navigation.navigate('HomeScreen')}/>
			
			<Text style={styles.results}>
			Steps taken this week: {this.state.currStepCount}
			</Text>	
			<Text style={styles.results}>
			{this.state.rating}
			</Text>
				
			
			<WeekBarChart data={[this.state.monStepCount, this.state.tueStepCount, this.state.wedStepCount, this.state.thuStepCount, this.state.friStepCount, this.state.satStepCount, this.state.sunStepCount]}/>
			
			<Text/>
			
			<Button title="Save this week" onPress={() => this.addAWeek()}/>
			
			<Text/>
			
			{this.state.items.length > 0 ? (
				
				<ScrollView>
					{this.state.items.map((item, index) => {
					  return (
						<View key={index}>
						  <Text>Week of {item.startD}/{item.startM}/{item.startY} : {item.total} Steps</Text>
						  <Button title ="Delete this record" onPress={() => this.deleteThis(index, id, item.startD, item.startM, item.startY)} />
						</View>
					  );
					})}
				 </ScrollView>
				
				) : (
				
				<Text>No weeks</Text>
				
				)}
		  </View>
		  
		);
  }

}