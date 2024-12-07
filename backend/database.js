import mongoose from "mongoose";


export const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.database);
        console.log("DB connection established");
    } catch (error){
        console.log("Error while connecting to MongoDB",error);
    }
}