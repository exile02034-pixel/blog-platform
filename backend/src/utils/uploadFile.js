import cloudinary from "../config/cloudinary.js";

export const uploadProfileCloudinary = async(filepath, options = {}) => { 
    try {
        const result = await cloudinary.uploader.upload(filepath,options)
        return result;
    } catch (error) {
        throw new Error('Cloudinary upload failed', error.message);
    }
}

