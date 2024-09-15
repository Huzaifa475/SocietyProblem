import { apiError } from "../util/apiError.js"
import {apiResponse} from "../util/apiResponse.js"
import { asyncHandler} from "../util/asyncHandler.js"
import { Event } from "../model/event.model.js"
import { isValidObjectId } from "mongoose"

const createEvent = asyncHandler(async(req, res) => {

    const {title, description, location} = req.body

    if(!title || !description || !location){
        throw new apiError(400, "All fields are required");
    }

    const event = await Event.create({
        title,
        description,
        location,
        societyName: req.user?.societyName,
        createdBy: req.user?._id
    })

    if(!event){
        throw new apiError(500, "Server error, Event is not created");
    }

    return res
    .status(200)
    .json(new apiResponse(200, event, "Event created successfully"))
})

const updateEvent = asyncHandler(async(req, res) => {

    const {title, description, location} = req.body;
    const {eventId} = req.params;

    if(!isValidObjectId(eventId)){
        throw new apiError(404, "Event does not exists")
    }

    let event = await Event.findById(eventId);

    if(event.createdBy.equals(req.user?._id) || req.user?._id === true){
        event = await Event.findByIdAndUpdate(
            eventId, 
            {
                title,
                description,
                location
            },
            {
                new: true
            }
        )
    }
    else{
        throw new apiError(402, "Invalid request")
    }

    return res
    .status(200)
    .json(new apiResponse(200, event, "Event updated successfully"))
})

const deleteEvent = asyncHandler(async(req, res) => {

    const {eventId} = req.params;

    if(!isValidObjectId(eventId)){
        throw new apiError(404, "Event does not exists")
    }

    let event = await Event.findById(eventId)

    if(req.user?.admin === true || event.createdBy.equals(req.user?._id)){
        event = await Event.findByIdAndDelete(eventId)
    }
    else{
        throw new apiError(404, "Invalid request")
    }

    return res
    .status(200)
    .json(new apiResponse(200, event,"Event deleted successfully"))
})

export {createEvent, updateEvent, deleteEvent}