import { uploadProfilePictureService } from "../services/FileService.js";
import { signInUserService, signUpUserService } from "../services/userService.js";
export const signUpUser = async (req, res)=>{
    try{
        const {fullName, userName, password} = req.body

        const result = await signUpUserService(fullName, userName, password)

        return res.status(201).json({
            success:true,
            data:{
                id:result._id,
                fullName: result.fullName,
                userName: result.userName,
                
            }
        })
        
    }catch (err) {
    console.error(err);
    res.status(400).json({
      message: err.message,
    });
  }

}

export const signInUser = async(req, res)=>{
    try{
        const {userName, password} = req.body;
        const {user, token} = await signInUserService(userName,password)

       res.cookie('jwt', token,{
        httpOnly:true,
        secure:process.env.NODE_ENV ==='production',
        sameSite:"strict",
          maxAge:
        parseInt(process.env.JWT_COOKIE_EXPIRES_IN) *
        24 *
        60 *
        60 *
        1000,
       });


        return res.status(201).json({
            sucess:true,
            data:{
                name:user.name,
                userName:user.userName
            }
        }
        )

    }catch (err) {
    console.error(err);
    res.status(400).json({
      message: err.message,
    });
  }
}

export const getMe = async(req, res)=>{
    try{
        res.status(200).json({
            sucess:true,
            user:req.user
        })
    }catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export const signOut = async (req, res)=>{
    try{
        res.cookie('jwt', '',{
            httpOnly:true,
            expires:new Date(0)
        })

        res.status(201).json({
            sucess:true,
            message:"User logged out"
        })
    }catch (err) {
    console.error(err);
    res.status(400).json({
      message: err.message,
    });
  }
}

export const uploadProfilePicture = async(req, res)=>{
    try{
        const userId = req.user._id;
        const filePath = req.file.path;
        const updatedUser = await uploadProfilePictureService(userId, filePath);
        if(!updatedUser){
            throw new Error("Failed to upload profile picture");
        }
        return res.status(200).json({
          success: true,
          data: {
            userId: updatedUser._id,
            profilePicture: updatedUser.profilePicture,
            name: updatedUser.fullName,
          },
        })
    }catch (err) {
          console.error(err);
    res.status(400).json({
      message: err.message,
    });
    }
  }