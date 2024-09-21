import {createSlice} from 'react-redux'
import axios from 'axios'

axios.defaults.withCredentials = true
export const fetchProfile = () => (dispatch) => {

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

export const {setProfile, setLoading, setError, resetProfile} = profileSlice.action
export default profileSlice.reducers