import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native'
import Colors from "../themes/Colors"

export class ProfileScreen extends Component {
    render() {
        return (
            <View style={styles.profile}>
                <View style = {styles.pp}>
                <Image style={styles.stretch} source={require('../assets/images/pp.jpg')}/>
                </View>

                <View>
                <Text>Al V</Text>
                <Text>
                    Active in: CMPSC 221, ACM
                </Text>
                </View>
            </View>
        )
    }
}

export default ProfileScreen

const styles = StyleSheet.create({
    profile:{

    },
    pp:{
        width: Dimensions.get('window').width,
        height: 150,
        alignItems:"center",
        backgroundColor:Colors.blueTheme,
        justifyContent: "center"
    },
    stretch: {
      width: 80,
      height: 80,
      borderRadius: 40
    }
  });
