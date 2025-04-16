import express from "express";
import { Login, Logout, Signup , verifyOTP} from "../controller/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { LoginSchema, RegisterSchema } from "../validation/user.validation.js";
import passport from "passport";
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
    res.send("google me apka swagt h");
  }
);
// NORMAL AUTH ROUTES
router.post("/signup", validate(RegisterSchema), Signup);
router.post("/login", validate(LoginSchema), Login);
router.post("/verify-otp", verifyOTP);
router.get("/logout", Logout);

export default router;
