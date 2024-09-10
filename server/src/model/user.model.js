import mongoose, { trusted } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
    },
    societyName: {
        type: String, 
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    photo: {
        type: String,
    }
}, {timestamps: true})

export const User = mongoose.model("User", userSchema)