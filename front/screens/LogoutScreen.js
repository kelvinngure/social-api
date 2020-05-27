import React, { useContext } from "react"
import {TouchableOpacity, Text, View} from "react-native"

import { LineContext } from '../lineContext';

const LogoutScreen = () => {
    const {dispatch} = useContext(LineContext)
    
    
    
    return(
<View>
    <TouchableOpacity onPress = {() => {dispatch({type:"LOGGED_OUT"})}}>
        <Text>Logout</Text>
    </TouchableOpacity>
     </View>
    )
    
}

export default LogoutScreen;