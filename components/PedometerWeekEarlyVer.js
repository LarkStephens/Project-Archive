import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { StyleSheet, Text, View,ScrollView } from "react-native";
import {WeekBarChart} from "./WeekBarChart";


export default class PedometerWeek extends React.Component{
	/*Setting the components state*/
	state = {
		isPedometerAvailable: "Checking",
		currStepCount: 	0,
		weekStepCount:	0,
		monStepCount:	0,
		tueStepCount:	0,
		wedStepCount:	0,
		thuStepCount:	0,
		friStepCount:	0,
		satStepCount:	0,
		sunStepCount:	0,
		rating:			"",
	};
	
	/*Mounting and Unmounting*/
	componentDidMount() {
		this._subscribe();
	}
	
	componentWillUnmount() {
		this._unsubscribe();
	}
	
	endweek
	
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
		var startweek = new Date();
		
		var mondayfw = new Date();
		var tuesdayfw = new Date();
		var wednesdayfw = new Date();
		var thursdayfw = new Date();
		var fridayfw = new Date();
		var saturdayfw = new Date();
		var sundayfw = new Date();
		
		var sundayNightfw = new Date();
		
		switch (today.getDay()) {
		  case 0:
			startweek.setDate(today.getDate() - 6);
			
			
			mondayfw.setDate(today.getDate() - 13)
			tuesdayfw.setDate(today.getDate() - 12);
			wednesdayfw.setDate(today.getDate() - 11);
			thursdayfw.setDate(today.getDate() - 10);
			fridayfw.setDate(today.getDate() - 9);
			saturdayfw.setDate(today.getDate() - 8);
			sundayfw.setDate(today.getDate() -7);
			
			sundayNightfw.setDate(today.getDate()-7);
			
			break;
		  case 1:
			startweek.setDate(today.getDate());
			
			mondayfw.setDate(today.getDate() - 7)
			tuesdayfw.setDate(today.getDate() - 6);
			wednesdayfw.setDate(today.getDate() - 5);
			thursdayfw.setDate(today.getDate() - 4);
			fridayfw.setDate(today.getDate() - 3);
			saturdayfw.setDate(today.getDate() - 2);
			sundayfw.setDate(today.getDate() - 1);
			
			sundayNightfw.setDate(today.getDate() - 1);
			
			break;
		  case 2:
			startweek.setDate(today.getDate() - 1);
			
			mondayfw.setDate(today.getDate() - 8)
			tuesdayfw.setDate(today.getDate() - 7);
			wednesdayfw.setDate(today.getDate() - 6);
			thursdayfw.setDate(today.getDate() - 5);
			fridayfw.setDate(today.getDate() - 4);
			saturdayfw.setDate(today.getDate() - 3);
			sundayfw.setDate(today.getDate() - 2);
			
			sundayNightfw.setDate(today.getDate() - 2);
			
			break;
		  case 3:
			startweek.setDate(today.getDate() - 2);
			
			mondayfw.setDate(today.getDate() - 9)
			tuesdayfw.setDate(today.getDate() - 8);
			wednesdayfw.setDate(today.getDate() - 7);
			thursdayfw.setDate(today.getDate() - 6);
			fridayfw.setDate(today.getDate() - 5);
			saturdayfw.setDate(today.getDate() - 4);
			sundayfw.setDate(today.getDate() - 3);
			
			sundayNightfw.setDate(today.getDate() -3);
			
			break;
		  case 4:
			startweek.setDate(today.getDate() - 3);
			
			mondayfw.setDate(today.getDate() - 10)
			tuesdayfw.setDate(today.getDate() - 9);
			wednesdayfw.setDate(today.getDate() - 8);
			thursdayfw.setDate(today.getDate() - 7);
			fridayfw.setDate(today.getDate() - 6);
			saturdayfw.setDate(today.getDate() - 5);
			sundayfw.setDate(today.getDate() -4);
			
			sundayNightfw.setDate(today.getDate() - 4);

			break;
		  case 5:
			startweek.setDate(today.getDate() - 4);
			
			mondayfw.setDate(today.getDate() - 11)
			tuesdayfw.setDate(today.getDate() - 10);
			wednesdayfw.setDate(today.getDate() - 9);
			thursdayfw.setDate(today.getDate() - 8);
			fridayfw.setDate(today.getDate() - 7);
			saturdayfw.setDate(today.getDate() - 6);
			sundayfw.setDate(today.getDate() - 5);
			
			sundayNightfw.setDate(today.getDate() - 5);
	
			break;
		  case 6:
			startweek.setDate(today.getDate() - 5);
			
			mondayfw.setDate(today.getDate() - 12)
			tuesdayfw.setDate(today.getDate() - 11);
			wednesdayfw.setDate(today.getDate() - 10);
			thursdayfw.setDate(today.getDate() - 9);
			fridayfw.setDate(today.getDate() - 8);
			saturdayfw.setDate(today.getDate() - 7);
			sundayfw.setDate(today.getDate() -6);
			
			sundayNightfw.setDate(today.getDate()-6);

		}
		function setOTime(date){
		//setting time to 00:00:00
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		}
		
