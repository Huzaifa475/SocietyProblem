import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from './notificationSlice.js'
import alertReducer from './alertSlice.js'
import problemReducer from './problemSlice.js'
import profileReducer from './profileSlice.js'
import eventReducer from './eventSlice.js'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        alert: alertReducer,
        problem: problemReducer,
        profile: profileReducer,
        event: eventReducer
    }
})

export default store;