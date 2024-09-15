import mongoose from "mongoose"

const notificationSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    sendTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

export const Notification = mongoose.model('Notification', notificationSchema)