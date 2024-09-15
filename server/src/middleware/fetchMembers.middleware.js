import { asyncHandler } from "../util/asyncHandler.js"
import {Society} from "../model/society.model.js"
import { apiError } from "../util/apiError.js"

export const fetchSocietyMembers = asyncHandler(async(req, _, next) => {

    try {
        const society = await Society.find(
            {name: req.user?.societyName}
        ).populate('members')

        if(!society){
            throw new apiError(400, "Society not found")
        }

        req.society = society
        next()   
    } catch (error) {
        next(error)
    }

})