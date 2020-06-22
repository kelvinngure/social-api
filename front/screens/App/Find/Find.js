import React, { useState } from 'react'
import { Text, ScrollView, View, StyleSheet, FlatList } from 'react-native'
import Finder from "./Finder"
import User from "./User"

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function Find() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Finder" options={{headerShown: false}} component={Finder} />
      <Stack.Screen name="User" options={{headerShown: false}} component={User} />
    </Stack.Navigator>
  );
}