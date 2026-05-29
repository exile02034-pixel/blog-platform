import { createMessageService, getMessageService } from "../services/messageService.js";

export const sendMessage = async(req, res)=>{
    try{
        const {text} = req.body
        const {id:receiverId} = req.params
        const senderId = req.user._id

        const message = await createMessageService({senderId: senderId, receiverId : receiverId, text: text});


        return res.status(201).json({
            success: true,
            message,
    })
   }catch(error){
    return res.status(400).json(error.message)
   }
}

export const getMessageList= async (req, res)=>{
    try{
        const receiverId = req.user._id
        
        const messagesList = await getMessageService({receiverId:receiverId})

        return res.status(200).json({
            success:true,
            messagesList
        })
    }catch(error){
    return res.status(400).json(error.message)
   }
}

export const getMessage = async(req,res)=>{
    try{
        const userId = req.user._id
        const {id:receiverId} = req.params

        const messages = await getMessageService({senderId:userId, receiverId:receiverId})

        return res.status(200).json({
            success:true,
            messages
        })

    }catch(error){
    return res.status(400).json(error.message)
   }
}
    
