import User from "../models/users.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";


export const getUser= async(req,res)=>{
    try{
        
;
        // console.log(req.cookies.ace);
        const loggedin=req.loggedin;
        const user = await User.find({_id:req.user._id});
        res.status(200).json({message:"user fetched successfully ",user,loggedin});
    }
    catch(error){
        console.log("Error: "+error);
        res.status(500).json(error);
    }
}


    export const createUser = async(req,res)=>{
        try {
            const { name,password,phone,email } = req.body;
            const user = await User.findOne({ $or: [{ email }, { phone }] });
            if(user){
                return res.status(400).json({message:"User already exists"})      
            }
            else{
                const hashPassword = await bcryptjs.hash(password,10);
                const CreatedUser= await User.create({
                    name : name,
                    phone : phone,
                    email : email,
                    password : hashPassword
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
            const { email ,password }=req.body;
            const user = await User.findOne({email});
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
            res.status(500).json({message: "Internal server error"});
        }
    }


   
    export const logoutUser =  (async(req,res)=>{
     return res.clearCookie('accessToken').json({message:"User updated sucessfully"});
            });
    

 

  