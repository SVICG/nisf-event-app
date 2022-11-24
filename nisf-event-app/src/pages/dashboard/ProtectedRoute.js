import React from 'react'
import { useAppContext } from '../../context/appContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {

   const {user} =  useAppContext()
    if(!user){
        return <Navigate to="/welcome"/>
    }
//if user exists return children
    return children
}

export default ProtectedRoute