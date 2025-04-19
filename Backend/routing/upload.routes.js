import express from 'express';
import { upload } from '../config/Multer.js';
import { ImageUpload } from '../controller/uplaod.controller.js';
import { AuthenticateUser } from '../middlewares/AuthenticatedUser.middleware.js';
const router = express.Router();

router.post('/food-image',AuthenticateUser,upload.single("image"),ImageUpload);

export default router;