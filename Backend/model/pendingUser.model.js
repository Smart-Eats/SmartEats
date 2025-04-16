import mongoose from "mongoose";

const PendingUserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    otp:String,
    expiresAt:{
        type:Date,
        //! Mongoose calls this function every time you create a new document So each document gets its own expiry time: 5 minutes after it’s created
        default: () => new Date(Date.now() + 5 * 60 * 1000)
    }
});

export const PendingUser = mongoose.model("PendingUser",PendingUserSchema);