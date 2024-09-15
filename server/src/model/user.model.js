import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
    },
    societyName: {
        type: String
    },
    admin: {
        type: Boolean
    },
    address: {
        type: String
    },
    photo: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    refreshToken: {
        type: String
    }
}, {timestamps: true})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isValidPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            _username: this._username,
            _societyName: this._societyName
        },
        process.env.ACCESS_TOKEN_SECRECT,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            _username: this._username,
            _societyName: this._username
        },
        process.env.REFRESH_TOKEN_SECRECT,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)