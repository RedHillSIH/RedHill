import express from 'express';
const router = express.Router();
import dotenv from 'dotenv';
import { createComplaint,updateComplaint } from '../controllers/complaints.controller.js';
import auth from '../middlewares/auth.js';
dotenv.config()

router.post('/create',createComplaint);
router.put('/update',auth,updateComplaint);
// router.patch('/updateDataset',createComplaint);
// router.delete('/delete',createComplaint)


export default router;
