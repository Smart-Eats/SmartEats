import bcrypt from "bcrypt";
import { user } from "../model/user.model.js";
import { Token } from "../utils/JWT.js";
import generateOTP from "../utils/OTP_Generator.js";
import { sendMail } from "../utils/Mailer.js";
import { PendingUser } from "../model/pendingUser.model.js";

export const Signup = async (req, res) => {
  const { name, email, password } = req.validate;
  try {
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    };
    const existingPendingUser = await PendingUser.findOne({email});
    if(existingPendingUser)
    {
      return res.status(400).json({
        success:false,
        message:"Please Verify Your Email First",
      });
    };
    
    // ! I have write the resposne code above because , as i user clikc on signup it will directlt redirect to otp verification page and the other process like generate otp and sending email will done after that , if i put this response at the end then the it takes some time to generate otp and sending email till then user will stucck on the signup page , which will give bad user experience , and if out of frustration user click on signup many times it will gives error.
    res.status(200).json({
      success: true,
      message: "Signup successful. Please verify OTP sent to email.",
      // user: { ...PENDING_USER._doc, password: undefined },
    });

    const hash = await bcrypt.hash(password, 10);
    const otp = generateOTP();

    console.log("Sending email to:", email);
    
    await sendMail({
      to: email,
      subject: "Smart Eats OTP Verification",
      html: `<div style="font-family:Arial,sans-serif;font-size:16px;">
      <p>Hello 👋,</p>
      <p>Your OTP for verifying your email is:</p>
      <h2 style="color:#4F46E5;">${otp}</h2>
      <p>This OTP will expire in 5 minutes.</p>
      <p>Regards,<br/>SmartEats Team</p>
    </div>`,
    });
    await PendingUser.create({
      name,   
      email,
      password: hash,
      otp,
    });
   
  } catch (error) {
    console.error("Error:", error.message); 
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.validate;

  try {
    const USER = await user.findOne({ email });
    if (!USER) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password" });
    }
    const isMatch = await bcrypt.compare(password, USER.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password" });
    }
    const token = Token(USER);
    res.cookie("token", token);
    res.status(200).json({
      success: true,
      message: "User LogedIn successfully",
      token,
      user: { ...USER._doc, password: undefined },
    });
  } catch (error) {
    console.log("Error", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const Logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "User Logout successfully",
  });
};

export const verifyOTP = async (req, res) => {
  const { otp } = req.body;
  try {
    const PENDING_USER = await PendingUser.findOne({ otp });
    if (!PENDING_USER) {
      return res.status(400).json({ success: false, message: "Invalid or Expired OTP" });
    }
    if(PENDING_USER.expiresAt < new Date())
    {
      await PendingUser.deleteOne({_id:PENDING_USER._id});
      return res.status(400).json({ success: false, message: "OTP Expired"});
    }
    const {name,email,password} = PENDING_USER;
    const USER = await user.create({
      name,
      email,
      password,
      isVerified:true,
    })
    await USER.save();
    await PendingUser.deleteOne({ _id: PENDING_USER._id });
    const token = Token(USER);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // This token is valid upto one day
    });
    res.status(200).json({
      success:true,
      message: "Email verified successfully",
      user:{...USER._doc,password:undefined}
    });
  }catch (error) {
    res.status(500).json({ success:false,
      message: "Error verifying OTP",
      error:error.message
     });
  }
};
