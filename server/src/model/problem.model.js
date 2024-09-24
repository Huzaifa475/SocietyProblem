import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    upvote: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        required: true,
        enum: ['Ongoing', 'Completed', 'Incomplete'],
        default: 'incomplete'
    },
    category: {
        type: String,
        required: true,
        enum: ['Infrastructure Issues', 'Security Concerns', 'Utilities Problems', 'Event Management',
            'Financial Issues', 'Administrative Requests', 'Dispute Resolution', 'Housekeeping Issues',
            'Parking Issues', 'Community Activities'
        ]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    societyName: {
        type: String,
        required: true
    },
    upvotedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, {timestamps: true})

export const Problem = mongoose.model("Problem", problemSchema)