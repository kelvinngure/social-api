import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native'
import Colors from "../themes/Colors"

export class FeedScreen extends Component {
    render() {
        return (
            <View style={styles.profile}>

                <View>
                <Text>
                    FEED SCREEN 
                </Text>
                </View>
            </View>
        )
    }
}

export default FeedScreen

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
