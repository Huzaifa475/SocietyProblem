import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;
export const fetchProblems = () => async (dispatch) => {
    const accessToken = localStorage.getItem('accessToken')
    try {
        const res = await axios({
            method: 'get',
            url: '/api/v1/society/problems',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        dispatch(setProblems(res.data.data));
    } catch (error) {
        console.log(error);
    }
}

export const createProblem = ({content, category}) => async (dispatch) => {
    const accessToken = localStorage.getItem('accessToken')
    try {
        const res = await axios({
            method: 'post',
            url: '/api/v1/problem/create',
            data: {
                content,
                category
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        dispatch(fetchProblems());
    } catch (error) {
        console.log(error);
    }
}

export const updateProblem = ({content, category, status} ,problemId) => async (dispatch) => {
    const accessToken = localStorage.getItem('accessToken')
    try {
        console.log(content);        
        const res = await axios({
            method: 'patch',
            url: `/api/v1/problem/update/${problemId}`,
            data: {
                content,
                category,
                status
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        dispatch(fetchProblems())
    } catch (error) {
        console.log(error);
    }
}

export const updateUpvote = (upvote, problemId) => async (dispatch) => {
    const accessToken = localStorage.getItem('accessToken')
    try {        
        const res = await axios({
            method: 'patch',
            url: `/api/v1/problem/updateUpvote/${problemId}`,
            data: {
                upvote: upvote+1
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        dispatch(fetchProblems())
    } catch (error) {
        console.log(error);
    }
}

export const deleteProblem = (problemId) => async (dispatch) => {
    const accessToken = localStorage.getItem('accessToken')
    try {
        console.log(problemId);
        const res = await axios({
            method: 'delete',
            url: `/api/v1/problem/delete/${problemId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        dispatch(fetchProblems())
    } catch (error) {
        console.log(error);
    }
}

const initialState = {
    problems: [],
    loading: false,
    error: null
}

const problemSlice = createSlice({
    name: "problem",
    initialState,
    reducers: {
        setProblems: (state, action) => {
            if(Array.isArray(action.payload)){
                state.problems = action.payload
            }
            else{
                state.problems = [action.payload, ...state.problems]
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
        resetProblems: () => initialState
    }
})

export const {setProblems, setLoading, setError, resetProblems} = problemSlice.actions
export default problemSlice.reducer