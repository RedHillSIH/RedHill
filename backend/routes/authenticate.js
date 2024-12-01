import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
import User from "../models/users.js"
import dotenv from 'dotenv';
dotenv.config()

router.post('/createUser', async (req, res) => {
    const { name,password,phone,email } = req.body;
    const user = await User.findOne({
        $or: [
            { phone:phone },
            { email: email }
        ]
    });
    if (user) {
        return res.status(401).json({ message: 'user with same email or phone number or email id is already there ' });
    }
    let demo = new User({
        email:email,
        phone:phone,
        password: password,
        name:name,
        complaintTickets: []
    })
    await demo.save();

    const token = jwt.sign(
        { id: user._id, name: user.name, email: user.email , phone:user.phone },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    res.cookie('token', token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600000,
    });
    res.json({ message: 'Account Succesfully Created', user: { id: user._id, name: user.name, email: user.email , phone:user.phone } });

});
router.post('/login', async (req, res) => {
    const { userId, password } = req.body;
    const user = await User.findOne({
        $or: [
            { phone: userId },
            { email: userId }
        ]
    });
    
    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
        { id: user._id, name: user.name, email: user.email , phone:user.phone },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    res.cookie('token', token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600000,
    });
    res.json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email , phone:user.phone } });
});

export default router;
