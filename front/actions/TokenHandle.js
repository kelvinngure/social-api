import  AsyncStorage  from "@react-native-community/async-storage"; //make sure not to wrap the import in curly braces since you've directly accessed the object

const storeToken = async (token) => {
    try {
        console.log("storing...")
      await AsyncStorage.setItem(
        'boardsToken',
        JSON.stringify(token)
      )
      
    } catch (error) {
      console.log(error)
    }
  };

 const getToken = async () => {
    try {
        console.log("getting")
      const value = await AsyncStorage.getItem("boardsToken");
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
      else{
          console.log("not token stored")
      }

      console.log("done get")
    } catch (error) {
        console.log("error getting token")
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

  

