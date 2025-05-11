import { barcode } from "../model/barcode.model.js";

export const BARCODE_SCANNING = async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ status: false, message: "No file uploaded" });
    }
    const BARCODE = await new barcode({
      barcodeImg: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      uploadedBy: req.user?.id,
    });
    await BARCODE.save();

    res.status(200).json({
      success: true,
      message: "Barcode uploaded and stored in database",
    });
  } catch (error) {
    console.error("Error saving barcode:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to store barcode",
    });
  }
};
