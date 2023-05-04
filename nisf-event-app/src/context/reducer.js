import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    SETUP_USER_BEGIN,
    SETUP_USER_ERROR,
    SETUP_USER_SUCCESS,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    SET_UPDATE_USER,
    EDIT_USER_BEGIN,
    EDIT_USER_SUCCESS,
    EDIT_USER_ERROR,
    UPDATE_PROFILE_BEGIN,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_ERROR,
    TOGGLE_ADMIN,
    DELETE_USER_BEGIN,
    HANDLE_CHANGE,
    CLEAR_VALUES,
    CREATE_EVENT_BEGIN,
    CREATE_EVENT_ERROR,
    CREATE_EVENT_SUCCESS,
    GET_EVENT_BEGIN,
    GET_EVENT_SUCCESS,
    SET_EDIT_EVENT,
    SET_SEARCH_STATUS,
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
            alertText: 'Please provide the required information'
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
            userLoading: false,
        }
    }

    if (action.type === SET_UPDATE_USER) {
        // grab USER from user array we have in the state - if the event matches the one being passed in (payload) then return the details
        const user = state.users.find((user) => user._id === action.payload.id)
        const {
            _id,
            name,
            lastName,
            email,
            organisation,
            orgAddress: {
                address,
                city,
                postalCode,
                country,
                county
            },


        } = user
        
        // then update the state
        return {
            ...state,
            isEditing: true,
            editUserId: _id,
            name,
            lastName,
            email,
            organisation,
            address: address,
            city,
            postalCode,
            country,
            county
        }

    }

    if (action.type === EDIT_USER_BEGIN) {
        return { ...state, isLoading: true };
    }
    if (action.type === EDIT_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'User has been updated'

        };
    }

    if (action.type === EDIT_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg

        };
    }
    if (action.type === UPDATE_PROFILE_BEGIN) {
        return { ...state, isLoading: true };
    }

    if (action.type === UPDATE_PROFILE_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            user: action.payload.user,
            organisation: action.payload.user.organisation,
            city: action.payload.user.orgAddress.city,
            address: action.payload.user.orgAddress.address,
            postalCode: action.payload.user.orgAddress.postalCode,
            county: action.payload.user.orgAddress.county,
            country: action.payload.user.orgAddress.country,
            showAlert: true,
            alertType: 'success',
            alertText: 'Profile Updated'
        };
    }

    if (action.type === UPDATE_PROFILE_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        };
    }

    if (action.type === TOGGLE_ADMIN) {

        return {
            ...state,
            isOnAdmin: !state.isOnAdmin,
            toggleAdmin: !state.toggleAdmin,
        };
    }

    if (action.type === DELETE_USER_BEGIN) {
        return { ...state, isLoading: true }

    }



    if (action.type === HANDLE_CHANGE) {
        return {
            ...state,
            page: 1,
            [action.payload.name]: action.payload.value
        };
    }

    if (action.type === SET_SEARCH_STATUS) {
        return {
            ...state,
            [action.payload.name]: action.payload.value
        };
    }

    if (action.type === CLEAR_VALUES) {

        const initialState = {
            isEditing: false,
            editEventId: '',
            eventTitle: '',
            capacity: 0,
            description: '',
            admissionPrice: '',
            startTime: '',
            endTime: '',
            eventAddress1: '',
            eventAddress2: '',
            eventCity: '',
            eventPostalCode: '',

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
            eventLocation: {
                eventAddress1,
                eventAddress2,
                eventCity,
                eventCounty,
                eventPostalCode,
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
            status } = event
        // then update the state
        return {
            ...state,
            isEditing: true,
            editEventId: _id,
            eventTitle,
            eventAddress1,
            eventAddress2: eventAddress2,
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
            alertText: 'Event has been updated'

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

    if (action.type === EDIT_STATUS_BEGIN) {
        return {
            ...state,
            isLoading: true,
        };
    }

    if (action.type === EDIT_STATUS_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'Status has been updated'

        };
    }

    if (action.type === EDIT_STATUS_ERROR) {
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
            eventTheme: action.payload.eventTheme,
            eventTypes: action.payload.eventTypes,
            eventCounty: action.payload.eventCounty
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
            page: action.payload.page
        }
    }

    if (action.type === GET_CURRENT_USER_BEGIN) {
        return {
            ...state,
            userLoading: true,
            showAlert: false,
        }
    }

    if (action.type === GET_CURRENT_USER_SUCCESS) {
        return {
            ...state,
            userLoading: false,
            user: action.payload.user,
            userCounty: action.payload.user.userCounty,


        }
    }

    if (action.type === GET_USERS_BEGIN) {

        return { ...state, isLoading: true, showAlert: false }
    }

    if (action.type === GET_USERS_SUCCESS) {

        return { ...state, isLoading: false, users: action.payload.users }
    }

    throw new Error(`no such action : ${action.type}`)
}

export default reducer