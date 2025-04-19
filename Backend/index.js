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
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine','ejs')

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(passport.initialize());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, // agar cookies ya auth bhej rahe ho
  }));
//! Set view Engine Uncomment If NEEDED
// app.set('view engine','ejs');

app.use('/auth/smarteats',authRoutes);
app.use('/upload/smarteats',uploadRoutes);
app.use('/data',viewRoutes);


export default app;

