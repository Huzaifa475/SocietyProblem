import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from './notificationSlice.js'
import alertReducer from './alertSlice.js'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        alert: alertReducer
    }
})

export default store;