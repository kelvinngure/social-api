import  AsyncStorage  from "@react-native-community/async-storage"; //make sure not to wrap the import in curly braces since you've directly accessed the object

const storeToken = async (token) => {
    try {
      console.log("storing token")
      await AsyncStorage.setItem('boardsToken',JSON.stringify(token))
      console.log("stored token")
    } catch (error) {
      console.log(`Storing error`)
    }
  };

 const getToken = async () => {
    try {
      //console.log("getting token")
      const value = await AsyncStorage.getItem('boardsToken');
      if(typeof value === 'undefined') {
        console.log("there was no token got")
        return null
      }
      else{
        //console.log(`token got ${value}`)
          return value
      }
    } catch (error) {
        return null
    }
  };

  const deleteToken = async () => {
    try {
      console.log("deleting token")
        const value = await AsyncStorage.removeItem("boardsToken");
        console.log("deleted token")
    } catch (error) {
      console.log(`Deleting error`)
    }
  };

export { storeToken, getToken, deleteToken}

  

