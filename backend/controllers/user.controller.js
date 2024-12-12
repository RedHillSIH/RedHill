import User from "../models/users.js";
import employee from "../models/employee.js";
import Complaints from "../models/complaints.js"
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import complaints from "../models/complaints.js";
import trainData from "../models/trains.js";
import trainstatus from "../models/trainstatus.js";
import pnrData from "../models/pnrData.js";


export const getUser = async (req, res) => {
    try {
        const loggedin = req.loggedin;

        if (loggedin) {
            // User is logged in, fetch user details
            const user = await User.findOne({ _id: req.user._id });
            return res.status(200).json({
                message: "User fetched successfully",
                user,
                loggedin,
            });
        } else {
            // User is not logged in
            return res.status(200).json({ message: "Not logged in", loggedin });
        }
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ error: error.message });
    }
};



    export const createUser = async(req,res)=>{
        try {
            const { name,password,phone } = req.body;
            const user = await User.findOne({ phone });
            if(user){
                return res.status(400).json({message:"User already exists"})      
            }
            else{
                const hashPassword = await bcryptjs.hash(password,10);
                const CreatedUser= await User.create({
                    name : name,
                    phone : phone,
                    password : hashPassword,
                    complaintTickets:[]
                })
                const options = {
                    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
                     //only manipulate by server not by client/user
                     secure:false,
                     httpOnly:true
                };
                    const token = jwt.sign({_id: CreatedUser._id }, process.env.SECRET_KEY, {
                        expiresIn: "1d",
                    
                    });
                return res.cookie("acessToken", token,options).status(200).json({message:"User Registered sucessfully",CreatedUser})

            }
            
        } catch (error) {
            console.log("Error: " + error.message);
            res.status(500).json({message: "Internal server error"});
        }
    }


    export const loginUser = async(req,res)=>{
        try {
            // console.log(req.body);
            const { phone ,password }=req.body;
            
            const user = await User.findOne({phone});
            if(!user ){
                return res.status(400).json({message:"Invalid user credentials"})   
            }
            else{
                const isMatch = await bcryptjs.compare(password,user.password);
                if(isMatch){
                    const options = {
                        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
                         //only manipulate by server not by client/user
                         secure:false,
                         httpOnly:true
    
                    };
                        const token = jwt.sign({_id:user._id }, process.env.SECRET_KEY, {
                            expiresIn: "1d",
                        });
                    return res.cookie("acessToken", token,options).status(200).json({message:"User logged in sucessfully"
                }) 
                }
                else{
                    return res.json({message:"Wrong Password!"})
                }
            }
            }
        catch (error) {
            console.log("Error: " + error.message);
           return res.status(500).json({message: "Internal server error"});
        }
    }


   
    export const logoutUser = async (req, res) => {
        try {
            const loggedin = false;
            res.clearCookie('accessToken'); // Clear the cookie
            return res.status(200).json({ message: "User logged out successfully", loggedin }); // Send the response
        } catch (error) {
            console.error("Error during logout:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };

    export const getComplaints = async(req,res)=>{
        const loggedin=req.loggedin
        try {
            if(!loggedin){
                return res.status(200).json({ message: "Not logged in", loggedin });
            }
            const user = await User.findOne({ _id: req.user._id });
            let myComplaints=[]
            for (const ticket of user.complaintTickets){
                const temp = await Complaints.findOne({complaintId:ticket})
                myComplaints.push(temp)
            }
            
            return res.status(200).json({ message: "Succesfully Sent", loggedin, myComplaints });
            
        } catch (error) {
            
            return res.status(500).json({ message: "Internal Server Issue", loggedin });
        }
    }
    export const misc =async(req,res)=>{
        // const arr =[
        //     {
        //         train_code: "12980",
        //         train_name: "Shirdi-Mumbai CSMT Superfast Express",
        //         stations: [
        //             "SHE",
        //             "ST",
        //             "DAD",
        //             "BCT",
        //             "CSMT"
        //         ]
        //     },
        //     {
        //         train_code: "12981",
        //         train_name: "Mumbai LTT-Nagpur Superfast Express",
        //         stations: [
        //             "LTT",
        //             "CSMT",
        //             "NAG",
        //             "DUR",
        //             "PNR"
        //         ]
        //     },
        //     {
        //         train_code: "12982",
        //         train_name :"Bhopal-Mumbai CSMT Superfast Express",
        //         stations: [
        //             "BPL",
        //             "NDLS",
        //             "CSMT",
        //             "PNE",
        //             "BDTS"
        //         ]
        //     },
        //     {
        //         train_code: "12983",
        //         train_name: "Bhubaneshwar-Chennai Central Superfast Express",
        //         stations: [
        //             "BBN",
        //             "MAS",
        //             "YPR",
        //             "PUNE",
        //             "SBC"
        //         ]
        //     },
        //     {
        //         train_code: "12984",
        //         train_name: "Sagar-Mysuru Superfast Express",
        //         stations: [
        //             "SGR",
        //             "BZA",
        //             "SBC",
        //             "MYS",
        //             "BLR"
        //         ]
        //     },
        //     {
        //         train_code: "12985",
        //         train_name: "Indore-Mumbai Central Superfast Express",
        //         stations: [
        //             "INDB",
        //             "BPL",
        //             "MMR",
        //             "GRD",
        //             "BCT"
        //         ]
        //     },
        //     {
        //         train_code: "12986",
        //         train_name: "Bangalore City-Jammu Tawi Superfast Express",
        //         stations: [
        //             "SBC",
        //             "BLR",
        //             "MAS",
        //             "JAT",
        //             "PNR"
        //         ]
        //     }
        // ]
        // for(let poi of arr){
        //     await trainstatus.create(poi)
        // }
        const hashed =await bcryptjs.hash("password",10)
        await employee.deleteMany()

        let obj3={
                employeeId:"E001",
                name:"Ramesh Kumar",
                age:29,
                password:hashed,
                designation:"DEMO EMP 1" ,
                phone:"987456987",
                complaints:[]   
            }
            let obj4={
                employeeId:"E002",
                name:"Hemant Dubey",
                age:35,
                password:hashed,
                designation:"DEMO EMP 2" ,
                phone:"74554345667",
                complaints:[]   
            }
            let obj5={
                employeeId:"E003",
                name:"pankaj jha",
                age:32,
                password:hashed,
                designation:"DEMO EMP 3" ,
                phone:"83334464462",
                complaints:[]   
            }
            let obj6={
                employeeId:"E004",
                name:"Maneesh Meena",
                age:25,
                password:hashed,
                designation:"DEMO EMP 4" ,
                phone:"9087456987",
                complaints:[]   
            }
            let obj7={
                employeeId:"E005",
                name:"Rakesh Pandey",
                age:30,
                password:hashed,
                designation:"DEMO EMP 5" ,
                phone:"887456987",
                complaints:[]   
            }
        // const pdata=new employeeData(obj3)
        // await pdata.save()
        // const adata=new pnrData(obj)
        // adata.save()
        // const bdata= new trainData(obj2)
        // bdata.save()
        let dat=new employee(obj3)
        await dat.save()
        let dat1=new employee(obj4)
        await dat1.save()
        let dat2=new employee(obj5)
        await dat2.save()
        let dat3=new employee(obj6)
        await dat3.save()
        let dat4=new employee(obj7)
        await dat4.save()

        let re = await employee.find()
        res.status(200).json(re)
    }

    
    

 

  