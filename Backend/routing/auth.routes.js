import express from "express";
import { Login, Logout, Signup , verifyOTP} from "../controller/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { LoginSchema, RegisterSchema } from "../validation/user.validation.js";
import passport from "passport";
import dotenv from 'dotenv'
dotenv.config();
const router = express.Router();

// GOOGLE ROUTES
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login",session:false }),
  (req, res) => {
    res.cookie("token",req.user.token,{
        httpOnly:true,
        maxAge:24*60*60*1000 // 1 day 
    })
    res.redirect(`${process.env.CLIENT_URL}/layout/home`)
  }
);
// NORMAL AUTH ROUTES
router.post("/signup", validate(RegisterSchema), Signup);
router.post("/login", validate(LoginSchema), Login);
router.post("/verify-otp", verifyOTP);
router.get("/logout", Logout);

export default router;
