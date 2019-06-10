import React from "react";
import { StyleSheet, ScrollView, ActivityIndicator, View, Text } from 'react-native';
import {Button } from 'react-native-elements';
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import firebase from 'firebase';

const styles = StyleSheet.create({
  theme:{
	  flex: 1,
	  alignItems:'center',
	  justifyContent:'center',
	  backgroundColor: '#0D3B78',
  }
});

var userID
class HomeScreen extends React.Component {
	constructor(props) {
    super(props);
	
	}
	componentDidMount(){
		firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
			userID = user.uid;
			
			
		  } else {
			// No user is signed in.
		  }
		});
	}
 
  
  
render() {
    return (
    <View style={styles.theme}>	 
		<Button title='Sign out' onPress={() => firebase.auth().signOut()}/>
		<Text/>
		<Button title='View your pedometer data!' onPress={() =>{this.props.navigation.navigate('PedometerScreen', {
              id: userID
		})}}/>
      </View>
    );
  }
}


export default HomeScreen
