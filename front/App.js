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
  refreshToken: null
}

const reducer = (state, action) => {
  switch (action.type) {

    case "TK":
      return {
        ...state,
        line: true,
        refreshToken: action.payload
      };

    case "NoTK":
      return {
        ...state,
        line: false,
        refreshToken: null
      };
      
    case "LOGGED_IN":
      storeToken(`${action.payload}`)
      return {
        ...state,
        line: true,
        refreshToken: "fdssf"
      };

    case "LOGGED_OUT":
      deleteToken()
      return {
        ...state,
        line: false,
        refreshToken: null
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
    getToken().then(token => token ? 
            dispatch({type: "TK", payload: token})
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
