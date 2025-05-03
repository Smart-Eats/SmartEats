import express from 'express';
import { AuthenticateUser } from '../middlewares/AuthenticatedUser.middleware.js';
import { AnalyzeResult, HealthDataForm } from '../controller/healthdata.controller.js';
const router = express.Router();

router.post('/user-data',AuthenticateUser,HealthDataForm);
router.post('/analyze-result',AuthenticateUser,AnalyzeResult);

export default router;