import express from 'express';
import { upload } from '../config/Multer.js';
import { ImageUpload } from '../controller/uplaod.counter.js';
const router = express.Router();

router.post('/food-image',upload.single("image"),ImageUpload);

export default router;