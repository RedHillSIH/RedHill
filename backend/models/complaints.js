import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    name: String,
    gender: String,
    age: Number,
    pnr: String,
    trainCode:String,
    trainName:String,
    trainDepartureDate: Date,
    media: [String],
    description: String,
    incidentDate: Date,
    incidentTime: String,
    complaintDate: Date,
    complaintTime: String,
    
});
export default mongoose.model('User', UserSchema);