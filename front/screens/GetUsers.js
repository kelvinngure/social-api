import React, { Component } from 'react'
import {View, TouchableOpacity, Text, StyleSheet } from "react-native";

export class GetUsers extends Component {
    constructor(props){
        super(props);
        this.state = {
            message : "Nothing yet"
        }
        this.getUsers = this.getUsers.bind(this)
    }

    getUsers = async() => {
        console.log("hello")
        try{
            const url = "http://localhost:3000/users"
            const response = await fetch (url, {
                method: "GET",
                headers: {
                    "Content-Type": "text/plain",
                    "Accept": "text/plain"
                }
            })
            if (response.ok){
                const x = await response.json()
                this.setState({
                    message: JSON.stringify(x)
                })
            }
        }
        catch(e){
            console.log(e)
        }
    }

    render() {
        return (
            <View style= {styles.container}>
                <TouchableOpacity style = {styles.btn} onPress = {this.getUsers}>
                    <Text style = {{color: "white"}}>users</Text>
                </TouchableOpacity>
                <Text>{this.state.message}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    btn: {
        backgroundColor: "#5a85f2"
    }
  });

export default GetUsers
