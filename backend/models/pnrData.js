import mongoose from 'mongoose';

const pnrSchema = new mongoose.Schema({
    pnrNumber: String,
    trainCode:String,
    trainName:String,
    trainDepartureDate: Date,
    passangers: [Object]    
});
export default mongoose.model('pnrData', pnrSchema);