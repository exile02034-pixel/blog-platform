import Comment from '../models/commentModel.js'

export const createCommentService = async(userId, postId, content, commentedBy)=>{
    if(!userId || !postId){
        throw new Error("ID IS MISSING")
    }

    const comment = await Comment.create({
        postId,
        userId,
        commentedBy,
        content
    })

    return comment
}

export const getCommentService = async ({postId, page = 1, limit = 5})=>{
    const pageNumber = parseInt(page)
    const limitNumber = parseInt(limit)
    const skip = (pageNumber -1) * limitNumber
    if(!postId){
        throw new Error("Something went wrong")
    }


    const comments = await Comment.find({postId: postId})
    .sort({createdAt: -1})
    .skip(skip)
    .limit(limitNumber)

    const totalComments = await Comment.countDocuments({postId: postId})

    return {
        comments,
        pagination:{
            page: pageNumber,
            limit: limitNumber,
            totalComments,
            totalPages:  Math.ceil(totalComments / limitNumber)


        }
    }
}