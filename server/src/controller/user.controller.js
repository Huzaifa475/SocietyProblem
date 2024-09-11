import {apiResponse} from "../util/apiResponse.js"
import {apiError} from "../util/apiError.js"
import {asyncHandler} from "../util/asyncHandler.js"
import {User} from "../model/user.model.js"

const generateAccessRefreshToken = async (userId) => {
    try{
        const user = await User.findById(userId);

        const accessToken = await user.generateAccessToken();

        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken

        await user.save({validateBeforeSave: false})

        return {refreshToken, accessToken}
    }
    catch(error){
        throw new apiError(500, "Server error will generating access token and refresh token")
    }
}

const registerUser = asyncHandler(async(req, res) => {

    const {name, email, password} = req.body;

    if(!name || !email || !password){
        throw new apiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({$or: [{name}, {email}]})

    if(existedUser){
        throw new apiError(402, "User already exists")
    }

    const user = await User.create({
        name: name,
        email: email,
        password: password
    })

    const createdUser = await User.findOne(user?._id).select("-password -refreshToken")

    if(!createdUser){
        throw new apiError(500, "Server error, User does not registered")
    }

    return res
    .status(200)
    .json(new apiResponse(200, createdUser, "User registered successfully"))
})

const loginUser = asyncHandler(async(req, res) => {

    const {name, password} = req.body;

    if(!name || !password){
        throw new apiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({$or: [{name}]})

    if(!existedUser){
        throw new apiError(402, "User does not exists")
    }

    const isPasswordValid = await existedUser.isValidPassword(password);

    if(!isPasswordValid){
        throw new apiError(404, "Password is incorrect")
    }

    const {refreshToken, accessToken} = await generateAccessRefreshToken(existedUser?._id);

    const loggedInUser = await User.findById(existedUser?._id).select("-refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new apiResponse(200, {user: loggedInUser, refreshToken, accessToken},"User logged in successfully"))
})

const logoutUser = asyncHandler(async(req, res) => {

    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $unset: {
                refreshToken: true
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true,
        expires: new Date(0)
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(200, "User logged out successfully"))
})

const informationUser = asyncHandler(async(req, res) => {

    const {phone, societyName, admin, address} = req.body

    if(!phone || !societyName || !admin || !address){
        throw new apiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            phone,
            societyName,
            admin,
            address
        },
        {
            new: true
        }
    )

    if(!user){
        throw new apiError(402, "Invalid request")
    }

    return res
    .status(200)
    .json(new apiResponse(200, user, "User information updated successfully"))
})

const updateUser = asyncHandler(async(req, res) => {

    const {name, email, phone, societyName, admin, address} = req.body;

    const updateFields = {} 

    if(name) updateFields.name = name
    if(email) updateFields.email = email
    if(phone) updateFields.phone = phone
    if(societyName) updateFields.societyName = societyName
    if(admin !== undefined) updateFields.admin = admin
    if(address) updateFields.address = address

    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
               ...updateFields
            }
        },
        {
            new: true,
            runValidators: true
        }
    )
    
    const updatedUser = await User.findById(req.user?._id).select("-password -refreshToken")

    if(!updatedUser){
        throw new apiError(404, "User does not exists")
    }

    return res
    .status(200)
    .json(new apiResponse(200, updatedUser, "User updated successfully"))
})

const getCurrentUser = asyncHandler(async(req, res) => {

    const user = await User.findById(req.user?._id).select("-password -refreshToken")

    if(!user){
        throw new apiError("User does not exists")
    }

    return res
    .status(200)
    .json(new apiResponse(200, user, "Current user fetch successfully"))
})

export {registerUser, loginUser, logoutUser, informationUser, updateUser, getCurrentUser}