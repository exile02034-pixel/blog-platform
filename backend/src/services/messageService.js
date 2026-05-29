import Message from '../models/messageModel.js'



export const createMessageService = async({senderId, receiverId, text})=>{
    if(!senderId && !receiverId && !text){
        throw new Error("Incomplete fields")
    }


    const message = await Message.create({
        senderId,
        receiverId,
        text
    })

    if(!message){
        throw new Error("Unable to send a message")
    }
    return message
}

export const getMessageListService = async({senderId})=>{
    if(!senderId){
        throw new Error("Id doesnt exist")
    }
    const messagesList = await Message.find({
        senderId:senderId
    }).sort({createdAt: -1})
    .select("-createdAt -updatedAt")
    .populate("receiverId", "fullName userName profilePicture")

    if(!messagesList.length){
        throw new Error("No messages for now")
    }
    return messagesList
}

export const getMessageService = async({senderId, receiverId})=>{
    if(!senderId && !receiverId){
        throw new Error('Missing field')
    }
    

    const messages = await Message.find({
        $or:[
            {senderId, receiverId},
            {senderId:receiverId, receiverId:senderId}
        ]
    }).sort({createdAt: -1})
    .select('-createdAt -updatedAt')

    //todo realtime

    if(!messages.length){
        throw new Error("No conversation found")
    }
    console.log(messages)
    return messages
}