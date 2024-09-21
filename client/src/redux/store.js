import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from './notificationSlice.js'
import alertReducer from './alertSlice.js'
import problemReducer from './problemSlice.js'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        alert: alertReducer,
        problem: problemReducer
    }
})

export default store;