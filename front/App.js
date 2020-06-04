import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Combined from "./navigation/Combined"
import { LineProvider } from "./contexts/LineContext"
import { storeToken, getToken, deleteToken } from "./actions/TokenHandle"

const Tab = createBottomTabNavigator();
 
let initialState = {
  line: false,
  refreshToken: null
}

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
      deleteToken()
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
  
  const token = getToken().then(token => console.log(`token log ${token}`))

  console.log(`token 1 ${token}`)

  if (token){
  initialState = {
    line: true,
    refreshToken: token
  }}
  

  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <LineProvider value ={{state, dispatch}}>
          <Combined/>
        </LineProvider>
      </NavigationContainer>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
