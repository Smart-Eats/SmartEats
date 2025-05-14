import express from 'express';
import { OCR_RESULTS , BMI_USER_DATA , USER_PROFILE_DETAIL} from '../controller/Get-Data.controller.js';
import { AuthenticateUser } from '../middlewares/AuthenticatedUser.middleware.js';
const router = express.Router();

router.get('/ocr-result',AuthenticateUser,OCR_RESULTS);
router.get('/bmi-user-data',AuthenticateUser,BMI_USER_DATA);
router.get('/user-profile-data',AuthenticateUser,USER_PROFILE_DETAIL);

// router.get('/health-data',AuthenticateUser,HEALTH_RESULTS);
export default router;