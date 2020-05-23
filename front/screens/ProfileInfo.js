import React from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NoticesScreen from "./NoticesScreen"
import SubscribersScreen from "./SubscribersScreen"


const Tab = createMaterialTopTabNavigator();


const ProfileInfo = () => {
        return (
            <View>
            <Tab.Navigator>
              <Tab.Screen name="Notices" component={NoticesScreen} />
              <Tab.Screen name="Subscribers" component={SubscribersScreen} />
            </Tab.Navigator>
            </View>
        )
}

export default ProfileInfo

const styles = StyleSheet.create({
  });
