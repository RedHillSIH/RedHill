import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
import User from "../models/users.js"
import dotenv from 'dotenv';
dotenv.config()

router.post('/registerComplaint', async (req, res) => {
    const {isUser,email,PNR,UTS,Phone,complaintImg,complaintDesc,incidentDate,complaintDate}=req.body()
    // fetch train code,train name,date of travel,passangerName,Age,Gender,
    // pnrDate=
    const user = await User.findOne({
        $or: [
            { phone: Phone },
            { email: email }
        ]
    });
    if(!user){
        let demo = new User({
            email:email,
            phone:Phone,
            password: "RANDOML15DIGITSTRING",
            name:"DATA FROM PNR",
            complaintTickets: []
        })
        await demo.save();    
    }
    //ML Model API

    //
});