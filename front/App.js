import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, StatusBar, StyleSheet, View, Text, SafeAreaView } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import AuthNavigator from "./navigation/AuthNavigator"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import { set } from 'react-native-reanimated';
import {LineProvider, LineConsumer} from "./LineContext"



const Stack = createStackNavigator();

//options={{headerShown: false}}


export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null; // create a splashscreen to return when loading
  } else {

    return (
      <LineProvider value="offline">
      <View style = {styles.container}>
        <NavigationContainer>
        <LineConsumer>
        { (line)=>{(line === "offline") ? <LoginScreen/>: console.log("online dude")}}
        </LineConsumer>
      </NavigationContainer>
    </View>
    </LineProvider>
  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
