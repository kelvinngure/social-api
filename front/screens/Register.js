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
                fname: `${firstName}`,
                lname: `${lastName}`,
                email: `${email}`,
                ts: `${timeStamp}`,
                pwd: `${password}`
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
            <View style = {styles.container}>
            <Text></Text>
                <Text>Email</Text>
                <TextInput style = {styles.box} value = {this.state.email} onChangeText = {(text)=>this.updateEmail(text)} ></TextInput>
                <Text>First Name</Text>
                <TextInput style = {styles.box} value = {this.state.firstName} onChangeText = {(text)=>this.updateFirstName(text)} ></TextInput>
                <Text>Last Name</Text>
                <TextInput style = {styles.box} value = {this.state.lastName} onChangeText = {(text)=>this.updateLastName(text)} ></TextInput>
                <Text>Password</Text>
                <TextInput style = {styles.box} secureTextEntry={true} value = {this.state.password} onChangeText = {(text)=>this.updatePWD(text)}></TextInput>
                
                <TouchableOpacity
                    style = {styles.button}
                    onPress = {() => this.submitDB(this.state.email, this.state.password, this.state.firstName, this.state.lastName)}
                >
                    <Text style = {styles.buttonText}>Register</Text>
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


  
