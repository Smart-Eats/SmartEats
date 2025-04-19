import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
export const AuthenticateUser = (req, res, next) => {
  const token = req.cookies.token;
 try {
    if (!token) {
        return res
          .status(401)
          .json({
            success: false,
            message: "You need to login to Access this route",
          });
      }
      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decode;
      // ! This is very imp when i logout and click on back button in brower it again reopen profile page which is wrong so i use this so when i click on back button i will remain in login page 
      res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
      next();
 } catch (error) {
    console.log("Error",error.message);
    res.status(500).json({
        success:false,
        message:"Authentication User Error"
    });
 }
};
