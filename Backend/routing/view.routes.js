import express from 'express';
import { OCR_RESULTS } from '../controller/Get-Data.controller.js';
import { AuthenticateUser } from '../middlewares/AuthenticatedUser.middleware.js';
const router = express.Router();

router.get('/ocr-result',AuthenticateUser,OCR_RESULTS)
export default router;