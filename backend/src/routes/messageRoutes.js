import { Router } from "express";
import { getMessage, sendMessage } from "../controller/messageController.js";
import { protect } from "../middleware/auth.middleware.js";

const messageRouter = Router()

messageRouter.post('/:id', protect, sendMessage)
messageRouter.get('/:id', protect, getMessage)


export default messageRouter;