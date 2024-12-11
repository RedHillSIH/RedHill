import express from 'express';
const router = express.Router();
import dotenv from 'dotenv';
import { createUser, getUser, loginUser, logoutUser } from '../controllers/user.controller.js';
import { createComplaint } from '../controllers/complaints.controller.js';
import auth from '../middlewares/auth.js';
dotenv.config()

router.post('/createUser',createUser);
router.post('/login',loginUser );
router.get('/get',auth,getUser);
router.get('/logout',logoutUser);

router.post('/createComplaint',createComplaint);


export default router;
