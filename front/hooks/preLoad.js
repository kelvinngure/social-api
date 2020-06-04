import * as React from 'react';
import {getToken} from "../actions/TokenHandle"

export default function useCachedResources() {
    
 const [token, setToken] = React.useState("initial start token set");
 const [line, setLine] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useLayoutEffect(() => {
      try {
        getToken()
        .then((token) => {
          if (token !== null) {
            setToken(token)
            setLine(true)
          }
        })
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      }
    
  }, [getToken()]);
  console.log(`useEffect line ${line} token ${token}`)
  return [line, token];
}
