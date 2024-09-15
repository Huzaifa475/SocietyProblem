import {v2 as cloudinary} from "cloudinary";
import fs from "node:fs";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRECT
})

const uploadOnCloudinary = async(localFilePath) => {
    try {
        if(!localFilePath) return null

        const response = await cloudinary.uploader.upload(localFilePath, {resource_type: "auto"});

        fs.unlinkSync(localFilePath);
        return response;

    } catch (error) {
        
        fs.unlinkSync(localFilePath);
        return null;

    }
}

export {uploadOnCloudinary}