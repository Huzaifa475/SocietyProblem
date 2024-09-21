import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

axios.defaults.withCredentials = true
export const fetchProfile = () => async (dispatch) => {
    const accessToken = localStorage.getItem('accessToken')
    try {
        dispatch(setLoading())
        const res = await axios({
            method: 'get',
            url: '/api/v1/users/getCurrentUser',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        dispatch(setProfile(res.data.data))
    } catch (error) {
        console.log(error);
        dispatch(setError())
    }
}

export const updateProfile = ({name, email, phone, address, societyName}) => async (dispatch) => {
    const accessToken = localStorage.getItem('accessToken')
    try {
        dispatch(setLoading())
        const updateFields = {}
        if(name) updateFields.name = name
        if(email) updateFields.email = email
        if(phone) updateFields.phone = phone
        if(address) updateFields.address = address
        if(societyName) updateFields.societyName = societyName
        const res = await axios({
            method: 'patch',
            url: '/api/v1/users/update',
            data: {
                ...updateFields
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        dispatch(fetchProfile())
    } catch (error) {
        console.log(error);
        dispatch(setError())
    }
}

const initialState = {
    profile: {},
    loading: false,
    error: null
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload
            state.loading = false
            state.error = null
        },
        setLoading: (state) => {
            state.loading = true
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        resetProfile: () => initialState
    }
})

export const {setProfile, setLoading, setError, resetProfile} = profileSlice.actions
export default profileSlice.reducer