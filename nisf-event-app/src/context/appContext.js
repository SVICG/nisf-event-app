import React, { useReducer, useContext, } from 'react'
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
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_EVENT_BEGIN,
  CREATE_EVENT_ERROR,
  CREATE_EVENT_SUCCESS,
  GET_EVENT_BEGIN,
  GET_EVENT_SUCCESS,
  SET_EDIT_EVENT,
  DELETE_EVENT_BEGIN,
  EDIT_EVENT_BEGIN,
  EDIT_EVENT_SUCCESS,
  EDIT_EVENT_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS
} from './action'
import { useEffect } from 'react'
// add useContext for on eless import -m not necesaary but good for bigger projects


//set up jobs globally to enableboth adding, editing & grabing values
const initialState = {
  isLoading: false,
  userLoading: true,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: null,
  county: 'undefined' || '',
  showSidebar: false,
  isEditing: false,
  editEventId: '',
  location: '',
  setLocation: '',
  eventTitle: '',
  capacity: 0,
  eventTypeOptions: ['Lecture/Talk', 'Family Theatre Show', 'Outdoor Tour / Activity', 'Film', 'Drop-in Exhibition', 'Panel Discussion', 'Workshop Event', 'Digital Event', 'Other'],
  eventType: 'Lecture/Talk',
  targetAudienceOptions: ['0-3', '3-6', '6-10', '10-14', '14-18', '18+', 'All Ages'],
  targetAudience: 'All Ages',
  description: '',
  date: [''],
  startTime: '',
  endTime: '',
  admissionPrice: '',
  themeOptions: ['Mind & Body', 'Tech & Innovation', 'Engineering & Robots', 'Food for Thought', 'Science Communication', 'Art & Science', 'History & Science', 'Maths & Physics', 'Environment & Nature', 'Creat. Make. Play.', 'Space'],
  theme: 'Mind & Body',
  statusOptions: ['approved', 'pending', 'declined'],
  status: 'pending',
  events: [],
  totalEvents: 0,
  numOfPages: 1,
  page: 1,
  stats:{},
  weeklySubmissions:[],
  search:'',
  searchStatus:'all',
  searchType:'all',
  sort:'newest',
  sortOptions:['newest', 'oldest'],
  isAdmin: false,

}
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  //axios - use interceptor to enable handling of errors
  const authFetch = axios.create({
    baseURL: '/api/v1',
  });

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

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };


  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser);
      // console.log(data)
      const { user, county, isAdmin } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, county, isAdmin, alertText }
      })
      
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert()
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR })
  }

  const logoutUser = async () => {
    await authFetch.get('/auth/logout')
    dispatch({ type: LOGOUT_USER });
    
  }

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN })
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser);
      const { user, county} = data

      dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, county} })
      
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }

    }
    clearAlert();

  }


  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
  }

  const clearValues = () => {
    dispatch({
      type: CLEAR_VALUES
    })
  }

  const createEvent = async () => {
    dispatch({ type: CREATE_EVENT_BEGIN })
    try {
      const {
        eventTitle,
        location,
        capacity,
        eventType,
        targetAudience,
        description,
        date,
        startTime,
        endTime,
        admissionPrice,
        theme,
        status } = state

      await authFetch.post('/events', {
        eventTitle,
        location,
        capacity,
        eventType,
        targetAudience,
        description,
        date,
        startTime,
        endTime,
        admissionPrice,
        theme,
        status
      })
      dispatch({ type: CREATE_EVENT_SUCCESS })
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response === 401) return
      dispatch({
        type: CREATE_EVENT_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }

  }

  const getEvents = async () => {
    const {page, search, searchStatus, searchType, sort} = state
    let url = `/events?page=${page}&status=${searchStatus}&eventType=${searchType}&sort=${sort}`
    if(search){
      url = url + `&search=${search}`
    }
    dispatch({ type: GET_EVENT_BEGIN })
    try {
      const { data } = await authFetch(url);
      const { events, totalEvents, numOfPages } = data
      dispatch({
        type: GET_EVENT_SUCCESS,
        payload: {
          events,
          totalEvents,
          numOfPages,
        }
      })
    } catch (error) {
      
      logoutUser()
    }
    clearAlert();
  }

  const setEditEvent = (id) => {
    dispatch({ type: SET_EDIT_EVENT, payload: { id } })
  }

  const editEvent = async () => {
    dispatch({ type: EDIT_EVENT_BEGIN })

    try {
      const {
        eventTitle,
        location,
        capacity,
        eventType,
        targetAudience,
        description,
        date,
        startTime,
        endTime,
        admissionPrice,
        theme,
        status } = state

      await authFetch.patch(`/events/${state.editEventId}`, {
        eventTitle,
        location,
        capacity,
        eventType,
        targetAudience,
        description,
        date,
        startTime,
        endTime,
        admissionPrice,
        theme,
        status
      })
      dispatch({ type: EDIT_EVENT_SUCCESS })
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) {
        dispatch({ type: EDIT_EVENT_ERROR, payload: { msg: error.response.data.msg } })
      }
    }
    clearAlert();
  }


  const deleteEvent = async (eventId) => {
    dispatch({ type: DELETE_EVENT_BEGIN })
    try {
      await authFetch.delete(`/events/${eventId}`)
      getEvents()
    } catch (error) {
      logoutUser()
    }
  }

  const showStats = async () => {
    dispatch({type:SHOW_STATS_BEGIN})
    try {
      const {data} = await authFetch('/events/stats')
      dispatch({type:SHOW_STATS_SUCCESS, payload: {
        stats: data.defaultStats,
        weeklySubmissions: data.weeklySubmissions,
      }}
      )
    } catch (error) {
      logoutUser()
    }
    clearAlert()
  }

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const changePage = (page) => {
    dispatch ({type: CHANGE_PAGE, payload: {page}})
  }

const getCurrentUser = async () => {
  dispatch({type: GET_CURRENT_USER_BEGIN})
  try {
    const {data} = await authFetch('/auth/getCurrentUser')
    const {user, county, isAdmin} = data
    dispatch({
      type:GET_CURRENT_USER_SUCCESS,
      payload:{user, county, isAdmin}
    })
  } catch (error) {
    if(error.response.status === 401) return;
    logoutUser();
  }
}
useEffect(()=> {
  getCurrentUser();
}, []);

  // children prop is everything rendered in between the opening and closing tag of the component 
  return (<AppContext.Provider value={{ ...state, displayAlert, setupUser, toggleSidebar, logoutUser, updateUser, handleChange, clearValues, createEvent, getEvents, setEditEvent, deleteEvent, editEvent, showStats, clearFilters, changePage }}>{children}</AppContext.Provider>)

}



const useAppContext = () => {
  return useContext(AppContext)
}



export { AppProvider, useAppContext, initialState }