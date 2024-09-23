import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

axios.defaults.withCredentials = true
export const fetchSocity = () => async(dispatch) => {
    const accessToken = localStorage.getItem('accessToken')
    try {
        dispatch(setLoading())
        const res = await axios({
            method: 'get',
            url: '/api/v1/society/members',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        dispatch(setSocietyMembers(res.data.data))
        console.log(res.data.data);
        
    } catch (error) {
        console.log(error);
        setError(error)
    }
}

export const fetchTotalProblems = () => async(dispatch) => {
    const accessToken = localStorage.getItem('accessToken')
    try {
        dispatch(setLoading())
        const res = await axios({
            method: 'get',
            url: '/api/v1/society/problems',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        dispatch(setTotalProblems(res.data.data))
    } catch (error) {
        console.log(error);
        setError(error)
    }
}

export const fetchTotalEvents = () => async(dispatch) => {
    const accessToken = localStorage.getItem('accessToken')
    try {
        dispatch(setLoading())
        const res = await axios({
            method: 'get',
            url: '/api/v1/society/events',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        dispatch(setTotalEvents(res.data.data))
    } catch (error) {
        console.log(error);
        setError(error)
    }
}

const initialState = {
    societyMembers: [],
    societyProblems: [],
    societyEvents: [],
    totalMembers: null,
    totalProblems: null,
    completedProblems: 0,
    incompleteProblems: 0,
    pendingProblems: 0,
    totalEvents: null,
    loading: false,
    error: null
}

const analyticsSlice = createSlice({
    name: 'analytics',
    initialState,
    reducers: {
        setSocietyMembers: (state, action) => {
            state.societyMembers = action.payload,
            state.totalMembers = state.societyMembers.length
            state.loading = false
            state.error = null
        },
        setTotalProblems: (state, action) => {
            state.societyProblems = action.payload,
            state.totalProblems = state.societyProblems.length
            for(let i = 0; i < state.societyProblems.length; i++){
                if(state.societyProblems[i].status.toLowerCase() === 'complete'){
                    state.completedProblems++
                }
                else if(state.societyProblems[i].status.toLowerCase() === 'incomplete'){
                    state.incompleteProblems++
                }
                else{
                    state.pendingProblems++
                }
            }
            state.loading = false
            state.error = null
        },
        setTotalEvents: (state, action) => {
            state.societyEvents = action.payload,
            state.totalEvents = state.societyEvents.length
            state.loading = false
            state.error = null
        },
        setLoading: (state) => {
            state.loading = true
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        resetState: () => initialState
    }
})

export const {setSocietyMembers, setTotalProblems, setTotalEvents, setLoading, setError, resetState} = analyticsSlice.actions
export default analyticsSlice.reducer