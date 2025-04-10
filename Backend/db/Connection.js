import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database Connected");
    } catch (error) {
        console.log("Database Connection Error",error.message);
    };
};