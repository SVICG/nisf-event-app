//Context API struture developed from https://www.youtube.com/watch?v=ksDhiLPjyUE&list=PLnHJACx3NwAep5koWkniVHw8PK7dWCO21&index=99
import React, { useReducer, useContext, useEffect } from 'react'
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
  SET_UPDATE_USER,
  UPDATE_PROFILE_BEGIN,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  EDIT_USER_BEGIN,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
  TOGGLE_ADMIN,
  DELETE_USER_BEGIN,
  HANDLE_CHANGE,
  SET_SEARCH_STATUS,
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
  EDIT_STATUS_BEGIN,
  EDIT_STATUS_SUCCESS,
  EDIT_STATUS_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  GET_USER_BEGIN,
  GET_USER_SUCCESS,
  GET_USERS_BEGIN,
  GET_USERS_SUCCESS
} from './action'


//set up events and users globally to enable both adding, editing & grabing values
const initialState = {
  isLoading: false,
  userLoading: true,
  showAlert: false,
  toggleAdmin: false,
  alertText: '',
  alertType: '',
  isOn: '',
  user: null,
  showSidebar: false,
  isEditing: false,
  editEventId: '',
  eventAddress1: '',
  eventAddress2: '',
  eventCity: '',
  eventCounty: 'Down',
  eventCountyOptions: ['Antrim', 'Down', 'Armagh', 'Derry/Londonderry', 'Tyrone', 'Fermanagh'],
  eventPostalCode: '',
  setLocation: '',
  eventTitle: '',
  capacity: 0,
  eventTypeOptions: ['Lecture/Talk', 'Family Theatre Show', 'Outdoor Tour / Activity', 'Film', 'Drop-in Exhibition', 'Panel Discussion', 'Workshop Event', 'Digital Event', 'Other'],
  eventType: 'Lecture/Talk',
  targetAudienceOptions: ['0-3', '3-6', '6-10', '10-14', '14-18', '18+', 'All Ages'],
  targetAudience: 'All Ages',
  description: '',
  date: [],
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
  stats: {},
  weeklySubmissions: [],
  eventTheme: [],
  eventTypes: [],
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'newest',
  sortDate: 'newest',
  searchDate:'',
  sortOptions: ['newest', 'oldest'],
  users: [],
  organisation: '',
  address: '',
  city: '',
  postalCode: '',
  country: '',
  county: '',
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
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  //displays alerts on form submits
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  //Clears alerts following form submits
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  //calls reducer to open and close navigation sidebar
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR })
  }
  
  //Begins call to register or login a user depending on endpoint
  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser);
      const { user, isAdmin } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, isAdmin, alertText }
      })

    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert()
  };


  //calls reducer to logout a user
  const logoutUser = async () => {
    await authFetch.get('/auth/logout')
    dispatch({ type: LOGOUT_USER });
  }

  //calls reducer to return User details from the state
  const setUpdateUser = (id) => {
    dispatch({ type: SET_UPDATE_USER, payload: { id } })
  }


  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_PROFILE_BEGIN })
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser);
      const { user } = data

      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: { user } })

    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_PROFILE_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }

    }
    clearAlert();

  }

  const editUser = async () => {

    dispatch({ type: EDIT_USER_BEGIN })

    try {
      const {
        name,
        email,
        lastName,
        organisation,
        address,
        city,
        postalCode,
        country,
        county

      } = state

      await authFetch.patch(`/auth/editUser/${state.editUserId}`, {
        name,
        email,
        lastName,
        organisation,
        orgAddress: {
          address: address,
          city: city,
          postalCode: postalCode,
          country: country,
          county: county
        },
      })
      dispatch({ type: EDIT_USER_SUCCESS })
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      console.log(error)
      dispatch({ type: EDIT_USER_ERROR, payload: { msg: error.response.data.msg } })
    }
    clearAlert();
  }

  const toggleAdmin = async (id, isOn) => {
    dispatch({ type: TOGGLE_ADMIN })
    try {

      await authFetch.patch(`/auth/getAllUsers/${id}`, {
        isAdmin: !isOn

      })
    } catch (error) {
      console.log(error)
    }
  }

  const deleteUser = async (userId) => {
    dispatch({ type: DELETE_USER_BEGIN })
    try {
      await authFetch.delete(`/auth/getAllUsers/${userId}`)
      getUsers()
    } catch (error) {
      logoutUser()
    }
  }

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
  }

  const updateSearch = ({ name, value }) => {
    dispatch({ type: SET_SEARCH_STATUS, payload: { name, value } })
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
        eventAddress1,
        eventAddress2,
        eventCity,
        eventCounty,
        eventPostalCode,
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
        eventLocation: {
          eventAddress1: eventAddress1,
          eventAddress2: eventAddress2,
          eventCity: eventCity,
          eventCounty: eventCounty,
          eventPostalCode: eventPostalCode,
        },
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

  const getEvents = async (sentDate) => {
    let date = sentDate
    
    const { page, search, searchStatus, searchType, sort, searchDate } = state

    let url = `/events?page=${page}&status=${searchStatus}&eventType=${searchType}&sort=${sort}&sortDate=${date}&searchDate=${searchDate}`
    
    getUsers();
    if (search) {
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
        eventAddress1,
        eventAddress2,
        eventCity,
        eventCounty,
        eventPostalCode,
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
        eventLocation: {
          eventAddress1: eventAddress1,
          eventAddress2: eventAddress2,
          eventCity: eventCity,
          eventCounty: eventCounty,
          eventPostalCode: eventPostalCode,
        },
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

  const editStatus = async () => {
    dispatch({ type: EDIT_STATUS_BEGIN })

    try {
      const { status } = state

      await authFetch.patch(`/events/status/${state.editEventId}`, {
        status
      })
      dispatch({ type: EDIT_STATUS_SUCCESS })
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) {
        dispatch({ type: EDIT_STATUS_ERROR, payload: { msg: error.response.data.msg } })
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
    dispatch({ type: SHOW_STATS_BEGIN })
    try {
      const { data } = await authFetch('/events/stats')
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          weeklySubmissions: data.weeklySubmissions,
          eventTheme: data.eventTheme,
          eventTypes: data.eventTypes,
          eventCounty: data.eventCounty
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  }

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } })
  }

  const getUser = async () => {
    dispatch({ type: GET_USER_BEGIN })
    try {
      const { data } = await authFetch('/auth/getCurrentUser')
      const { user, isAdmin } = data
      dispatch({
        type: GET_USER_SUCCESS,
        payload: { user, isAdmin }
      })
      //return error if no valid user is returned
    } catch (error) {
      if (error.response.status === 401) return;
      logoutUser();
    }
  };

  //invoke getUser everytime the application starts
  useEffect(() => {
    getUser();
  }, []);

  const getUsers = async () => {
    let url = `/auth/getAllUsers`

    dispatch({ type: GET_USERS_BEGIN })
    try {
      const { data } = await authFetch(url);
      const { users } = data

      dispatch({
        type: GET_USERS_SUCCESS,
        payload: { users }
      })

    } catch (error) {
      console.log(error.response)
    }
  }

  // children prop is everything rendered in between the opening and closing tag of the component 
  return (<AppContext.Provider value={{
    ...state,
    displayAlert,
    setupUser,
    editUser,
    toggleSidebar,
    logoutUser,
    updateUser,
    setUpdateUser,
    toggleAdmin,
    deleteUser,
    handleChange,
    updateSearch,
    clearValues,
    createEvent,
    getEvents,
    setEditEvent,
    deleteEvent,
    editEvent,
    editStatus,
    showStats,
    clearFilters,
    changePage,
    getUsers
  }}>{children}</AppContext.Provider>)

}


//custom hook to invoke context
const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, useAppContext, initialState }