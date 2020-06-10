import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import ProfileHead from "./ProfileHead"
import ProfileTab from "./ProfileTab"

export default function Profile() {
  return (
    <View style = {styles.container}>
      <View style = {styles.head}><ProfileHead/></View>
      <View style = {styles.other}><ProfileTab/></View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  head:{
   height: "35%"
  },
  other: {
    flex: 1,
    height: "65%"
  }
});
