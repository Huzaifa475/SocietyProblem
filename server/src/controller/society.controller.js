import { apiResponse } from "../util/apiResponse";
import { apiError } from "../util/apiError";
import { asyncHandler } from "../util/asyncHandler";
import { Event } from "../model/event.model";

const getSocietyEvent = asyncHandler(async(req, res) => {

    const events = await Event.find(
        {
            societyName: req.user?.societyName
        }
    )

    return res
    .status(200)
    .json(new apiResponse(200, events, "All society events are fetch successfully"))
})

export {getSocietyEvent}