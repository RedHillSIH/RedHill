import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    employeeId:String,
    name:String,
    age:Number,
    designation:String ,
    phone:String,
    complaints:[Number]   
});
export default mongoose.model('employeeData', employeeSchema);