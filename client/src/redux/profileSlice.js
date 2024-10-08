import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import toast from 'react-hot-toast'

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
        dispatch(setError(error))
    }
}

export const updateProfile = ({name, email, phone, address, societyName}) => async (dispatch) => {
    const accessToken = localStorage.getItem('accessToken')
    try {
        dispatch(setLoading())
        const updateFields = {}
        if(name) updateFields.name = name.toLowerCase()
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
        toast.success(res.data.message)
    } catch (error) {
        toast.error(error.response.data.message)
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