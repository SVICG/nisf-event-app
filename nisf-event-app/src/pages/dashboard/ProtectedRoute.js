import React from 'react'
import { useAppContext } from '../../context/appContext'
import { Navigate } from 'react-router-dom'
import Loading  from '../../components/Loading'

const ProtectedRoute = ({children}) => {

   const {user, userLoading} =  useAppContext();
   if(userLoading) return <Loading />
    if(!user){
        return <Navigate to="/welcome"/>
    }
//if user exists return children
    return children
}

export default ProtectedRoute