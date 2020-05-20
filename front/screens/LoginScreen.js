import React, { Component } from 'react'
import {StyleSheet, TextInput, View, Text, TouchableOpacity} from 'react-native'
import axios from "axios";
import Colors from "../themes/Colors"



export default class Login extends Component {
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

    login(email, password){
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
                if (res.status == 200){
                    console.log(res)
                    console.log("you're in")
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




    
    // login(email, password){
    //     const checkEmail = this.validateEmail(email);
    //     const checkPWD = this.validatePWD(password)
    //     const valid = this.validateAccount(email, password)
    //     console.log(valid)

    //     if (checkEmail === true && checkPWD === true && valid){
    //         const url = `http://localhost:3000/feed`
    //         axios.get(url)
    //         .then((res) => console.log(res))
    //         .catch((e) => console.log(e))
            
            
    //     }
    //     else{
    //         console.log(`invalid ${valid}`)
    //     }
         
    // }

   

    render() {
        return (
            <View style = {styles.body}>
                <View>
                    <View style={styles.logoView}>
                        <Text style={styles.logo}>boards</Text>
                    </View>
                    <View style={styles.formView}> 
                        <Text>Email</Text>
                        <TextInput style={styles.logInput} value = {this.state.email} onChangeText = {(text)=>this.updateEmail(text) } underlineColorAndroid ={'rgba(0,0,0,0)'}></TextInput>
                        <Text>Password</Text>
                        <TextInput style={styles.logInput} secureTextEntry={true} value = {this.state.password} onChangeText = {(text)=>this.updatePWD(text)}></TextInput>
                    </View>
                    <TouchableOpacity
                        style = {styles.loginButton}
                        onPress = {() => this.login(this.state.email, this.state.password)}
                    >
                        <Text style = {styles.loginText}>Login</Text>
                    </TouchableOpacity>
                    <View style={styles.signUpView}>
                        <Text style={styles.signUp}>Don't have an account yet?</Text>
                    </View>
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


  
