import React, { useState, useEffect } from 'react'
import {StyleSheet, TextInput, View, Text, TouchableOpacity} from 'react-native'
import axios from "axios";
import Colors from "../../themes/Colors"
import { LineContext } from "../../contexts/LineContext"


export default function Login({navigation}) { 
    
    const { dispatch } = React.useContext(LineContext)

    const[email, setEmail] = useState("kelvin@mail.com")
    const[password, setPassword] = useState("Njuguna")
    const[loadingbtn, setLoadingBtn] = useState(true)
    const[emailWarn, setEmailWarn] = useState("")
    const[pwdWarn, setPwdWarn] = useState("")
   
    

    const validateEmail= (email) =>{
            const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(email) === true)  return true
            if (email === "") {
                setEmailWarn("email cannot be empty")
                setLoadingBtn(true)
            }
            return false 
        } 

    const validatePWD = (pwd) =>{
            if (pwd.length < 6) {
                setPwdWarn("password must be longer than 6 characters")
                setLoadingBtn(true)
                return false
            }
            return true
        }   

    
    const login = (email, password) =>{
        setLoadingBtn(false)
        const checkEmail = validateEmail(email);
        const checkPWD = validatePWD(password)

        if (checkEmail === true && checkPWD === true){
            console.log(email)
            console.log(password)
            const url = `https://boards-server.herokuapp.com/users/login`
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
                    dispatch({type: "LOGGED_IN", payload: {
                        "token": `${res.data.token}`,
                        "user": res.data.user
                    }
                    })
                    setLoadingBtn(true)
                }
                else{
                    console.log(res)
                    console.log(state)
                    console.log("incorrect password and email")
                    setLoadingBtn(true)
                }
            }
                )
            .catch((e) => {
                console.log(e)
                setLoadingBtn(true)
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
                        <Text>{emailWarn}</Text>
                        <TextInput style={styles.logInput} value = {email} onChangeText = {(text)=>{setEmail(text)}} underlineColorAndroid ={'rgba(0,0,0,0)'}></TextInput>
                        <Text>Password</Text>
                        <Text>{pwdWarn}</Text>
                        <TextInput style={styles.logInput} secureTextEntry={true} onChangeText = {(text)=>{setPassword(text)}} value = {password}></TextInput>
                    </View>
                    <TouchableOpacity
                        style = {styles.loginButton}
                        onPress = {()=> {login(email, password)}}
                    >
                        {loadingbtn ? <Text style = {styles.loginText}>Login</Text> : <Text style = {styles.loginText}>Loading...</Text>}
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
       alignItems: "center",
   },
   logo: {
       fontSize: 60,
       color: "#ffffff",
       marginVertical: 20
   },
   formView: {
        alignItems: "center"
   },
   logInput: {
        borderWidth: 1,
        marginVertical: 10,
        padding: 10,
        width: 250,
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
        //color: 'white',
        alignItems: 'center',
        backgroundColor: '#1c4d66'
   },
   loginText: {
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

