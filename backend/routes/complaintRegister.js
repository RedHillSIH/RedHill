import express from 'express';
const router = express.Router();

import User from "../models/users.js"
import Complaints from "../models/complaints.js"
import pnrData from "../models/pnrData.js"
import trainData from "../models/trains.js"
import employeeData from "../models/employee.js"
import dotenv from 'dotenv'; 

dotenv.config()
let ticketid=1234567321


router.post('/registerComplaint', async (req, res) => {
    const {email,PNR,UTS,Phone,complaintMedia,complaintDesc,incidentDate,incidentTime,complaintDate,complaintTime}=req.body()
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
    dataFromPnr=await pnrData.findOne({pnrNumber:PNR})
    

    let newComplaint= new Complaints({
        complaintId:ticketid,
        email: email,
        phone: Phone,
        name: dataFromPnr.passanger[0].name,
        gender: dataFromPnr.passanger[0].gendert,
        age: dataFromPnr.passanger[0].age,
        pnr: PNR,
        trainCode:dataFromPnr.trainCode,
        trainName:dataFromPnr.trainName,
        trainDepartureDate: dataFromPnr.trainDepartureDate,
        media: complaintMedia,
        description: complaintDesc,
        incidentDate: incidentDate,
        incidentTime: incidentTime,
        complaintDate: complaintDate,
        complaintTime: complaintTime,
        category:"",
        subCategory:"",
        employeeWorking:"",
        resolved:0,
        severity:0
    })
    let currentId=ticketid
    ticketid=ticketid+1
    user.complaintTickets.push(currentId)
    user.save()
    await newComplaint.save()
    let category=""
    let subCategory=""
    let severity=0
    //ML Model API
    category="ML WORK1"
    subCategory="ML WORK2"
    severity=2
    //
    if(category!=""){
        let dataFromTrain=await trainData.findOne({$and:[
            {trainCode:dataFromPnr.trainCode},
            {trainDepartureDate:dataFromPnr.trainDepartureDate}
        ]})
        let employeeId=dataFromTrain[category][subCategory]
        await Complaints.findOneAndUpdate(
            { complaintId: currentId }, 
            { $set: { category: category,subCategory:subCategory,employeeWorking:employeeId,severity:severity } })
        emp=await employeeData.findOne({employeeId:employeeId})
        emp.Complaints.push(complaintId)
        emp.save()
        
        res.json({ message: 'Complaint Registered Succesfully'});
    }
    else {res.json({ message: 'Could not Register complaint'});}
        


});