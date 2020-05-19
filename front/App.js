import React from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, Platform} from 'react-native';
import Register from "./screens/Register"
import Login from "./screens/Login"
import Colors from "./themes/Colors"

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Login/> 
        <Register/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: Colors.blueTheme,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
