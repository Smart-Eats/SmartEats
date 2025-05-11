import express from "express";
import { AuthenticateUser } from "../middlewares/AuthenticatedUser.middleware.js";
import { BARCODE_SCANNING } from "../controller/barcode.controller.js";


const router = express.Router();

router.post("/barcode-scanning", AuthenticateUser , BARCODE_SCANNING);

export default router;
