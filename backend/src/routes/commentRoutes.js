import { Router } from "express";

import { createComment, getComments } from "../controller/commentController.js";
import { protect } from "../middleware/auth.middleware.js";
const commentRouter = Router();

commentRouter.post('/post/:postId', protect, createComment);
commentRouter.get('/post/:postId', protect, getComments)



export default commentRouter