import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    user_image: {
      data: { type: Buffer },
      contentType: { type: String },
      //    default:"/uploads/default.gif"
    },
    isOAuth: {
      type: Boolean,
      default: false,
    },
    otp: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    imageData: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ImageData",
      },
    ],
  },
  { timestamps: true }
);

export const user = mongoose.model("User", userSchema);
