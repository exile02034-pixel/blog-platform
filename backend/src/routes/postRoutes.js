import { Router } from "express";
import { createPost, deletePostById, editPost, getAllPost, getMyPost,getPost } from "../controller/postController.js";
import { protect } from "../middleware/auth.middleware.js";
const postRouter = Router();

postRouter.post('/', protect, createPost)
postRouter.get('/me', protect, getMyPost)
postRouter.get('/', getAllPost)
postRouter.get('/me/:id' , protect , getPost)
postRouter.put('/me/:id' , protect , editPost)
postRouter.delete('/me/:id', protect, deletePostById)



export default postRouter
