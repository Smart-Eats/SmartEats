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
    // uploaded image array of a particular user
    imageData: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ImageData",
      },
    ],
    // health data for user
    healthData: {
      age: {
        type: Number,

      },
      weight: {
        type: Number,

      },
      height: {
        type: Number,

      },
      gender: {
        type: String,
        enum: ["male", "female", "other"],

      },
      diabetes: {
        type: Boolean,
      },
      bloodPressure: {
        type: Boolean,
      },
      dietaryPreference: {
        type: String,
        enum: ["Vegetarian", "Vegan", "Non-Veg"],
      },
    },
    barcodes:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"barcode",
      }
    ]
  },
  { timestamps: true }
);

export const user = mongoose.model("User", userSchema);
