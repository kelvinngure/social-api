import React from 'react'
import { Text, View, Image, StyleSheet} from 'react-native'
import { LineConsumer } from "../../../contexts/LineContext"


export default function ProfileHead (){
            return (
                <LineConsumer>
                    {state => 
                        (
                        <View style = {styles.container}>
                            <View style={styles.image}>
                            <Image 
                                style={styles.pp} 
                                source={require('../../../assets/pp.jpg')}
                            />
                            </View>
                            <View style={styles.info}>
                            <Text style ={styles.name}>
                                {state.state.user.fname} {state.state.user.lname}
                            </Text>
                            <Text style ={styles.notices}>
                                345 notices
                            </Text>
                            </View>
                        </View>
                        )
                          
                    }
                </LineConsumer>
            )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    info: {
        alignItems: "center",
        flex: 1,
        paddingTop: 10
    },
    image: {
        alignItems: "center",
        height: "50%",
        justifyContent: "center"
    },
    pp: {
        width: 90,
        height: 90,
        borderRadius: 45
        
    },
    name: {
        fontSize: 25,
    },
    notices: {
        fontSize: 17,
    }
  });

