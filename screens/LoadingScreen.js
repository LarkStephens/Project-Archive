import React from "react";
import { View, Text, Button, ActivityIndicator, StyleSheet} from "react-native";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import firebase from 'firebase';


class LoadingScreen extends React.Component {
	
	componentDidMount(){
		this.checkLogin();
	}
	
	//if user is logged in -> homescreen
	//otherwise -> loginscreen
	checkLogin = () =>{
		firebase.auth().onAuthStateChanged(function(user)
		{
			if(user)
			{
				this.props.navigation.navigate('HomeScreen');
			}
			else{
				this.props.navigation.navigate('LoginScreen');
			}
		//binding to see navigator
		}.bind(this));
	}
	
  render() {
	  //shows activity indicator if checklogin takes a while.
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
	flex: 1,
	alignItems: 'center',
	justifyContent: 'center'
	}
})

export default LoadingScreen