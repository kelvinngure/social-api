import React, { useContext } from "react"
import {TouchableOpacity, Text, View, StyleSheet} from "react-native"

import { LineContext } from "../../contexts/LineContext"

const Logout = () => {
    const {dispatch} = useContext(LineContext)
    
    
    
    return(
<View>
    <TouchableOpacity onPress = {() => {dispatch({type:"LOGGED_OUT"})}} style = {styles.button}>
        <Text>Logout</Text>
    </TouchableOpacity>
     </View>
    )
    
}

export default Logout;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    button: {
        backgroundColor: "red",
        width: 60,
        alignItems:"center"
    }
  });