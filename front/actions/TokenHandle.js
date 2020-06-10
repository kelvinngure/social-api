import  AsyncStorage  from "@react-native-community/async-storage"; //make sure not to wrap the import in curly braces since you've directly accessed the object

const storeToken = async (token, user) => {
    try {
      console.log("storing token")
      await AsyncStorage.setItem('boardsToken', token)
      await AsyncStorage.setItem('user', user)
      console.log(`stored ${token}`)
    } catch (error) {
      console.log(`Storing error`)
    }
  };

 const getToken = async() => {
      //console.log("getting token")
      try{ 
        const x = await AsyncStorage.getItem('boardsToken')
        const y = await AsyncStorage.getItem('user')
        console.log(`sent ${x}`)
        return [x, y]
      }  catch(e){
        console.log("getting token error")
      }
  };

  const deleteToken = async () => {
    try {
      console.log("deleting token")
        const value = await AsyncStorage.removeItem("boardsToken");
        const value2 = await AsyncStorage.removeItem("user");
        console.log("deleted token and user")
    } catch (error) {
      console.log(`Deleting error`)
    }
  };

export { storeToken, getToken, deleteToken}

  

