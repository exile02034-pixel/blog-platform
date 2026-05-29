import mongoose from 'mongoose'
import { DB_URI } from './env.config.js'
const connectToDatabase = async ()=>{
    try{
        await mongoose.connect(DB_URI,{
            autoIndex:true,
        });
        console.log('Mongo Db Connected')
    }catch(error){
        console.error('MongoDb connection error', error.message)
        process.exit(1)
    }
};

export default connectToDatabase;