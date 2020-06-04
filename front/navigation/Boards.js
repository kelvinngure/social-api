import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../screens/Home"
import Profile from "../screens/Profile"
import Logout from "../screens/Logout"

const Tab = createBottomTabNavigator();

export default function Boards() {
  return (
      
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Logout" component={Logout} />
      </Tab.Navigator>
      

    
  );
}

const styles = StyleSheet.create({

});
