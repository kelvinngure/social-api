import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import Combined from "./navigation/Combined"
import { LineProvider } from "./contexts/LineContext"
import { storeToken, getToken, deleteToken } from "./actions/TokenHandle"
import Loading from "./screens/App/Loading"
 
let initialState = {
  line: false,
  refreshToken: null,
  user: null
}

const reducer = (state, action) => {
  switch (action.type) {

    case "TK":
      console.log(action.payload[1])
      return {
        ...state,
        line: true,
        refreshToken: action.payload[0],
        user: action.payload[1],
        uid: action.payload[1].uid,
        email: action.payload[1].email,
        fname: action.payload[1].fname,
        lname: action.payload[1].lname
      };

    case "NoTK":
      return {
        ...state,
        line: false,
        refreshToken: null
      };
      
    case "LOGGED_IN":
      storeToken(action.payload.token, action.payload.user)
      console.log(`action payload ${action.payload.token} ${action.payload.user}`)
      return {
        ...state,
        line: true,
        refreshToken: action.payload.token,
        user: action.payload.user
      };

    case "LOGGED_OUT":
      deleteToken()
      return {
        ...state,
        line: false,
        refreshToken: null,
        user: null
      };
      
    default:
      return state;
  }
};




export default function App() {
  const [isLoaded, setLoad] = useState(false)
  const [state, dispatch] = React.useReducer(reducer, initialState);

  useEffect(() => {
    let mounted = true;
    
    if (mounted){
    getToken().then(data => (data[0] && data[1]) ? 
            console.log(data[0] && data[1])
            :
            dispatch({type: "NoTK"})
    )
    }
      setLoad(true)
      return () => mounted = false
  }, [])

  if (!isLoaded) {
    return( <Loading/> )
  }else{
  return (
    <NavigationContainer>
    <SafeAreaView style={styles.container}>
        <LineProvider value ={{state, dispatch}}>
          <Combined/>
        </LineProvider>
    </SafeAreaView>
      </NavigationContainer>
    
  );
}
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
