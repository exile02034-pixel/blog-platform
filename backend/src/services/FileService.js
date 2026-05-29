import { uploadProfileCloudinary } from "../utils/uploadFile.js";
import User from "../models/userModel.js";

export const uploadProfilePictureService = async(userId, filePath)=>{
    if(!userId || !filePath){
        throw new Error("UserId and filePath are required");
    }

    const uploadResult = await uploadProfileCloudinary(filePath);

    if(!uploadResult || !uploadResult.secure_url){
        throw new Error("Failed to upload profile picture");
    }
    const profilePicture = uploadResult.secure_url;
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {profilePicture},
        {new: true}
    );

    if(!updatedUser){
        throw new Error("Failed to update user profile picture");
    }
    return updatedUser;

}