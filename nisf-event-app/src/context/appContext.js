import React, { useReducer, useContext } from 'react'
import axios from 'axios'
import reducer from './reducer'
import { 
    DISPLAY_ALERT, 
    CLEAR_ALERT, 
    SETUP_USER_BEGIN,
    SETUP_USER_ERROR,
    SETUP_USER_SUCCESS,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR
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
    user: user ? JSON.parse(user) : null,
    token: token,
    userCounty: userCounty || '',
    eventCounty: userCounty || '',
    showSidebar: false,

}
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

//axios - use interceptor to enable handling of errors
const authFetch = axios.create({
    baseURL: '/api/v1',
});

//request
authFetch.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
//response
authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        console.log('AUTH ERROR');
      }
      return Promise.reject(error);
    }
  );

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT })
        clearAlert()
    }

    const clearAlert = () => {
        setTimeout(() => {
          dispatch({ type: CLEAR_ALERT });
        }, 3000);
      };

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
            const {data} = await axios.post(
                `/api/v1/auth/${endPoint}`, 
                currentUser);
            console.log(data)
            const { user, token, userCounty } = data;
            dispatch({
                type: SETUP_USER_SUCCESS,
                payload: { user, token, userCounty, alertText }
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

const toggleSidebar = () => {
    dispatch({type: TOGGLE_SIDEBAR})
}

const logoutUser = () => {
    dispatch({type: LOGOUT_USER})
    removeUserFromLocalStorage();
}

const updateUser = async (currentUser) => {
    dispatch({type: UPDATE_USER_BEGIN})
    try {
        const { data } = await authFetch.patch('/auth/updateUser', currentUser);
        const {user, userCounty, token} = data

        dispatch({type: UPDATE_USER_SUCCESS, payload:{user, userCounty, token}})
        addUserToLocalStorage({user, userCounty, token})
    } catch(error) {
        dispatch({
            type: UPDATE_USER_ERROR,
            payload: { msg: error.response.data.msg },
          });
    }
   clearAlert();
    
}

    // children prop is everything rendered in between the opening and closing tag of the component 
    return (<AppContext.Provider value={{ ...state, displayAlert, setupUser, toggleSidebar, logoutUser, updateUser }}>{children}</AppContext.Provider>)

}



const useAppContext = () => {
    return useContext(AppContext)
}



export { AppProvider, useAppContext, initialState }