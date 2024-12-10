import mongoose from 'mongoose';

const trainSchema = new mongoose.Schema({
    trainCode:String,
    trainDepartureDate: Date,
    "ML WORK 1":Object
});
export default mongoose.model('trainData', trainSchema);