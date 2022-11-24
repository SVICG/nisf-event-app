import React, { useReducer, useContext } from 'react'
import axios from 'axios'
import reducer from './reducer'
import { 
    DISPLAY_ALERT, 
    CLEAR_ALERT, 
    // REGISTER_USER_SUCCESS, 
    // REGISTER_USER_BEGIN, 
    // REGISTER_USER_ERROR, 
    // LOGIN_USER_BEGIN, 
    // LOGIN_USER_SUCCESS, 
    // LOGIN_USER_ERROR,
    SETUP_USER_BEGIN,
    SETUP_USER_ERROR,
    SETUP_USER_SUCCESS
 } from './action'
// add useContext for on eless import -m not necesaary but good for bigger projects

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userCounty = localStorage.getItem('userCounty')

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user? JSON.parse(user) : null,
    token: token,
    userCounty: userCounty || '',
    eventCounty: userCounty || '',

}
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT })
        clearAlert()
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT })
        }, 3000)
    }

    const addUserToLocalStorage = ({ user, token, userCounty }) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        localStorage.userCounty('userCounty', userCounty)
    }
    
    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('userCounty')
    }
    
    // const registerUser = async (currentUser) => {
    //     dispatch({ type: REGISTER_USER_BEGIN })
    //     try {
    //         const response = await axios.post('/api/v1/auth/register', currentUser)
    //         // console.log(response)
    //         const { user, token, userCounty } = response.data
    //         dispatch({
    //             type: REGISTER_USER_SUCCESS,
    //             payload: { user, token, userCounty }
    //         })
    //         addUserToLocalStorage({user, token, userCounty})
    //     } catch (error) {
    //         console.log(error.response)
    //         dispatch({
    //             type: REGISTER_USER_ERROR,
    //             payload: { msg: error.response.data.msg },
                
    //         })
    //     }
    //     clearAlert()
    // }

    // const loginUser = async (currentUser) => {
    //     dispatch({ type: LOGIN_USER_BEGIN })
    //     try {
    //         const {data} = await axios.post('/api/v1/auth/login', currentUser)
    //         // console.log(response)
    //         const { user, token, userCounty } = data
    //         dispatch({
    //             type: LOGIN_USER_SUCCESS,
    //             payload: { user, token, userCounty }
    //         })
    //         addUserToLocalStorage({user, token, userCounty})
    //     } catch (error) {
    //         console.log(error.response)
    //         dispatch({
    //             type: LOGIN_USER_ERROR,
    //             payload: { msg: error.response.data.msg }
    //         })
    //     }
    //     clearAlert()
    // }


    const setupUser = async ({currentUser, endPoint, alertText}) => {
        dispatch({ type: SETUP_USER_BEGIN })
        try {
            const {data} = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)
            console.log(data)
            const { user, token, userCounty, alertText } = data;
            dispatch({
                type: SETUP_USER_SUCCESS,
                payload: { user, token, userCounty }
            })
            addUserToLocalStorage({user, token, userCounty})
        } catch (error) {
            console.log(error.response)
            dispatch({
                type: SETUP_USER_ERROR,
                payload: { msg: error.response.data.msg },
              });
        }
        clearAlert()
    };
    // children prop is everything rendered in between the opening and closing tag of the component 
    return (<AppContext.Provider value={{ ...state, displayAlert, setupUser }}>{children}</AppContext.Provider>)

}

const useAppContext = () => {
    return useContext(AppContext)
}



export { AppProvider, useAppContext, initialState }