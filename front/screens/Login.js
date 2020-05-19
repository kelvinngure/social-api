import React, { Component } from 'react'
import {StyleSheet, TextInput, View, Text, TouchableOpacity} from 'react-native'
import getCurrentExactTime from "../myModules/TimeCreator"
import axios from "axios";




export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            email : "kelvin@mail.com",
            password : "Njuguna",
        }
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePWD = this.validatePWD.bind(this);
    }

    updateEmail = (text)=>{
        this.setState({
            email: text
        }) 
        
    }

    updatePWD = (text)=>{
        this.setState({
            password: text
        })
    }

    validateEmail(email){
            const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(email) === true)  return true
            return false 
            
        } 

    validatePWD(pwd){
            if (pwd.length < 6)  return false
            return true
        }   

    validateAccount(email, password){
        const checkEmail = this.validateEmail(email);
        const checkPWD = this.validatePWD(password)

        if (checkEmail === true && checkPWD === true){
            const url = `http://localhost:3000/users/authenticate`
            const body = {
                email: `${email}`,
                pwd: `${password}`
            }
            axios.post(url, body, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then((res) => {
                console.log(res)
                console.log("worked")
                return true
            }
                )
            .catch((e) => {
                console.log(e)
                return false
            })
            
            
        }
        else{
            console.log("invalid")
        }
    }


    
    login(email, password){
        const checkEmail = this.validateEmail(email);
        const checkPWD = this.validatePWD(password)
        const valid = this.validateAccount(email, password)
        console.log(valid)

        if (checkEmail === true && checkPWD === true && valid){
            const url = `http://localhost:3000/feed`
            axios.get(url)
            .then((res) => console.log(res))
            .catch((e) => console.log(e))
            
            
        }
        else{
            console.log(`invalid ${valid}`)
        }
         
    }

   

    render() {
        return (
            <View style = {styles.container}>
            <Text></Text>
                <Text>Email</Text>
                <TextInput style = {styles.box} value = {this.state.email} onChangeText = {(text)=>this.updateEmail(text)} ></TextInput>
                <Text>Password</Text>
                <TextInput style = {styles.box} secureTextEntry={true} value = {this.state.password} onChangeText = {(text)=>this.updatePWD(text)}></TextInput>
                
                <TouchableOpacity
                    style = {styles.button}
                    onPress = {() => this.login(this.state.email, this.state.password)}
                >
                    <Text style = {styles.buttonText}>Login</Text>
                </TouchableOpacity> 
            </View>
        )
    }
}




const styles = StyleSheet.create({
    container: {
        marginLeft: 500,
        marginTop: 200
    },
    box: {
        borderWidth: 2,
        borderColor: "black",
        width: 150,
        marginTop:5,
        marginBottom: 15
    },
    button: {
        height: 25,
        width: 100,
        backgroundColor: "blue",
        justifyContent: "center"

    },
    buttonText:{
        color: "white"
    }
  });


  
