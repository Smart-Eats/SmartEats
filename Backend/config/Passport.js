import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { user } from "../model/user.model.js";
import { Token } from "../utils/JWT.js";
import dotenv from 'dotenv';
dotenv.config();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // ! all data is in profile._json like email name image
        const { name, email, picture } = profile._json;
        let USER = await user.findOne({ email });
        if (!USER) {
          USER = await user.create({
            name,
            email,
            image: picture,
            isOAuth: true,
            password:"GoogleBaba"
          });
          console.log("New User Created Successfully");
        } else {
          console.log("Existing User LogedIn");
        }
        const token = Token(USER);

        // !Spreading User data and token in the data
        // * USER._doc extract all user data

        return done(null, { ...USER._doc, token });
      } catch (error) {
        console.log("Error", error.message);
        return done(error, null);
      }
    }
  )
);
