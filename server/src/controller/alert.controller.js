import { apiError } from "../util/apiError.js"
import { apiResponse } from "../util/apiResponse.js"
import { asyncHandler } from "../util/asyncHandler.js"
import { Alert } from "../model/alert.model.js"
import mongoose, { isValidObjectId, now } from "mongoose"
import {io} from "../index.js"

const createAlert = asyncHandler(async (req, res) => {

    const { content } = req.body

    if (!req.user?.admin) {
        throw new apiError(404, "Invalid request")
    }

    const alerts = await Promise.all(
        req.society?.members.map(member =>
            Alert.create({
                content,
                sendTo: member._id
            })
        )
    )

    io.to(req.user.societyName).emit('receive-alert',{
        content: content,
        createdAt: new Date,
        _id: new mongoose.Types.ObjectId()
    })

    return res
    .status(200)
    .json(new apiResponse(200, alerts, "Alert created successfully"))
})

const getAlert = asyncHandler(async(req, res) => {

    const alerts = await Alert.find(
        {sendTo: req.user?._id}
    ).sort({createdAt: -1})

    return res
    .status(200)
    .json(new apiResponse(200, alerts, "Alerts fetch successfully"))
})

const deleteAlertByUser = asyncHandler(async(req, res) => {

    await Alert.deleteMany({sendTo: req.user?._id})

    return res
    .status(200)
    .json(new apiResponse(200, "Alerts deleted successfully"))
})

const deleteAlertByAdmin = asyncHandler(async(req, res) => {

    const {alertId} = req.params

    if(!isValidObjectId(alertId)){
        throw new apiError(404, "Alert does not exists")
    }

    if(!req.user?.admin){
        throw new apiError(402, "Invalid request")
    }

    const alert = await Alert.findById(alertId);

    await Alert.deleteMany({content: alert.content})

    return res
    .status(200)
    .json(new apiResponse(200, "Alert deleted successfully"))
})

export {createAlert, deleteAlertByUser, deleteAlertByAdmin, getAlert}