import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
    complaintId:Number,
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    name: String,
    gender: String,
    age: Number,
    pnr: String,
    trainCode:String,
    trainName:String,
    trainDepartureDate: String,
    media: [String],
    description: String,
    incidentDate: Date,
    incidentTime: String,
    complaintDate: String,
    complaintTime: String,
    category:String,
    subCategory:String,
    employeeWorking:String,
    resolved:Number,
    severity:Number
    
});
export default mongoose.model('Complaints', complaintSchema);