import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import AuthNavigator from "./navigation/AuthNavigator"


 const Stack = createStackNavigator();

export default function App(props) {
  const isLoadingComplete = useCachedResources();
  const [online, setOnline] = useState(true)
  useEffect(() => {
  setOnline(online)
  }
  )

  if (!isLoadingComplete) {
    return null; // create a splashscreen to return when loading
  } else {
    return (
      <NavigationContainer>
      {online == false ? 
      (
        <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Auth" component={AuthNavigator}/>
        </Stack.Navigator>
      ) 
      :
      (
        <Stack.Navigator>
        <Stack.Screen name="Boards" component={BottomTabNavigator}/>
        </Stack.Navigator>
      )
      }
    </NavigationContainer>
  //onNavigationStateChange={handleNavigationChange}
  //uriPrefix="/app"

      // <NavigationContainer >
      // <View style={styles.container}>
      //   {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
      //   <NavigationContainer linking={LinkingConfiguration} independent={true}>
      //     <Stack.Navigator>
      //       <Stack.Screen name="Login" component={AppNavigator} options={{ title: 'Overview' }} />
      //     </Stack.Navigator>
      //   </NavigationContainer>
      // </View>
      // </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
