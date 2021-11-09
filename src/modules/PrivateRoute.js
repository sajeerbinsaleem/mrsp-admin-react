import {
    Route,
    Redirect
  } from 'react-router-dom';
import * as LocalCache from "./LocalCache"

const isAuthenticated = () => { 
    const token = LocalCache.getToken();
    console.log('has token')
    try {
      if(token){
        return true;
      }
      else{
        return false;
      }
    } catch (error) {
      return false;
    }
  }
  
  
  export default function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                to={{
                    pathname: "/login",
                }}
                />
            )
            }
        />
        );
  }