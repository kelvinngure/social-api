import  AsyncStorage  from "@react-native-community/async-storage"; //make sure not to wrap the import in curly braces since you've directly accessed the object

 const getToken = async() => {
      //console.log("getting token")
      try{ 
        const x = await AsyncStorage.getItem('accessToken')
        const y = await AsyncStorage.getItem('accessToken')
        const z = await AsyncStorage.getItem('user')
        return [x, y, z]
      }  catch(e){
        console.log("getting token error")
      }
  };

  const deleteToken = async () => {
    try {
      console.log("deleting token")
        const value = await AsyncStorage.removeItem("accessToken");
        const value2 = await AsyncStorage.removeItem("user");
        console.log("deleted token and user")
    } catch (error) {
      console.log(`Deleting error`)
    }
  };

  ///// FOR REFRESH TOKEN
  const storeRefreshToken = async (accessToken, refreshToken, user) => {
    try {
      console.log("storing token")
      await AsyncStorage.setItem('accessToken', accessToken)
      await AsyncStorage.setItem('refreshToken', refreshToken)
      await AsyncStorage.setItem('user', JSON.stringify(user))
    } catch (error) {
      console.log(`Storing refreshtoken error`)
    }
  };

export { getToken, deleteToken, storeRefreshToken}

  

