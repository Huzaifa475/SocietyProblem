import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true
export const fetchEvents = () => async(disaptch) => {
    const accessToken = localStorage.getItem('accessToken')
    try {
        const res = await axios({
            method: 'get',
            url: '/api/v1/society/events',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        disaptch(setEvents(res.data.data))
    } catch (error) {
        console.log(error);
        disaptch(setError(error));
    }
}

export const createEvent = ({title, discription, location, onDate}) => async(disaptch) => {
    const accessToken = localStorage.getItem('accessToken')
    try {
        console.log(title, discription, location, onDate);
        
        const res = await axios({
            method: 'post',
            url: '/api/v1/event/create',
            data: {
                title,
                description: discription,
                location, 
                onDate
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        disaptch(fetchEvents())
    } catch (error) {
        console.log(error);
        disaptch(setError(error));
    }
}

export const updateEvent = ({updateTitle, updateDiscription, updateLocation, updateOnDate}, eventId) => async(disaptch) => {
    const accessToken = localStorage.getItem('accessToken')
    try {
        const res = await axios({
            method: 'patch',
            url: `/api/v1/event/update/${eventId}`,
            data: {
                title: updateTitle,
                description: updateDiscription,
                location: updateLocation, 
                onDate: updateOnDate
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        disaptch(fetchEvents())
    } catch (error) {
        console.log(error);
        disaptch(setError(error));
    }
}

export const deleteEvent = (eventId) => async (dispatch) => {
    const accessToken = localStorage.getItem('accessToken')
    try {
        const res = await axios({
            method: 'delete',
            url: `/api/v1/event/delete/${eventId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        dispatch(fetchEvents())
    } catch (error) {
        console.log(error);
    }
}

const initialState = {
    events: [],
    loading: false,
    error: null
}

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        setEvents: (state, action) => {
            if(Array.isArray(action.payload)){
                state.events = action.payload
            }
            else{
                state.events = [action.payload, ...state.events]
            }
            state.loading = false,
            state.error = null
        },
        setLoading: (state) => {
            state.loading = true
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        resetEvents: () => initialState
    }
})

export const {setEvents, setLoading, setError, resetEvents} = eventSlice.actions
export default eventSlice.reducer