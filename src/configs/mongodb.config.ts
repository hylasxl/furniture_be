import mongoose from "mongoose";
import "dotenv/config"

const MONGOOSE_URI: string = String(process.env.MONGODB_DATABASE_CONNECTION_STRING)

export const connectDatabase = async () => {
    
    await mongoose.connect(MONGOOSE_URI)
        .then(() => {
            console.log("Database connect successfully")
        })
        .catch((err) => {
            console.error('Database connection error:', err);
        })
}   