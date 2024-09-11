import jwt from "jsonwebtoken";
import { asyncHandler } from "../util/asyncHandler.js";
import { apiError } from "../util/apiError.js";
import { User } from "../model/user.model.js";

export const verifyJwt = asyncHandler(async(req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "");

        if(!token){
            throw new apiError(400, "Unauthorized request")
        }

        const decodedToken = jwt.decode(token, process.env.ACCESS_TOKEN_SECRECT)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if(!user){
            throw new apiError(402, "Invalid access token")
        }

        req.user = user
        next()
    } catch (error) {
        throw new apiError(404, "Invalid access token" || error?.msg)   
    }
})