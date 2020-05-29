import 'react-native-gesture-handler';
import React, { useState, useEffect, useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View} from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import {LineProvider} from "./lineContext"
import BottomTabNavigator from './navigation/BottomTabNavigator';
import AuthNavigator from './navigation/AuthNavigator';

import { storeToken, getToken, deleteToken } from "./actions/TokenHandle"



const Stack = createStackNavigator();

//options={{headerShown: false}}
const token = getToken()
const initialState = {
  token: token
};

const reducer = (state, action) => {
  switch (action.type) {

    case "LOGGED_IN":
      storeToken(`${action.payload}`)
      return {
        ...state,
        token: action.payload
      };

    case "LOGGED_OUT":
      deleteToken()
      return {
        ...state,
        token:null
      };
    default:
      return state;
  }
};

export default function App(props) {
  const [isLoadingComplete] = useCachedResources();
  const [state, dispatch] = React.useReducer(reducer, initialState);
 

  if (!isLoadingComplete) {
    return null; // create a splashscreen to return when loading
  } else {
    return (
      <LineProvider value={{state, dispatch}}>
        
          {(typeof(state.token) !== 'string')? 
            <NavigationContainer style= {styles.container}>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name= "Auth" component={AuthNavigator}/>
            </Stack.Navigator>
            </NavigationContainer>
          : 
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name= "Home" component={BottomTabNavigator}/>
            </Stack.Navigator>
          </NavigationContainer>
          }
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
