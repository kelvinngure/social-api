import React, { useState, useEffect, useContext } from 'react'
import {StyleSheet, TextInput, View, Text, TouchableOpacity} from 'react-native'
import getCurrentExactTime from "../../myModules/TimeCreator"
import axios from "axios";
import { LineContext } from "../../contexts/LineContext"



export default function Register({navigation}) {
    
    const { dispatch } = useContext(LineContext)

    const[email, setEmail] = useState("kelvin@mail.com")
    const[password, setPassword] = useState("Njuguna")
    const[firstName, setFirstName] = useState("Kelvin")
    const[lastName, setLastName] = useState("Ngure")
    
    const validateEmail = (email)=>{
            const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(email) === true)  return true
            return false 
            // add functionality to check if email exists in database

        } 

    const validatePWD= (pwd) => {
            if (pwd.length < 6)  return false
            return true
        } 

    const validateName= (name)=> {
            if (name.length > 1)  return true
            return false
        }   

    const register = (email, password, firstName, lastName) => {
        const checkEmail = validateEmail(email);
        const checkPWD = validatePWD(password)
        const checkFname = validateName(firstName)
        const checkLname = validateName(lastName)

        if (checkEmail === true && checkPWD === true && checkFname == true && checkLname == true){
            const timeStamp = getCurrentExactTime()
            const url = `https://boards-server.herokuapp.com/users/register`
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
            .then((res) => {
                console.log(res.data)
                dispatch({type: "LOGGED_IN"})
            })
            .catch((e) => console.log(e))
            
            
        }
        else{
            console.log("invalid")
        }
         
    }

        return (
            <View style = {styles.body}>
                <View style={styles.logoView}>
                    <Text style={styles.logo}>boards</Text>
                </View>
                <View style={styles.formView}> 
                    <Text>Email</Text>
                    <TextInput style = {styles.logInput} value = {email} onChangeText = {(text)=>setEmail(text)} underlineColorAndroid ={'rgba(0,0,0,0)'} ></TextInput>
                    <Text>First Name</Text>
                    <TextInput style = {styles.logInput} value = {firstName} onChangeText = {(text)=>setFirstName(text)} ></TextInput>
                    <Text>Last Name</Text>
                    <TextInput style = {styles.logInput} value = {lastName} onChangeText = {(text)=>setLastName(text)} ></TextInput>
                    <Text>Password</Text>
                    <TextInput style = {styles.logInput} secureTextEntry={true} value = {password} onChangeText = {(text)=>setPassword(text)}></TextInput>
                </View>
                <View>
                    <TouchableOpacity
                        style = {styles.loginButton}
                        onPress = {() => register(email, password, firstName, lastName)}
                    >
                        <Text style = {styles.loginText}>Register</Text>
                    </TouchableOpacity> 
                </View>
                <View style={styles.signUpView}>
                    <Text style={styles.signUp} onPress={()=> {navigation.navigate('Login')}}>Already have an account?</Text>
                </View>
            </View>
        )
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
        //color: 'white',
        borderColor: 'white'
        
   },
   loginButton: {
        borderWidth: 1,
        marginVertical: 10,
        padding: 0,
        width: 250,
        borderRadius: 25,
       // color: 'white',
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

