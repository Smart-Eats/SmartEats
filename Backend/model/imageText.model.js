import mongoose from "mongoose";

const ImageTextSchema = mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],    

  image: {
    data: Buffer,
    contentType: String,
  },
  extractedText: {
    type: String,
    required: false,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export const ImageData = mongoose.model("ImageData", ImageTextSchema);
