import { apiResponse } from "../util/apiResponse.js";
import { apiError } from "../util/apiError.js";
import { asyncHandler } from "../util/asyncHandler.js";
import { Event } from "../model/event.model.js";
import { Society } from "../model/society.model.js";
import { Problem } from "../model/problem.model.js";

const getSocietyMembers = asyncHandler(async(req, res) => {

    const society = await Society.find(
        {name: req.user?.societyName},
        {members: 1, admin: 1}
    )

    if(!society){
        throw new apiError(404, "Society not found")
    }

    return res
    .status(200)
    .json(new apiResponse(200, society, "All society members are fetch successfully"))
})

const getSocietyEvents = asyncHandler(async(req, res) => {

    const events = await Event.find(
        {
            societyName: req.user?.societyName
        }
    )

    return res
    .status(200)
    .json(new apiResponse(200, events, "All society events are fetch successfully"))
})

const getSocietyProblems = asyncHandler(async(req, res) => {

    const problems = await Problem.find(
        {
            societyName: req.user?.societyName
        }
    ).sort({createdAt: -1})

    return res
    .status(200)
    .json(new apiResponse(200, problems, "All society problems fetch successfully"))
})

export {getSocietyEvents, getSocietyMembers, getSocietyProblems}