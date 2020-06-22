import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import Combined from "./navigation/Combined"
import { LineProvider } from "./contexts/LineContext"
import { getToken, deleteToken, storeRefreshToken } from "./actions/TokenHandle"
import Loading from "./screens/App/Loading"
 
let initialState = {
  line: false,
  refreshToken: null,
  user: null
}

const reducer = (state, action) => {
  switch (action.type) {

    case "TK":
      const data = JSON.parse(action.payload[1]) // user info
      console.log(data)
      return {
        ...state,
        line: true,
        refreshToken: action.payload[0],
        user: data
      };

    case "NoTK":
      return {
        ...state,
        line: false,
        refreshToken: null
      };

    case "REGISTERED":
      storeRefreshToken(action.payload.refreshToken, action.payload.accessToken, JSON.toString(action.payload.user))
      return {
        ...state,
        line: true,
        refreshToken: action.payload.refreshToken,
        accessToken: action.payload.accesToken,
        user: action.payload.user
      };
      
    case "LOGGED_IN":
      storeRefreshToken(action.payload.token, action.payload.user)
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
            dispatch(
              {type: "TK", payload:data}
              )
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
  },
});
