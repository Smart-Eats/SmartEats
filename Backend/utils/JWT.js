import jwt from "jsonwebtoken";

export const Token = (USER) => {
    return jwt.sign(
        {
          id: USER._id,
          email: USER.email,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      ); 
}