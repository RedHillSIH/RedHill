import express from "express";
// import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
const app = express();
import authenticateRoute from './routes/authenticate.js';

app.use(express.json());
app.use('/api/auth', authenticateRoute);
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));