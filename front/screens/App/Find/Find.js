import React, { useState } from 'react'
import { Text, ScrollView, View, StyleSheet, FlatList } from 'react-native'
import { SearchBar } from 'react-native-elements';
import axios from "axios";


const Find = (props) => {
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
        function Result({ title }) {
            return (
                <View style={styles.item}>
                <Text style={styles.title}>{title}</Text>
              </View>
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
                    renderItem={ ({ item }) => <Result title = {item.name} />}
                    keyExtractor={item => item.id}
                >
                </FlatList>

                </View>
                
        )
    
}

export default Find;

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