import bcrypt from "bcrypt";
import { user } from "../model/user.model.js";
import { Token } from "../utils/JWT.js";

export const Signup = async (req, res) => {
  const { name, email, password } = req.validate;
  try {
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
     
    }
    const hash = await bcrypt.hash(password, 10);
    const USER = await user.create({
      name,
      email,
      password: hash,
    });
    const token = Token(USER);
    res.cookie("token", token);
    res.status(200).json({
      success: true,
      message: "User Created Successfuly",
      user: { ...USER._doc, password: undefined },
    });
  } catch (error) {
    console.error("Error:", error.message); // for debugging
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const Login = async (req,res) => {
    const{email,password} = req.validateData;
   
    try {
        const USER = await user.findOne({email});
        if(!USER)
        {
            return res.status(400).json({success:false,message:"Invalid Email or Password"});
        }
        const isMatch = await bcrypt.compare(password, USER.password);
        if(!isMatch)
        {
            return res.status(400).json({success:false,message:"Invalid Email or Password"});
        }
        const token = Token(USER);
        res.cookie("token",token);
        res.status(200).json({
            success: true,
            message: "User LogedIn successfully",
            user: { ...USER._doc, password: undefined },
          });
    } catch (error) {
        console.log("Error",error.message);
        res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.messsage
        });
    }
};

export const Logout = (req,res) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "User Logout successfully",
      });
};
