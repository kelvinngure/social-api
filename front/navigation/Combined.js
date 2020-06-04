import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Auth from "./Auth"
import Boards from "./Boards"
import { LineConsumer } from "../contexts/LineContext"

const Stack = createStackNavigator();

export default function Combined() {
  return (
    <LineConsumer>
      {state => state.state.line ? <Boards/>: <Auth/>}
    </LineConsumer>
    
    
  );
}

const styles = StyleSheet.create({

});



