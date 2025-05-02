import express from 'express';
import { AuthenticateUser } from '../middlewares/AuthenticatedUser.middleware.js';
import { HealthDataForm } from '../controller/healthdata.controller.js';
const router = express.Router();

router.post('/user-data',AuthenticateUser,HealthDataForm);

export default router;