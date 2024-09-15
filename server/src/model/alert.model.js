import mongoose from "mongoose"

const alertSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    sendTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

export const Alert = mongoose.model("Alert", alertSchema)