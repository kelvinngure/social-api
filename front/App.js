import 'react-native-gesture-handler';
import React, { useState, useEffect, useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View} from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import {LineProvider, LineConsumer} from "./LineContext"
import BottomTabNavigator from './navigation/BottomTabNavigator';



const Stack = createStackNavigator();

//options={{headerShown: false}}
const initialState = {
  isAuthenticated: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGGED_IN":
      return {
        ...state,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default function App(props) {
  const isLoadingComplete = useCachedResources();
  const [state, dispatch] = React.useReducer(reducer, initialState);

  if (!isLoadingComplete) {
    return null; // create a splashscreen to return when loading
  } else {
    return (
      <LineProvider value={{state, dispatch}}>
      <View style = {styles.container}>
        <NavigationContainer>
        
          <LineConsumer>
          {(state) => !state.isAuthenticated ? 
          
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name= "Register" component={RegisterScreen}/>
              <Stack.Screen name= "Login" component={LoginScreen}/>
            </Stack.Navigator>
          : 
            <Stack.Navigator>
              <Stack.Screen name= "Profile" component={BottomTabNavigator}/>
            </Stack.Navigator>
          
          }
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
