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
import cors from 'cors';
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
import cors from 'cors';

// CORS setup
const allowedOrigins = [process.env.CLIENT_URL, "https://smart-eats-frontend.vercel.app"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

//! Set view Engine Uncomment If NEEDED
// app.set('view engine','ejs');
app.use('/auth/smarteats',authRoutes);
app.use('/upload/smarteats',uploadRoutes);
app.use('/barcode/smarteats',barcodeRoutes);
app.use('/healthData/smarteats',healthDataRoutes)
app.use('/data',viewRoutes);


export default app;

