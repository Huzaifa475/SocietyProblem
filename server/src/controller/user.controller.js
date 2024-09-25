import {apiResponse} from "../util/apiResponse.js"
import {apiError} from "../util/apiError.js"
import {asyncHandler} from "../util/asyncHandler.js"
import {User} from "../model/user.model.js"
import { Society } from "../model/society.model.js"
import {uploadOnCloudinary} from "../util/uploadOnCloudinary.js"
import { isValidObjectId } from "mongoose"

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

    const loggedInUser = await User.findById(existedUser?._id).select("-password -refreshToken")

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

    if(phone === undefined || !societyName || admin === undefined || !address){
        throw new apiError(400, "All fields are required")
    }

    let society = await Society.findOne({$or: [{name: societyName}]});

    if(society?.admin && admin){
        throw new apiError(402, "Society already have admin")
    }

    if(admin && !society){
        society = await Society.create({
            name: societyName,
            admin: req.user?._id,
            members: [req.user?._id]
        })
    }

    if(society){
        if(!society.members.includes(req.user?._id)){
            society.members.push(req.user?._id);
            await society.save({validateBeforeSave: false});
        }
    }
    else{
        throw new apiError(400, "Society does not exists or member already exists")
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
    ).select("-password -refreshToken")

    if(!user){
        throw new apiError(402, "Invalid request")
    }

    return res
    .status(200)
    .json(new apiResponse(200, {user, society}, "User information updated successfully"))
})

const updateUser = asyncHandler(async(req, res) => {

    const {name, email, phone, societyName, address} = req.body;

    const updateFields = {} 

    if(name) updateFields.name = name
    if(email) updateFields.email = email
    if(phone) updateFields.phone = phone

    if(societyName && !req.user?.admin) {
        
        await Society.findOneAndUpdate(
            {$or: [{name: req.user?.societyName}]},
            {
                $pull: {members: req.user?._id}
            }
        )

        const society = await Society.findOneAndUpdate(
            {$or: [{name: societyName}]},
            {
                $addToSet: {members: req.user?._id}
            }
        )

        if(!society){
            throw new apiError(404, "Society does not exists")
        }
        
        updateFields.societyName = societyName
    }
    else if (societyName && req.user?.admin){
        throw new apiError(404, "Admin cannot change its society")
    }

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

const uploadPhotoUser = asyncHandler(async(req, res) => {

    const photoPath = req.file?.path 

    if(!photoPath){
        throw new apiError(400, "Photo is not provided")
    }

    const photo = await uploadOnCloudinary(photoPath)

    if(!photo){
        throw new apiError(500, "Something went wrong will uploading the photo")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            photo: photo.url
        },
        {
            new: true
        }
    ).select("-password -refreshToken")

    return res
    .status(200)
    .json(new apiResponse(200, user, "Photo uploaded successfully"))
})

const changeAdmin = asyncHandler(async(req, res) => {

    const {userId} = req.body;

    if(!isValidObjectId(userId)){
        throw new apiError(402, "Invalid user id")
    }

    if(!req.user?.admin){
        throw new apiError(404, "Invalid access")
    }

    const currentAdmin = await User.findByIdAndUpdate(
        req.user?._id,
        {admin: false},
        {new: true}
    )

    if(!currentAdmin){
        throw new apiError(402, "Current admin does not exists")
    }

    const newAdmin = await User.findByIdAndUpdate(
        userId,
        {admin: true},
        {new: true}
    )

    if(!newAdmin){
        throw new apiError(402, "New admin does not exists")
    }

    const society = await Society.findOneAndUpdate(
        {name: req.user?.societyName},
        {admin: userId},
        {new : true}
    )

    if(!society){
        throw new apiError(402, "Society does not exists")
    }

    return res
    .status(200)
    .json(new apiResponse(200, {currentAdmin, newAdmin, society},"Admin changed successfully"));
})

const getPhoto = asyncHandler(async(req, res) => {

    const user = await User.findById(
        req.user?._id
    )

    if(!user){
        throw new apiError("User does not exists")
    }

    const photoUrl = user?.photo

    return res
    .status(200)
    .json(new apiResponse(200, photoUrl, "Photo fetch successfully"))
})

export {registerUser, loginUser, logoutUser, informationUser, updateUser, getCurrentUser, uploadPhotoUser, changeAdmin, getPhoto}