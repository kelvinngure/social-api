import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function User(props) {
    console.log(props.route.params)
  return (
    <View style = {styles.container}>
        
        <Text>USER</Text>
        <Text>{props.route.params.name}</Text>
        <Text>{props.route.params.id}</Text>  
        {/* console.log the props to see the reason for the object reference in this way */}
      
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
