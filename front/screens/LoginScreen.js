import React, { useState, useEffect  } from 'react'
import {StyleSheet, TextInput, View, Text, TouchableOpacity} from 'react-native'
import axios from "axios";
import Colors from "../themes/Colors"
import { NavigationEvents } from 'react-navigation';



export default function LoginScreen ({ online, navigation, route }) { 
    const[email, setEmail] = useState("kelvin@mail.com")
    const[password, setPassword] = useState("Njuguna")
    useEffect(()=>{
        setEmail(email)
        //setPassword(password)
        setPassword(password) // here is where I can access the updated state 
    })
    

    const validateEmail= (email) =>{
            const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(email) === true)  return true
            return false 
        } 

    const validatePWD = (pwd) =>{
            if (pwd.length < 6)  return false
            return true
        }   

    
    const login = (email, password) =>{
        const checkEmail = validateEmail(email);
        const checkPWD = validatePWD(password)

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
                if (res.status == 200){
                    console.log(res)
                    console.log("you're in")
                    navigation.navigate('Boards')
                }
                else{
                    console.log(res)
                    console.log("incorrect password and email")
                }
            }
                )
            .catch((e) => {
                console.log(e)
                return false
            })
            
            
        }
        else{
            console.log("bad login details")
        }
    }


   

        return (
            <View style = {styles.body}>
                <View>
                    <View style={styles.logoView}>
                        <Text style={styles.logo}>boards</Text>
                    </View>
                    <View style={styles.formView}> 
                        <Text>Email</Text>
                        <TextInput style={styles.logInput} value = {email} onChangeText = {(text)=>{setEmail(text)}} underlineColorAndroid ={'rgba(0,0,0,0)'}></TextInput>
                        <Text>Password</Text>
                        <TextInput style={styles.logInput} secureTextEntry={true} onChangeText = {(text)=>{setPassword(text)}} value = {password}></TextInput>
                    </View>
                    <TouchableOpacity
                        style = {styles.loginButton}
                        onPress = {()=> login(email, password)}
                    >
                        <Text style = {styles.loginText}>Login</Text>
                    </TouchableOpacity>
                    <View style={styles.signUpView}>
                        <Text style={styles.signUp} onPress={() => {navigation.navigate('Register')}}>Don't have an account yet?</Text>
                    </View>
                </View>
            </View>
            
        )
    
}




const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: Colors.blueTheme
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
        backgroundColor: '#1c4d66'
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


  
