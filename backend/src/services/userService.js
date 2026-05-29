import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/generateToken.js';

export const signUpUserService = async(fullName, userName, password)=>{

    if(!fullName || !userName || !password){
        throw new Error("Complete all fields")
    }

    const userExist = await User.findOne({userName})
    if(userExist){
        throw new Error("Username already exists")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({fullName, userName, password: hashedPassword});

    return user
}

export const signInUserService = async(userName, password)=>{

    if(!userName || !password){
        throw new Error("Fill up all the fields")
    }

    const userExist = await User.findOne({userName})
    if(!userExist){
        throw new Error("UserName doesn't exist")
    }

    const isMatch = await bcrypt.compare(password, userExist.password);
    if(!isMatch){
        throw new Error("Invalid credentials")
    }

    const token = generateToken(userExist._id);
    return {
        user:{
            name:userExist.fullName,
            userName:userExist.userName
        },
        token
    }

}