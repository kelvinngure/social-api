import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Combined from "./navigation/Combined"
import { LineProvider } from "./contexts/LineContext"
import useCachedResources from "./hooks/preLoad"
import { storeToken, getToken, deleteToken } from "./actions/TokenHandle"

const Tab = createBottomTabNavigator();



const reducer = (state, action) => {
  switch (action.type) {

    case "LOGGED_IN":
      storeToken(`${action.payload}`)
      return {
        ...state,
        line: true,
        refreshToken: action.payload
      };

    case "LOGGED_OUT":
      return {
        ...state,
        line: false,
        refreshToken: null
      };
      
    default:
      console.log(`start state ${state}`)
      return state;
  }
};


export default function App() {
  
  const [line, token] = useCachedResources();
  console.log(`la token ${token}`)
  console.log(`la line ${line}`)

  let initialState = {
    line: line,
    refreshToken: token
  }

  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <NavigationContainer>
      <LineProvider value ={{state, dispatch}}>
        <Combined/>
      </LineProvider>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
