import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "../screens/Login"
import Register from "../screens/Register"

const Stack = createStackNavigator();

export default function Auth({navigation}) {
  return (
    <Stack.Navigator>
    <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={Register} options={{headerShown: false}} />
    </Stack.Navigator>
    
  );
}

const styles = StyleSheet.create({

});

