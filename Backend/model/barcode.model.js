import mongoose from "mongoose";

const barcodeSchema = mongoose.Schema(
  {
    extractedBarcode: {
    type: String,
    required: false,
  },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
export const barcode = mongoose.model('barcode',barcodeSchema);