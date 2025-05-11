import express from "express";
import { AuthenticateUser } from "../middlewares/AuthenticatedUser.middleware.js";
import { BARCODE_SCANNING } from "../controller/barcode.controller.js";
import { upload } from "../config/Multer.js";

const router = express.Router();

router.post("/barcode-scanning", AuthenticateUser, upload.single("barcode") , BARCODE_SCANNING);

export default router;
