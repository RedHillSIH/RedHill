import mongoose from 'mongoose';

const pnrSchema = new mongoose.Schema({
    pnrNumber: String,
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    trainCode:String,
    trainName:String,
    trainDepartureDate: Date,
    trainDepartureTimings: Date,
    passangers: [Object],
    bookingDate: Date,
    bookingTime: String
    
});
export default mongoose.model('pnrData', pnrSchema);