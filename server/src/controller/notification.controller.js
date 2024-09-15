import { Notification } from "../model/notification.model.js"
import {apiError} from "../util/apiError.js"
import {apiResponse} from "../util/apiResponse.js"
import {asyncHandler} from "../util/asyncHandler.js"

const getNotification = asyncHandler(async(req, res) => {

    const notifications = await Notification.find(
        {sendTo: req.user?._id}    
    ).sort({createdAt: -1})
    
    return res
    .status(200)
    .json(new apiResponse(200, notifications, "Notifications fetch successfully"))
})

const deleteNotification = asyncHandler(async(req, res) => {

    await Notification.deleteMany(
        {sendTo: req.user?._id}
    )

    return res
    .status(200)
    .json(new apiResponse(200, "Notifications deleted successfully"))
})

export {getNotification, deleteNotification}