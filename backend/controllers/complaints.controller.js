import User from "../models/users.js"
import Complaints from "../models/complaints.js"
import pnrData from "../models/pnrData.js"
import trainData from "../models/trains.js"
import employeeData from "../models/employee.js"
import putData from "../test.js"

let ticketid=1234567321

export const createComplaint= async (req, res) => {
    console.log(req.body)
    // putData()
    // return res.status(200)
    // return
    const {PNR,Phone,complaintMedia,complaintDesc}=req.body
    const loggedin=req.loggedin
    let user;
    if(loggedin){
        user = await User.findOne({_id:req.user._id});
        if(!user){
            res.status(500).json({message:"logged in user Not Found. Internal Servor Error"})
        }
    }
    else{
        user = await User.findOne({phone:Phone});
    }
    if(!user){
        user = await User.create({
            phone:Phone,
            password: "RANDOML15DIGITSTRING",
            name:"DATA FROM PNR",
            complaintTickets: []
        }) 
    }
   const dataFromPnr=await pnrData.findOne({pnrNumber:PNR})
   console.log(dataFromPnr)
    let newComplaint= new Complaints({
        complaintId:ticketid,
        phone: Phone,
        user_Id:user._id,
        name: dataFromPnr.passangers[0].name,
        gender: dataFromPnr.passangers[0].gender,
        age: dataFromPnr.passangers[0].age,
        pnr: PNR,
        trainCode:dataFromPnr.trainCode,
        trainName:dataFromPnr.trainName,
        trainDepartureDate: dataFromPnr.trainDepartureDate,
        media: complaintMedia,
        description: complaintDesc,
        category:"",
        subCategory:"",
        employeeWorking:"",
        resolved:0,
        severity:0
    })
    await newComplaint.save()
    console.log("donetop")
    let currentId=ticketid
    ticketid=ticketid+1
    user.complaintTickets.push(currentId)
    user.save()
    console.log("done2")
    let category=""
    let subCategory=""
    let severity=0
    //ML Model API
    category="ML WORK 1"
    subCategory="ML WORK 2"
    severity=2
    //
    if(category!=""){
        console.log("done1")
        let dataFromTrain=await trainData.findOne({$and:[
            {trainCode:dataFromPnr.trainCode},
            {trainDepartureDate:dataFromPnr.trainDepartureDate}
        ]})
        // let defa=await
        console.log(dataFromPnr)
        console.log(dataFromTrain)
        // return res.status(200)
        let employeeId=dataFromTrain[category][subCategory]
        await Complaints.findOneAndUpdate(
            { complaintId: currentId }, 
            { $set: { category: category,subCategory:subCategory,employeeWorking:employeeId,severity:severity } })
        console.log("done3")
        const emp=await employeeData.findOne({employeeId:employeeId})
        emp.complaints.push(currentId)
        emp.save()
        
        res.json({ message: 'Complaint Registered Succesfully'});
    }
    else {res.status(500).json({ message: 'Could not Register complaint,Complaint is saved but '});}
        
};