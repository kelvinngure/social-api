import React, { useState } from 'react'
import { Text, ScrollView, View, StyleSheet, FlatList } from 'react-native'
import { SearchBar } from 'react-native-elements';
import axios from "axios";
import User from "./User"
import { TouchableOpacity } from 'react-native-gesture-handler';


const Finder = (props) => {
        const[search, setSearch] = useState("")

        const [searchResults, setResults] = useState()
        
        const getUsers = (query) => {
            const url  =  `https://boards-server.herokuapp.com/users/searchUser`
            const body = {
                name: query
            }
            axios.post(url, body, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then(
                (res) => {
                    const resultList = res.data // response.data is the list of results from the database
                    console.log(resultList)
                    setResults(resultList)
                    console.log(searchResults)
                }
            )
            .catch((e) => {
                console.log("front error getting user")
                console.log(e)
            }
            )
        }
        function Result({ id, title }) {
            console.log(id)
            return (
                <TouchableOpacity onPress = {() =>
                    props.navigation.navigate("User", {
                        name: title,
                        id: id
                      })}  style={styles.item}>
                <Text style={styles.title}>{title}</Text>
              </TouchableOpacity>
            );
          }

        return (
            <View>
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText = {text => {
                        setSearch(text)
                    }}
                    onSubmitEditing = {() => getUsers(search)}
                    value= {search}
                    platform = "android"
                />

                <FlatList
                    data={searchResults}
                    renderItem={ ({ item }) => <Result title = {item.name} id = {item.idusers}/>}
                    keyExtractor={item => item.idusers}
                >
                </FlatList>

                </View>
                
        )
    
}

export default Finder;

const styles = StyleSheet.create({
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });