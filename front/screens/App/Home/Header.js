import React from "react"
import { Text, View } from "react-native"
import styles from "../../../styles/styles"

const Header = () => {
    return(
        <View style = {styles.header}>
            <Text style = {styles.headerText}> boards </Text>
        </View>
    )
}

export default Header