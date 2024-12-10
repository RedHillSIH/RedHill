import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
    complaintId:Number,
    user_Id:String,
    phone: String,
    name: String,
    gender: String,
    age: Number,
    pnr: String,
    trainCode:String,
    trainName:String,
    trainDepartureDate: String,
    media: [String],
    description: String,
    category:String,
    subCategory:String,
    employeeWorking:String,
    resolved:Number,
    severity:Number
    
},{ timestamps: true });
export default mongoose.model('Complaints', complaintSchema);