		setOTime(startweek);
		setOTime(mondayfw);
		setOTime(tuesdayfw);
		setOTime(wednesdayfw);
		setOTime(thursdayfw);
		setOTime(fridayfw);
		setOTime(saturdayfw);
		setOTime(sundayfw);
		
		function setETime(date){
		//and setting time to 23:59:59
		date.setHours(23);
		date.setMinutes(59);
		date.setSeconds(59);
		}
		setETime(sundayNightfw);

		//this week so far
		Pedometer.getStepCountAsync(startweek, today).then(
		  result => {
			this.setState({ currStepCount: result.steps });
		  },
		  error => {
			this.setState({
			  weekStepCount: "Could not get stepCount: " + error
			});
		  }
		);
		//last full week
		Pedometer.getStepCountAsync(mondayfw, sundayNightfw).then(
		  result => {
			this.setState({ weekStepCount: result.steps });
		  },
		  error => {
			this.setState({
			  weekStepCount: "Could not get stepCount: " + error
			});
		  }
		);
		//monday
		Pedometer.getStepCountAsync(mondayfw, tuesdayfw).then(
		  result => {
			this.setState({ monStepCount: result.steps });
		  },
		  error => {
			this.setState({
			  monStepCount: "Could not get stepCount: " + error
			});
		  }
		);
		//tuesday
		Pedometer.getStepCountAsync(tuesdayfw, wednesdayfw).then(
		  result => {
			this.setState({ tueStepCount: result.steps });
		  },
		  error => {
			this.setState({
			  tueStepCount: "Could not get stepCount: " + error
			});
		  }
		);
		//wedStepCount
		Pedometer.getStepCountAsync(wednesdayfw, thursdayfw).then(
		  result => {
			this.setState({ wedStepCount: result.steps });
		  },
		  error => {
			this.setState({
			  wedStepCount: "Could not get stepCount: " + error
			});
		  }
		);
		//thursday
		Pedometer.getStepCountAsync(thursdayfw, fridayfw).then(
		  result => {
			this.setState({ thuStepCount: result.steps });
		  },
		  error => {
			this.setState({
			  thuStepCount: "Could not get stepCount: " + error
			});
		  }
		);
		//friday
		Pedometer.getStepCountAsync(fridayfw, saturdayfw).then(
		  result => {
			this.setState({ friStepCount: result.steps });
		  },
		  error => {
			this.setState({
			  friStepCount: "Could not get stepCount: " + error
			});
		  }
		);
		//saturday
		Pedometer.getStepCountAsync(saturdayfw, sundayfw).then(
		  result => {
			this.setState({ satStepCount: result.steps });
		  },
		  error => {
			this.setState({
			  satStepCount: "Could not get stepCount: " + error
			});
		  }
		);
		Pedometer.getStepCountAsync(sundayfw, sundayNightfw).then(
		  result => {
			this.setState({ sunStepCount: result.steps });
		  },
		  error => {
			this.setState({
			  sunStepCount: "Could not get stepCount: " + error
			});
		  }
		);
		
		if (this.state.weekStepCount >= 70000){
			this.setState({rating: "Excellent work! Keep it up!"});
		}
		else if(this.state.weekStepCount <= 70000 && this.state.weekStepCount >= 35000){
			this.setState({rating: "Solid work!, You're well on your way."});
		}
		else{
			this.setState({rating: "Keep at it, you'll do better next week."});
		}
	};
	
	/*Unsubscribe to pedometer*/
	_unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
	};
	
	render() {
		return (
		  <ScrollView>
			<Text>
			Steps taken this week: {this.state.currStepCount}
			</Text>
			<Text>
    	The steps of the last full week: {this.state.weekStepCount}
			</Text>
			<Text>
			{this.state.rating}
			</Text>
			<WeekBarChart data={[this.state.monStepCount, this.state.tueStepCount, this.state.wedStepCount, this.state.thuStepCount, this.state.friStepCount, this.state.satStepCount, this.state.sunStepCount]}/>
		  </ScrollView>
		);
  }
}