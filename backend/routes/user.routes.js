import express from 'express';
const router = express.Router();
import dotenv from 'dotenv';
import { createUser, getUser, loginUser } from '../controllers/user.controller.js';
import auth from '../middlewares/auth.js';
dotenv.config()

router.post('/createUser',createUser);
router.post('/login',loginUser );
router.get('/user',auth,getUser);

export default router;
