import User from "../models/users.js";
import Complaints from "../models/complaints.js"
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";


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
    
    

 

  