import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    location: {
        type: String,
        required: true
    },
    societyName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}, {timestamps: true})

export const Event = mongoose.model("Event", eventSchema)
