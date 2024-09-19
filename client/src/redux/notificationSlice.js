import {createSlice} from "@reduxjs/toolkit";
import axios from 'axios';

axios.defaults.withCredentials = true;
export const fetchNotifications = () => async (dispatch) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
        dispatch(setLoading());
        const res = await axios({
            method: 'get',
            url: '/api/v1/notification/get',
            headers: {
                'Content-Type': '/application.json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        dispatch(setNotifications(res.data?.data))
    } catch (error) {
        console.log(error);
    }
}

export const deleteNotifications = () => async (dispatch) => {
    const accessToken = localStorage.getItem('accessToken')
    try {
        dispatch(setLoading());
        const res = await axios({
            method: 'delete',
            url: '/api/v1/notification/delete',
            headers: {
                'Content-Type': '/application.json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        dispatch(resetNotifications())
    } catch (error) {
        console.log(error);
    }
}

const initialState = {
    notifications: [],
    loading: false,
    error: null
}

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotifications: (state, action) => {
            state.notifications = action.payload;
            state.loading = false;
            state.error = null;
        },
        setLoading: (state) => {
            state.loading = true
        },
        setError: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        resetNotifications: () => initialState
    }
})

export const { setNotifications, setLoading, setError, resetNotifications} = notificationSlice.actions;
export default notificationSlice.reducer;