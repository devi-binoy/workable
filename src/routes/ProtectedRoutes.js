import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from '../context/AuthContext'
import { useEffect } from "react";

function ProtectedRoutes({ children}) {

    const { user } = UserAuth()
    const navigate = useNavigate()
    useEffect (() => {
    if(user==null && user==undefined) {
      console.log('user not found')
        navigate('/login')
    }
    }, [ user])
  return children
}

export default ProtectedRoutes