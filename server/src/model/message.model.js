import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    societyName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: {expires: '7d'}
    }
}, {timestamps: true})

export const Message = mongoose.model("Message", messageSchema)