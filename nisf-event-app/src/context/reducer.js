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
    GET_CURRENT_USER_SUCCESS,
    GET_USERS_BEGIN,
    GET_USERS_SUCCESS
} from "./action"

//import initial state so you can update specific values with out having to keep adding properties everytime initialstate is updated in appContext
import { initialState } from "./appContext";

const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return {
            ...state,
            showAlert: true,
            alertType: 'danger',
            alertText: 'Please provide the required info'
        };
    }

    if (action.type === CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: '',
            alertText: ''
        };
    }

    // if(action.type === REGISTER_USER_BEGIN) {
    //     return {...state, isLoading: true};
    // }

    // if(action.type === REGISTER_USER_SUCCESS) {
    //     return {...state, 
    //         isLoading: false,
    //         token:action.payload.token,
    //         user: action.payload.user,
    //         userCounty: action.payload.userCounty,
    //         eventCounty: action.payload.eventCounty,
    //         showAlert:true, 
    //         alertType: 'success', 
    //         alertText: 'Great! Your account has been created...'
    //     };
    // }

    // if(action.type === REGISTER_USER_ERROR) {
    //     return {
    //         ...state, 
    //         isLoading: false,
    //         showAlert:true, 
    //         alertType: 'danger', 
    //         alertText: action.payload.msg,
    //     };
    // }

    // if(action.type === LOGIN_USER_BEGIN) {
    //     return {...state, isLoading: true};
    // }

    // if(action.type === LOGIN_USER_SUCCESS) {
    //     return {...state, 
    //         isLoading: false,
    //         token: action.payload.token,
    //         user: action.payload.user,
    //         userCounty: action.payload.userCounty,
    //         eventCounty: action.payload.eventCounty,
    //         showAlert:true, 
    //         alertType: 'success', 
    //         alertText: 'Great! Logging in...'
    //     };
    // }

    // if(action.type === LOGIN_USER_ERROR) {
    //     return {
    //         ...state, 
    //         isLoading: false,
    //         showAlert:true, 
    //         alertType: 'danger', 
    //         alertText: action.payload.msg,
    //     };getEvent
    //}

    if (action.type === SETUP_USER_BEGIN) {
        return { ...state, isLoading: true };
    }

    if (action.type === SETUP_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            user: action.payload.user,
            userCounty: action.payload.userCounty,
            eventCounty: action.payload.eventCounty,
            isAdmin: action.payload.isAdmin,
            showAlert: true,
            alertType: 'success',
            alertText: action.payload.alertText,
        };
    }

    if (action.type === SETUP_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        };
    }

    if (action.type === TOGGLE_SIDEBAR) {
        return {
            ...state,
            showSidebar: !state.showSidebar,
        };
    }

    if (action.type === LOGOUT_USER) {
        return {
            ...initialState,
            userLoading:false,
        }
    }

    if (action.type === UPDATE_USER_BEGIN) {
        return { ...state, isLoading: true };
    }

    if (action.type === UPDATE_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            user: action.payload.user,
            userCounty: action.payload.userCounty,
            eventCounty: action.payload.eventCounty,
            showAlert: true,
            alertType: 'success',
            alertText: 'Profile Updated'
        };
    }

    if (action.type === UPDATE_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        };
    }

    if (action.type === HANDLE_CHANGE) {
        return {
            ...state,
            page: 1,
            [action.payload.name]: action.payload.value
        };
    }


    if (action.type === CLEAR_VALUES) {

        const initialState = {
            isEditing: false,
            editEventId: '',
            location: state.userCounty,
            eventTitle: '',
            capacity: 0,
            description: '',
            admissionPrice: '',
            startTime: '',
            endTime: ''
        }
        return {
            ...state,
            ...initialState
        };
    }

    if (action.type === CREATE_EVENT_BEGIN) {
        return { ...state, isLoading: true }
    }

    if (action.type === CREATE_EVENT_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'New event created',
        };
    }

    if (action.type === CREATE_EVENT_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        };
    }

    if (action.type === GET_EVENT_BEGIN) {
        return { ...state, isLoading: true, showAlert: false }
    }

    if (action.type === GET_EVENT_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            events: action.payload.events,
            totalEvents: action.payload.totalEvents,
            numOfPages: action.payload.numOfPages,

        };
    }

    if (action.type === SET_EDIT_EVENT) {
        // grab event from event array we have in the state - if the event matches the one being passed in (payload) then return the details
        const event = state.events.find((event) => event._id === action.payload.id)
        const {
            _id,
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
            status } = event
        // then update the state
        return {
            ...state,
            isEditing: true,
            editEventId: _id,
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

        }
    }

    if (action.type === DELETE_EVENT_BEGIN) {
        return { ...state, isLoading: true }
    }

    if (action.type === EDIT_EVENT_BEGIN) {
        return {
            ...state,
            isLoading: true,
        };
    }

    if (action.type === EDIT_EVENT_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'Event had been updated'

        };
    }

    if (action.type === EDIT_EVENT_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg

        };
    }

    if (action.type === SHOW_STATS_BEGIN) {
        return {
            ...state,
            isLoading: true,
            showAlert: false,
        }
    }

    if (action.type === SHOW_STATS_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            stats: action.payload.stats,
            weeklySubmissions: action.payload.weeklySubmissions,
            eventTheme : action.payload.eventTheme
        }
    }

    if (action.type === CLEAR_FILTERS) {
        return {
          ...state,
          search: '',
          searchStatus: 'all',
          searchType: 'all',
          sort: 'newest',
        };
      }

    if (action.type === CHANGE_PAGE) {
        return {
            ...state, 
            page:action.payload.page}
    }

    if (action.type === GET_CURRENT_USER_BEGIN) {
       return { ...state,
        userLoading:true,
        showAlert:false,
       }
    }

    if (action.type === GET_CURRENT_USER_SUCCESS) {
        return { 
            ...state,
            userLoading:false,
            user:action.payload.user,
            userCounty:action.payload.user.userCounty,
            location:action.payload.location,
            
           }
    }

    if(action.type === GET_USERS_BEGIN) {
        
        return { ...state, isLoading: true, showAlert: false }
    }

    if(action.type === GET_USERS_SUCCESS) {
        
        return { ...state, isLoading: false, users: action.payload.users }
    }

    throw new Error(`no such action : ${action.type}`)
}

export default reducer