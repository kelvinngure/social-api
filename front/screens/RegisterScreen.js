import React, { Component } from 'react'
import {StyleSheet, TextInput, View, Text, TouchableOpacity} from 'react-native'
import getCurrentExactTime from "../myModules/TimeCreator"
import axios from "axios";
import BottomTabNavigator from "../navigation/BottomTabNavigator"




export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            email : "kelvin@mail.com",
            password : "Njuguna",
            firstName: "Kelvin",
            lastName: "Njuguna"
            //confirmPWD : "",
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

    updateFirstName = (text)=>{
        this.setState({
            firstName: text
        }) 
        
    }

    updateLastName = (text)=>{
        this.setState({
            lastName: text
        }) 
        
    }

    validateEmail(email){
            const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(email) === true)  return true
            return false 
            // add functionality to check if email exists in database

        } 

    validatePWD(pwd){
            if (pwd.length < 6)  return false
            return true
        } 

    validateName(name){
            if (name.length > 1)  return true
            return false
        }     

    


    
    submitDB(email, password, firstName, lastName){
        const checkEmail = this.validateEmail(email);
        const checkPWD = this.validatePWD(password)
        const checkFname = this.validateName(firstName)
        const checkLname = this.validateName(lastName)

        if (checkEmail === true && checkPWD === true && checkFname == true && checkLname == true){
            const timeStamp = getCurrentExactTime()
            const url = `http://localhost:3000/users/register`
            const body = {
                "fname": `${firstName}`,
                "lname": `${lastName}`,
                "email": `${email}`,
                "ts": `${timeStamp}`,
                "pwd": `${password}`
            }
            axios.post(url,body, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then((res) => console.log(res.data))
            .catch((e) => console.log(e))
            
            
        }
        else{
            console.log("invalid")
        }
         
    }

   

    render() {
        return (
            <View style = {styles.body}>
                <View style={styles.logoView}>
                    <Text style={styles.logo}>boards</Text>
                </View>
                <View style={styles.formView}> 
                    <Text>Email</Text>
                    <TextInput style = {styles.logInput} value = {this.state.email} onChangeText = {(text)=>this.updateEmail(text)} underlineColorAndroid ={'rgba(0,0,0,0)'} ></TextInput>
                    <Text>First Name</Text>
                    <TextInput style = {styles.logInput} value = {this.state.firstName} onChangeText = {(text)=>this.updateFirstName(text)} ></TextInput>
                    <Text>Last Name</Text>
                    <TextInput style = {styles.logInput} value = {this.state.lastName} onChangeText = {(text)=>this.updateLastName(text)} ></TextInput>
                    <Text>Password</Text>
                    <TextInput style = {styles.logInput} secureTextEntry={true} value = {this.state.password} onChangeText = {(text)=>this.updatePWD(text)}></TextInput>
                </View>
                <View>
                    <TouchableOpacity
                        style = {styles.loginButton}
                        onPress = {() => this.submitDB(this.state.email, this.state.password, this.state.firstName, this.state.lastName)}
                    >
                        <Text style = {styles.loginText}>Register</Text>
                    </TouchableOpacity> 
                </View>
                <View style={styles.signUpView}>
                    <Text style={styles.signUp}>Don't have an account yet?</Text>
                </View>
            </View>
        )
    }
}




const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: '#c49a47'
   },
   logoView:{
   },
   logo: {
       fontSize: 60,
       color: "#ffffff",
       marginVertical: 20
   },
   formView: {

   },
   logInput: {
        borderWidth: 1,
        marginVertical: 10,
        padding: 10,
        width: 250,
        fontSize: 20, 
        borderRadius: 25,
        color: 'white',
        borderColor: 'white'
        
   },
   loginButton: {
        borderWidth: 1,
        marginVertical: 10,
        padding: 0,
        width: 250,
        fontSize: 20, 
        borderRadius: 25,
        color: 'white',
        alignItems: 'center',
        backgroundColor: '#664f21'
   },
   loginText: {
        fontSize: 23,
        paddingHorizontal: 15,
        paddingVertical: 10,
        color: '#ffffff'

   },
   signUpView: {
        flexGrow: 0.1,
        justifyContent: 'flex-end',
        marginVertical: 10,
        alignItems: 'center'
        
   },
   signUp: {
        color: 'white'
   }


  });


  
