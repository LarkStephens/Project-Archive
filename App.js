import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import PedometerScreen from "./screens/PedometerScreen";
import * as firebase from 'firebase';
import {db} from "./config";


export default class app extends React.Component {
  render() {
    return <AppNavigator/>;
  }
}

const AppSwitchNavigator = createSwitchNavigator(
  {	
	LoadingScreen:LoadingScreen,
	LoginScreen:LoginScreen,
	HomeScreen:HomeScreen,
	PedometerScreen:PedometerScreen
  }
);

const AppNavigator = createAppContainer(AppSwitchNavigator);