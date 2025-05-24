import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routing/auth.routes.js';
import viewRoutes from './routing/view.routes.js';
import passport from 'passport';
import './config/Passport.js';
import cors from 'cors';
import uploadRoutes from './routing/upload.routes.js';
import healthDataRoutes from './routing/HealthData.routes.js'
import barcodeRoutes from './routing/barcode.routes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine','ejs')

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(passport.initialize());
const allowedOrigins = process.env.CLIENT_URL ? process.env.CLIENT_URL.split(",") : [];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser requests like Postman
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

//! Set view Engine Uncomment If NEEDED
// app.set('view engine','ejs');

app.use('/auth/smarteats',authRoutes);
app.use('/upload/smarteats',uploadRoutes);
app.use('/barcode/smarteats',barcodeRoutes);
app.use('/healthData/smarteats',healthDataRoutes)
app.use('/data',viewRoutes);


export default app;

