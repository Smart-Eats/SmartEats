import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import authRoutes from './routing/auth.routes.js';
import viewRoutes from './routing/view.routes.js';
import uploadRoutes from './routing/upload.routes.js';
import healthDataRoutes from './routing/HealthData.routes.js';
import barcodeRoutes from './routing/barcode.routes.js';
import './config/Passport.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse allowed origins from env
const allowedOrigins = process.env.CLIENT_URL.split(',');

// CORS setup
app.use(cors({
  origin: function (origin, callback) {
    // Allow no origin (like mobile apps, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Express settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(passport.initialize());

// EJS view engine (optional)
app.set('view engine', 'ejs');

// Routes
app.use('/auth/smarteats', authRoutes);
app.use('/upload/smarteats', uploadRoutes);
app.use('/barcode/smarteats', barcodeRoutes);
app.use('/healthData/smarteats', healthDataRoutes);
app.use('/data', viewRoutes);

// Export app (if used with a separate server.js or vercel setup)
export default app;
