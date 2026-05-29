import { createCommentService, getCommentService } from "../services/commentService.js";

export const createComment = async(req, res)=>{
    try{
        const {content} = req.body
        const userId = req.user._id
        const {postId} = req.params
        const commentedBy = req.user.fullName

        const result = await createCommentService(userId, postId,content, commentedBy)

        return res.status(201).json(result)

    }catch (err) {
    console.error(err);
    res.status(400).json({
      message: err.message,
    });
  }
}

export const getComments = async(req, res)=>{
    try{
        const {postId} = req.params
        const{page, limit} = req.query

        const result = await getCommentService({postId, page, limit})

        return res.status(200).json(result)
    }catch (err) {
    console.error(err);
    res.status(400).json({
      message: err.message,
    });
  }
}