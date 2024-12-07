import jwt from "jsonwebtoken";
import User from "../models/users.js";



const auth = async(req,res, next) => {
    try {
        
        const token = req.cookies.acessToken;
        // console.log(token);
        const isloggedin=false;

        if (!token) {
          return  res.send({message:"Not Logged In",isloggedin});
        }

        // const key = process.env.SECRET_KEY

        const isVerified = await jwt.verify(token, process.env.SECRET_KEY)
        //console.log(decodedToken);

        // console.log(isVerified);

        
        const user = await User.findOne({_id:isVerified._id }).select("-password")
    
        if (!user) {

            
            
            return res.status(401).json({message:"Not Logged In",isloggedin}) 
        }
       // console.log("yolo")
        req.user = user;
        req.loggedin=true;
        //req.user.id=user.id
       // console.log(req.user)
        next()

    } catch (error) {
      return  res.status(401).json(error.message)
    }
}

export default auth ;