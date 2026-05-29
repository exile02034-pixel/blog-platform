import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import  {PORT}  from './config/env.config.js';
import connectToDatabase from './config/mongodb.config.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { initSocket } from './utils/sockets.js';
import messageRouter from './routes/messageRoutes.js';
import authRouter from './routes/authRoutes.js';
import postRouter from './routes/postRoutes.js';
import commentRouter from './routes/commentRoutes.js';
const app = express();
const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:'http://localhost:5173',
        credentials:true
    }
})
initSocket(io)

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.set('io', io)
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/posts', postRouter)
app.use('/api/v1/comments', commentRouter)
app.use('/api/v1/message', messageRouter)


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));




server.listen(PORT, async()=>{
    connectToDatabase();
    console.log(`server running on PORT ${PORT}`);
})

export {io};


