import React, { useContext } from "react"
import {TouchableOpacity, Text, View} from "react-native"

import { LineContext } from "../contexts/LineContext"

const Logout = () => {
    const {dispatch} = useContext(LineContext)
    
    
    
    return(
<View>
    <TouchableOpacity onPress = {() => {dispatch({type:"LOGGED_OUT"})}}>
        <Text>Logout</Text>
    </TouchableOpacity>
     </View>
    )
    
}

export default Logout;