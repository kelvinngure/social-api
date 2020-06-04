import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

// THIS IS THE FEED SCREEN IN BOARDS BOTTOM TAB NAV
export default function Home() {
  


  return (
      <ScrollView>
      <Text>HOME</Text>
    </ScrollView>
    
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
