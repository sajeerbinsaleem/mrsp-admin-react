import {
    Route,
    Redirect,
    useParams,
  useLocation
  } from 'react-router-dom';
  import env from "react-dotenv";

import * as LocalCache from "./LocalCache"
// console.log('env',env.LOGIN_URL)
const auth_url = 'http://localhost:5000/api/v1/';
const login_url =  'http://localhost:3001';
// const auth_url = 'http://pm-auth.thetunagroup.com/api/v1/';

const isAuthenticated = () => { 
    // const token = localStorage.getItem('accessToken');
    const token = LocalCache.accessToken();
    console.log('token',token)
    try {
      if(token){
        return true;
      }
      else{
        // return true;
        return false;
      }
    } catch (error) {
      // return true;
      return false;
    }
  }

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  
  function Locate() {
    let query = useQuery();
    const redirect_url = query.get("redirect_url");
    if(redirect_url){
      // return window.location.href = redirect_url;
    }
    return window.location.href = login_url;

    return <h2>Unauthorized!</h2>;
  }

  export default function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Locate/>
            )
            }
        />
        );
  }