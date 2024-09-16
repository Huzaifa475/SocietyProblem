import { isValidObjectId } from "mongoose";
import { Problem } from "../model/problem.model.js";
import { apiError } from "../util/apiError.js";
import { apiResponse } from "../util/apiResponse.js";
import { asyncHandler } from "../util/asyncHandler.js";
import {Notification} from "../model/notification.model.js";

const createProblem = asyncHandler(async(req, res) => {

    const {content, category} = req.body

    if(content === null  || category === null){
        throw new apiError(402, "All fields are required")
    }

    const exists = await Problem.findOne({$or: [{content}]})

    if(exists){
        throw new apiError(404, "Problem already exists")
    }

    const problem = await Problem.create(
        {
            content, 
            category,
            createdBy: req.user._id,
            societyName: req.user.societyName
        }
    )

    if(!problem){
        throw new apiError(500, "Server error, Someting went wrong")
    }

    const notificationContent = `New Problem arised in society, ${problem.content}`
    const notification = await Promise.all(
        req.society?.members.filter(member => !member._id.equals(req.user?._id)).map(member => 
            Notification.create({
                content: notificationContent,
                sendTo: member._id
            })
        )
    );

    if(!notification.length){
        throw new apiError(500, "Server error, Notification could not be created");
    }

    return res
    .status(200)
    .json(new apiResponse(200, problem, "Problem created successfully"))
})

const updateProblem = asyncHandler(async(req, res) => {

    const {content, category, status, upvote} = req.body
    const {problemId} = req.params

    if(!isValidObjectId(problemId)){
        throw new apiError(400, "Problem does not exits")
    }

    let problem = await Problem.findById(problemId)

    if(problem.createdBy.equals(req.user._id) || req.user.admin === true){
        problem = await Problem.findByIdAndUpdate(
            problemId,
            {
                content,
                category,
                status,
                upvote
            },
            {
                new: true
            }
        )
    }
    else{
        throw new apiError(404, "Invalid request")
    }

    return res
    .status(200)
    .json(new apiResponse(200, problem, "Problem updated successfully"))
})

const deleteProblem = asyncHandler(async(req, res) => {

    const {problemId} = req.params

    if(!isValidObjectId(problemId)){
        throw new apiError(402, "Problem does not exists")
    }

    const problem = await Problem.findById(problemId)

    if(problem.createdBy.equals(req.user._id) || req.user.admin === true){
        await Problem.findByIdAndDelete(problemId)
    }
    else{
        throw new apiError(402, "Invalid request")
    }

    return res
    .status(200)
    .json(new apiResponse(200, problem, "Problem deleted successfully"))
})

export {createProblem, updateProblem, deleteProblem}