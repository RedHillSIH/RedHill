import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    password: String,
    name: String,
    complaintTickets:[String],
    isAdmin: { type: Boolean, default: false }
});

export default mongoose.model('User', UserSchema);
