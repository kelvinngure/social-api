import React, { useState } from 'react'
import { Text, ScrollView} from 'react-native'
import { SearchBar } from 'react-native-elements';

const Find = (props) => {
        const[search, setSearch] = useState("")

        const searcher = (query) => {
            console.log(query)
        }

        return (
            <ScrollView>
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText = {text => {
                        setSearch(text)
                    }}
                    onSubmitEditing = {() => searcher(search)}
                    value= {search}
                    platform = "android"
                />
                
                <Text>Find</Text>
            </ScrollView>
        )
    
}

export default Find;

