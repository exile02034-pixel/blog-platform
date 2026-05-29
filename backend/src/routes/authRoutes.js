import {Router} from 'express'
import { signUpUser, signInUser, signOut, getMe, uploadProfilePicture } from '../controller/authController.js';
import { protect } from '../middleware/auth.middleware.js';
import upload from '../middleware/multer.js';
const authRouter = Router();


authRouter.post('/signup', signUpUser);
authRouter.post('/signin', signInUser);
authRouter.post('/signout', signOut);
authRouter.get('/me', protect, getMe )
authRouter.post('/me/upload-pfp', protect, upload.single('file'), uploadProfilePicture )

export default authRouter;