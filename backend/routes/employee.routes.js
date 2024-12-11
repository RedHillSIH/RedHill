import express from 'express';
const router = express.Router();
import dotenv from 'dotenv';
import { getEmp,loginEmp,logoutEmp,getComplaints} from '../controllers/employee.controller.js';
import empAuth from '../middlewares/empAuth.js';
import { get } from 'mongoose';
dotenv.config()

router.post('/log',loginEmp);
router.post('/logout',logoutEmp);
router.get('/complaints',empAuth,getComplaints);
router.get('/get',empAuth,getEmp);


export default router;
