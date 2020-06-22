import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Header from "./Header"
import Feed from "./Feed"
import styles from "../../../styles/styles"

// THIS IS THE FEED SCREEN IN BOARDS BOTTOM TAB NAV
export default function Home() {
  


  return (
      <View style = {styles.container}>
        <Header/>
        <Feed />
    </View>
    
  );
}


