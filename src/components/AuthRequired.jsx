import React from 'react'
import { Outlet, Navigate ,useLocation} from 'react-router-dom'
import { useContext } from 'react';
import LoggedInContext from '../context/LoggedInContext';

function AuthRequired() {
    const {isLoggedIn} = useContext(LoggedInContext);
    const location=useLocation();
    console.log(isLoggedIn)
    
    if (!isLoggedIn) {
        return (
          <Navigate
            to="/signin"
            replace
            state={{ message: "You must Sign in first", path: location.pathname }}
          />
        );
      }
   
    return <Outlet/>
   
}

export default AuthRequired