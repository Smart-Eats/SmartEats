import mongoose from "mongoose";

const barcodeSchema = mongoose.Schema(
  {
    barcodeImg: {
      data: Buffer,
      contentType: String,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
export const barcode = mongoose.model('barcode',barcodeSchema);