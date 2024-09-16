import { asyncHandler } from "../util/asyncHandler.js"
import {Society} from "../model/society.model.js"
import { apiError } from "../util/apiError.js"

export const fetchSocietyMembers = asyncHandler(async(req, _, next) => {

    try {
        const society = await Society.find(
            {name: req.user?.societyName}
        )

        if(!society){
            throw new apiError(400, "Society not found")
        }
        
        req.society = society[0]
        next()   
    } catch (error) {
        next(error)
    }

})