import {createSlice} from "@reduxjs/toolkit"
import axios from 'axios'

axios.defaults.withCredentials = true
export const fetchAlerts = () => async (dispatch) => {
    const accessToken = localStorage.getItem('accessToken')
    try {
        dispatch(setLoading())
        const res = await axios({
            method: 'get',
            url: '/api/v1/alert/get',
            headers: {
                'Content-Type': '/application.json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        dispatch(setAlerts(res.data?.data))
    } catch (error) {
        console.log(error);
    }
}

export const deleteAlerts = () => async (dispatch) => {
    const accessToken = localStorage.getItem('accessToken')
    try {
        const res = await axios({
            method: 'delete',
            url: '/api/v1/alert/delete',
            headers: {
                'Content-Type': '/application.json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        dispatch(resetAlerts())
    } catch (error) {
        console.log(error);
    }
}

const initialState = {
    alerts: [],
    loading: false,
    error: null
}

const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        setAlerts: (state, action) => {
            state.alerts = action.payload,
            state.loading = false,
            state.error = null
        },
        setLoading: (state) => {
            state.loading = true
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        resetAlerts: () => initialState
    }
})

export const {setAlerts, setLoading, setError, resetAlerts} = alertSlice.actions
export default alertSlice.reducer