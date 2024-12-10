import express from "express";
// import { MongoClient, ServerApiVersion } from 'mongodb';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import UserRoutes from './routes/user.routes.js';
import ComplaintRoutes from './routes/user.routes.js';
import { connectDB } from "./database.js";
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use('/user', UserRoutes);
app.use('/comp', ComplaintRoutes);



const PORT = 3000;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});