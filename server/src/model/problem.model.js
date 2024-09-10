import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    upvote: {
        type: Number,
    },
    status: {
        type: Boolean,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, {timestamps: true})

export const Problem = mongoose.model("Problem", problemSchema)