import React, { useReducer, useContext } from 'react'
import { DISPLAY_ALERT } from './action'
// add useContext for on eless import -m not necesaary but good for bigger projects

import reducer from './reducer'

const initialState = {
    isLoading:false,
    showAlert:false,
    alertText:'',
    alertType:'',
}
const AppContext = React.createContext() 

const AppProvider = ({children}) => {
    const[state, dispatch] = useReducer(reducer, initialState)

    const displayAlert = () => {
        dispatch({type:DISPLAY_ALERT})
    }

    // children prop is everything rendered in between the opening and closing tag of the component 
    return ( <AppContext.Provider value={{...state, displayAlert}}>{children}</AppContext.Provider>)

}

const useAppContext = () => {
    return useContext(AppContext)   
}



export { AppProvider, useAppContext, initialState}