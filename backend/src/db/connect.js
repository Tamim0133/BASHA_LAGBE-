import mongoose from "mongoose";
import {MONGO_CONNECTION_STRING} from '../utils/constant.js'

const DB_NAME = "tolet"
const connectDB = async () => {
    
    try {
        const connectionInstance = await mongoose.connect(`${MONGO_CONNECTION_STRING}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB