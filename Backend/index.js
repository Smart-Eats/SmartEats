import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routing/auth.routes.js';
import viewRoutes from './routing/view.routes.js';
import passport from 'passport';
import './config/Passport.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine','ejs')

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(passport.initialize());
//! Set view Engine Uncomment If NEEDED
// app.set('view engine','ejs');

app.use('/auth/smarteats',authRoutes);
app.use('/',viewRoutes);


export default app;

