import  AsyncStorage  from "@react-native-community/async-storage"; //make sure not to wrap the import in curly braces since you've directly accessed the object

const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('boardsToken',JSON.stringify(token))
    } catch (error) {
      console.log(error)
    }
  };

 const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('boardsToken');
      if(typeof value === 'undefined') {
        console.log(`no token`);
        return null
      }
      else{
          console.log(`token found is ${value}`)
          return value
      }
    } catch (error) {
        console.log("error getting token")
        return null
    }
  };

  const deleteToken = async () => {
    try {
        console.log("deleting")
        const value = await AsyncStorage.removeItem("boardsToken");

        console.log("tokens deleted")
    } catch (error) {
      console.log("error deleting token")
    }
  };

export { storeToken, getToken, deleteToken}

  

